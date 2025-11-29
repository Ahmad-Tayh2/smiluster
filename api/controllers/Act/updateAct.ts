import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { modifyAct, retrieveActByID } from "../../services/Act";
import { createLog } from "../../services/Logs/createLog";

export async function updateAct(req: any, res: any) {
    try {
        const actID = req.params.actID;
        const { user } = req;
        const { userID, licenseID } = user;

        const currentAct = await retrieveActByID(actID, licenseID);

        if (!currentAct) {
            return res.status(404).json({ error: "Act not found" });
        }

        const updatedActData = { ...req.body, licenseID };

        const updatedAct = await modifyAct({
            actID,
            ...updatedActData,
        });

        await createLog({
            licenseID,
            userID,
            action: LogsAction.UPDATE,
            entityID: actID,
            entityType: EntityType.Act,
            details: { oldValue: currentAct, newValue: updatedAct }
        });

        res.status(200).json(updatedAct);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
