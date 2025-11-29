import calculeTotalPaidAmount from "../../helpers/Facture/calculeTotalPaidAmount";
import { Facture, Payment } from "../../models";
import { retrieveAppointmentByID } from "../Appointment/retrieveAppointmentByID";

export async function createNewPayment(newPaymentData: PaymentAttributes){
    try{
        let {
            factureID,
            appointmentID,
            licenseID,
        } = newPaymentData;
        
        if(appointmentID){
            const appointment = await retrieveAppointmentByID(appointmentID, licenseID);
            if(!appointment.factureID){
                throw new Error('appointment should have a facture')
            }

            factureID = appointment.factureID;
        }
        let facture = await Facture.findOne({ where: { factureID }});
        if(!facture){
            throw new Error('give me a valid facture ID');
        }

        const date = new Date();
        const payment = await Payment.create({...newPaymentData, paymentDate: date});
        await calculeTotalPaidAmount(factureID, licenseID);

        return payment;
    } catch (err: any){
        throw new Error(err);
    }
}

interface PaymentAttributes {
    paymentID: number;
    factureID: number;
    appointmentID?: number;
    paymentAmount: number;
    paymentDate: Date;
    licenseID: number;
}
