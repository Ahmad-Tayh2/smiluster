import { Payment } from "../../models";

export async function dropPayment(paymentID: number, licenseID: number) {
    try{
        const payment = await Payment.destroy({ where: { paymentID, licenseID } });
        return payment;
    } catch(error: any){
        throw new Error(error);
    }
}