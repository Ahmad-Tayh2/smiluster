import { retrieveActByID } from "../../services/Act";

export async function getActByID(req: any, res: any) {
    
    try {
        const actID = req.params.actID;
        const licenseID = req.license.licenseID;
        const acte = await retrieveActByID(actID, licenseID);
        res.status(200).json(acte);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
