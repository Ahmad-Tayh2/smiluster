import { createNewAct } from "../../services/Act";

export async function newAct(req: any, res: any) {
    const newActData = req.body;
    newActData.licenseID = req.license.licenseID;
    try {
        const Act = await createNewAct(newActData);
        res.status(200).json(Act);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
