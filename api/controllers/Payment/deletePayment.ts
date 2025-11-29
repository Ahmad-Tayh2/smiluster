import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropPayment } from "../../services/Payment/deletePayment"
import { retrievePayment } from "../../services/Payment/getPaymentByID";

export async function deletePayment(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const payment = await retrievePayment(req.params.paymentID, licenseID);
        const deleted = await dropPayment(req.params.paymentID, licenseID);
    
        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: payment.paymentID,
                entityType: EntityType.Payment,
                details: { deletedData: payment }
            });
            res.status(200).json({ message: 'Payment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the payment' });
    }
}