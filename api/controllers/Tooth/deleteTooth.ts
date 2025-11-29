import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropTooth } from "../../services/Tooth/dropTooth";
import { retrieveToothByID } from "../../services/Tooth/retrieveToothByID";

export async function deleteTooth(req: any, res: any) {
    try {
        const toothID = req.params.toothID;
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const tooth = await retrieveToothByID(toothID, licenseID);
        const deleted = await dropTooth(toothID, licenseID);

        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: tooth.toothID,
                entityType: EntityType.Tooth,
                details: { deletedData: tooth }
            });
            res.status(200).json({ message: "Tooth deleted successfully" });
        } else {
            res.status(404).json({ error: "Tooth not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
