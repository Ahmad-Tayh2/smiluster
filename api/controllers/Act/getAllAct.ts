import { retrieveAllActs } from "../../services/Act";

export async function getAllActs(req: any, res: any) {
    try {
        // TODO: Add Fillters
        const licenseID = req.license.licenseID;
        const actes = await retrieveAllActs(licenseID);
        
        res.status(200).json(actes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
