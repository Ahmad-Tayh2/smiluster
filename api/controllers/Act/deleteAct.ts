import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { dropAct, retrieveActByID } from "../../services/Act";
import { createLog } from "../../services/Logs/createLog";

export async function deleteAct(req: any, res: any) {
    try {
        const actID = req.params.actID;
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const act = await retrieveActByID(actID, licenseID);
        if(!act){
            throw new Error("Act Not Found");
        }
        const acte = await dropAct(actID, licenseID);

        if (acte === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: act.actID,
                entityType: EntityType.Act,
                details: { deletedData: act }
            });
            res.status(200).json({ message: "Act deleted successfully" });
        } else {
            res.status(404).json({ error: "Act not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
