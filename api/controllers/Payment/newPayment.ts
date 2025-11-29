import { createNewPayment } from "../../services/Payment/newPayment";

export async function newPayment(req: any, res: any) {
    try {
        let newPaymentData = req.body;
        let { paymentAmount } = req.body;
        newPaymentData.licenseID = req.license.licenseID;
        if(paymentAmount){
            newPaymentData.paymentAmount = parseFloat(paymentAmount);

            if(paymentAmount <= 0){
                throw new Error('payment Amount should be greater than 0');
            }
        }

        const payment = await createNewPayment(newPaymentData);

        res.status(200).json(payment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
