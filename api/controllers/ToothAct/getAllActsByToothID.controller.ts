import { retrieveAllActsByToothID } from "../../services/ToothAct/retrieveAllActsByToothID";

export async function getAllActsByToothID(req: any, res: any) {
    try {
        const toothID = req.params.toothID;
        const licenseID = req.license.licenseID;
        const toothActs = await retrieveAllActsByToothID(toothID, licenseID);
        
        res.status(200).json(toothActs);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
