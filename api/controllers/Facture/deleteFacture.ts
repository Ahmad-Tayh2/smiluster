import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { dropFacture } from "../../services/Facture/deleteFacture"
import { retrieveFacture } from "../../services/Facture/getFactureByID";
import { createLog } from "../../services/Logs/createLog";

export async function deleteFacture(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const facture = await retrieveFacture(req.params.factureID, licenseID);
        const deleted = await dropFacture(req.params.factureID, licenseID);
    
        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: facture.factureID,
                entityType: EntityType.Facture,
                details: { deletedData: facture }
            });
            res.status(200).json({ message: 'Facture deleted successfully' });
        } else {
            res.status(404).json({ error: 'Facture not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the facture' });
    }
}