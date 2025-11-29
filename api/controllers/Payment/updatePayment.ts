import { retrieveFacture } from "../../services/Facture/getFactureByID";
import { modifyPayment } from "../../services/Payment/updatePayment";


export async function updatePayment(req: any, res: any) {
    
    try{
        const paymentID = req.params.paymentID
        const licenseID = req.license.licenseID;
        let newPaymentData = req.body;
        newPaymentData.licenseID = licenseID;
        newPaymentData.paymentID = paymentID;
        
        if(!newPaymentData.factureID){
            throw new Error('give me factureID!!');
        }

        const facture = await retrieveFacture(newPaymentData.factureID, licenseID);
        if(facture.closedAt !== null){
            throw new Error('can not make modifications on this payment, facture is closed');
        }
        const payment = await modifyPayment(newPaymentData);

        res.status(200).json(payment);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}