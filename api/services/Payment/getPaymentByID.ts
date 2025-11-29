import { Payment } from "../../models";

export async function retrievePayment(paymentID: number, licenseID: number) {
    try{
        const payment = await Payment.findOne({ where: { paymentID, licenseID } });
        if(!payment){
            throw new Error('Payment not found');
        }
        return payment;
    } catch(error: any){
        throw new Error(error);
    }
}