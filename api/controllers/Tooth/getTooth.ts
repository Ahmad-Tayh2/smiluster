import { retrieveToothByID } from "../../services/Tooth/retrieveToothByID";

export async function getToothByID(req: any, res: any) {
    const toothID = req.params.toothID;
    const licenseID = req.license.licenseID;
    try {
        const tooth = await retrieveToothByID(toothID, licenseID);
        res.status(200).json(tooth);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
