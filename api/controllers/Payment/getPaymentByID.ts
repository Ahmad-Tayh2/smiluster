import { retrievePayment } from "../../services/Payment/getPaymentByID";

export async function getPaymentByID(req: any, res: any) {
    try{
        const licenseID = req.license.licenseID;
        const payment = await retrievePayment(req.params.paymentID, licenseID);
        if(!payment){
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err: any){
        res.status(500).json({ error: err.message });
    }
}