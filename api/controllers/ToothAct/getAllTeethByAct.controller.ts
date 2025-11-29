import { retrieveAllTeethByActID } from "../../services/Act";

export async function getAllTeethByAct(req: any, res: any) {
    try {
        const actID = req.params.actID
        const licenseID = req.license.licenseID;
        const allTeethByAct = await retrieveAllTeethByActID(actID, licenseID);
        
        res.status(200).json(allTeethByAct);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
