import { retrieveActByTitle } from "../../services/Act";

export async function getActByTitle(req: any, res: any) {
    const acteTitle = req.params.title;
    const licenseID = req.license.licenseID;
    try {
        const acte = await retrieveActByTitle(acteTitle, licenseID);
        res.status(200).json(acte);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
