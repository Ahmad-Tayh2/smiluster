import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropProduct } from "../../services/Product/deleteProduct";
import { retrieveProductByID } from "../../services/Product/getProductByID";

export async function deleteProduct(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const product = await retrieveProductByID(req.params.productID, licenseID);
        const deleted = await dropProduct(req.params.productID, licenseID);
    
        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: product.productID,
                entityType: EntityType.Product,
                details: { deletedData: product }
            });
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}