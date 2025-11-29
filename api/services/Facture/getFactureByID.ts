import { Act, Appointment, AppointmentService, Facture, Patient, Payment, Service, Tooth, ToothAct } from "../../models";

export async function retrieveFacture(factureID: number, licenseID: number) {
    try{
        const facture = await Facture.findOne({ where:{ factureID, licenseID }});

        if (!facture) {
            throw new Error('Facture not found');
        }

        // Fetch related appointments
        const appointments = await Appointment.findAll({ where: { factureID, licenseID } });

        // Fetch related payments
        const payments = await Payment.findAll({ where: { factureID, licenseID } });

        const detailedAppointments = await Promise.all(appointments.map(async (app) => {
            const appointmentID = app.appointmentID;

            // Fetch related acts and their details
            const toothActs = await ToothAct.findAll({ where: { appointmentID, licenseID } });
            const totalToothActsCost = toothActs.reduce((total, toothAct) => total + toothAct.customCost, 0);
            const actIDs = toothActs.map(act => act.actID);
            const actDetails = await Act.findAll({ where: { actID: actIDs } });
            const toothIDs = toothActs.map(tooth => tooth.toothID);
            const toothDetails = await Tooth.findAll({ where: { toothID: toothIDs } });

            // Fetch related appointment services and their details
            const appServices = await AppointmentService.findAll({ where: { appointmentID } });
            const serviceIDs = appServices.map(service => service.serviceID);
            const totalAppointmentServicesCost = appServices.reduce((total, appService) => total + appService.customCost, 0);
            const serviceDetails = await Service.findAll({ where: { serviceID: serviceIDs } });

            const patient = await Patient.findByPk(app.patientID);

            const payments = await Payment.findAll({where: { appointmentID }});
            const appointmentPaymentAmount = payments.reduce((total, payment)=> total + payment.paymentAmount, 0);

            const totalAppointmentCost = app.cost === -1 ? totalToothActsCost + totalAppointmentServicesCost : app.cost;
            return {
                ...app.toJSON(),
                totalAppointmentCost,
                appointmentPaymentAmount,
                patient: patient ? patient.toJSON() : null,
                toothActs: toothActs.map(act => ({
                    ...act.toJSON(),
                    act: actDetails.find(detail => detail.actID === act.actID)?.toJSON() || null,
                    tooth: toothDetails.find(tooth => tooth.toothID === act.toothID)?.toJSON() || null
                })),
                appointmentServices: appServices.map(service => ({
                    ...service.toJSON(),
                    service: serviceDetails.find(detail => detail.serviceID === service.serviceID)?.toJSON() || null
                }))
            };
        }));

        // Assemble the final object
        const factureWithDetails = {
            ...facture.toJSON(),
            appointments: detailedAppointments,
            payments: payments.map(payment => payment.toJSON())
        };


        
        if(!facture){
            throw new Error('Facture not found');
        }

        return factureWithDetails;
    } catch(error: any){
        throw new Error(error);
    }
}
