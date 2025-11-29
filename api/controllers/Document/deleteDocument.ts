import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { dropDocument } from "../../services/Document/deleteDocument";
import { retrieveDocumentByID } from "../../services/Document/getDocumentByID";
import { createLog } from "../../services/Logs/createLog";

export async function deleteDocument(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const doc = await retrieveDocumentByID(req.params.docID, licenseID);
        const document = await dropDocument(req.params.docID, licenseID);
    
        if (document === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: doc.docID,
                entityType: EntityType.Document,
                details: { deletedData: doc }
            });
            res.status(200).json({ message: 'Document deleted successfully' });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}