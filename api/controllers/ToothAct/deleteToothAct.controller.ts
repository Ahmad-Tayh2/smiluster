import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { ToothAct } from "../../models";
import { createLog } from "../../services/Logs/createLog";
import { dropToothAct } from "../../services/ToothAct/deleteToothAct";

export async function deleteToothAct(req: any, res: any) {
    try{
        const toothActID = req.params.toothActID;
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const toothAct = await ToothAct.findOne({ where: { toothActID } });
        if(!toothAct){
            throw new Error("Not exist!");
        }

        const deletedElement = await dropToothAct(toothActID, licenseID);
        await createLog({
            licenseID,
            userID,
            action: LogsAction.DELETE,
            entityID: toothAct.toothActID,
            entityType: EntityType.ToothAct,
            details: { deletedData: toothAct }
        });
        res.status(200).json({ message: "ToothAct deleted successfully" });
    } catch(err: any){
        console.error(err)
        res.status(500).json({ error: err.message });
    }
}