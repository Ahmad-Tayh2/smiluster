import checkForOverlappingAppointments from "../../helpers/Appointment/checkValidAppoitmentTime";
import calculeTotalNeededAmount from "../../helpers/Facture/calculeTotalNeededAmount";
import { Appointment, Facture, Patient, User } from "../../models";


export async function modifyAppointment(
    appointmentID: any,
    updatedAppointmentData: AppointmentAttributes
) {
    const appointmentToUpdate = await Appointment.findOne({
        where: { appointmentID },
    });

    if (!appointmentToUpdate) {
        throw new Error("Appointment does not exist");
    }

    const {
        userID,
        patientID,
        appointmentDateTime,
        status,
        diagnostique,
        ordonnance,
        cost,
        appointmentDuration,
        factureID,
        note,
        licenseID
    } = updatedAppointmentData;


    if (userID !== undefined) {
        const userExists = await User.findOne({
            where: { userID },
        });
        if (!userExists) {
            throw new Error(`User ${userID} does not exist`);
        }
        appointmentToUpdate.userID = userID;
    }


    if (patientID !== undefined) {
        const patientExists = await Patient.findOne({
            where: { patientID },
        });
        if (!patientExists) {
            throw new Error(`Patient ${patientID} does not exist`);
        }
        appointmentToUpdate.patientID = patientID;
    }


    if (appointmentDateTime !== undefined && appointmentDateTime !== appointmentToUpdate.appointmentDateTime) {
        const newAppointmentTime = new Date(appointmentDateTime);

        const reservedTime = await checkForOverlappingAppointments(newAppointmentTime, updatedAppointmentData.appointmentDuration || appointmentToUpdate.appointmentDuration, licenseID, appointmentID);

        if (reservedTime) {
            throw new Error("This time was reserved!!");
        }

        appointmentToUpdate.appointmentDateTime = newAppointmentTime;
    }

    if (status !== undefined) {
        appointmentToUpdate.status = status;
    }

    if (diagnostique !== undefined) {
        appointmentToUpdate.diagnostique = diagnostique;
    }

    if (ordonnance !== undefined) {
        appointmentToUpdate.ordonnance = ordonnance;
    }

    if(cost !== undefined){
        appointmentToUpdate.cost = cost;
    }

    if(cost === null){
        throw new Error("doit est vide !!")
    }
    

    if (appointmentDuration !== undefined) {
        appointmentToUpdate.appointmentDuration = appointmentDuration;
    }


    if (note !== undefined) {
        appointmentToUpdate.note = note;
    }

    if (factureID !== undefined) {
        appointmentToUpdate.factureID = factureID;
    }

    await appointmentToUpdate.save();
    
    if (factureID !== undefined) {
        await calculeTotalNeededAmount(appointmentID, licenseID);
    }

    const appointment = await Appointment.findOne({
        where: { appointmentID },
        include: [
            {
                model: Patient,
                as: "patient",
            },
            {
                model: Facture,
                as: "facture",
            },
        ],
    });

    return { ...appointment?.dataValues, patient: appointmentToUpdate.patientID };
}

interface AppointmentAttributes {
    userID: number;
    licenseID: number;
    patientID?: number;
    factureID: number;
    appointmentDateTime: Date;
    status: string;
    diagnostique?: string;
    ordonnance?: string;
    note?: string;
    cost: number;
    appointmentDuration: number;
}
