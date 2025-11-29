import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropUser, retrieveUserByID } from "../../services/User";

export async function deleteUser(req: any, res: any) {
    try {
        const deletedUserID = req.params.userID;
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const user = await retrieveUserByID(deletedUserID);
        const deleted = await dropUser(deletedUserID, licenseID);

        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: user.userID,
                entityType: EntityType.User,
                details: { deletedData: user }
            });
            res.status(200).json({ message: "user deleted successfully" });
        } else {
            res.status(404).json({ error: "user not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
