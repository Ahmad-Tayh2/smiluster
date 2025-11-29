import calculeTotalPaidAmount from "../../helpers/Facture/calculeTotalPaidAmount";
import {  Payment } from "../../models";

export async function modifyPayment(updatedPayment: any) {
    try{
        const {
            paymentID,
            licenseID,
        } = updatedPayment;
        const exists = await Payment.findOne({ where: { paymentID, licenseID } });
    
        if (!exists) {
            throw new Error('Payment Key does not exists');
        }
    
        
    
        const nbPayments = await Payment.update(updatedPayment, {
            where: { paymentID, licenseID }
        });
        
        await calculeTotalPaidAmount(exists.factureID, licenseID);
        
        return await Payment.findOne({ where: { paymentID } });
    } catch (err: any){
        throw new Error(err);
    }
}
