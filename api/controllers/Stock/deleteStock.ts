import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropStock } from "../../services/Stock/deleteStock";
import { retrieveStockByID } from "../../services/Stock/getStockByID";

export async function deleteStock(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const stock = await retrieveStockByID(req.params.stockID, licenseID);
        const deleted = await dropStock(req.params.stockID, licenseID);
    
        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: stock.stockID,
                entityType: EntityType.Stock,
                details: { deletedData: stock }
            });
            res.status(200).json({ message: 'Stock deleted successfully' });
        } else {
            res.status(404).json({ error: 'Stock not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}