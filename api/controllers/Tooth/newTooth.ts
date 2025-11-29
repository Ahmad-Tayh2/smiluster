import { createNewTooth } from "../../services/Tooth/createNewTooth";

export async function newTooth(req: any, res: any) {
    let newToothData = req.body;
    newToothData.licenseID = req.license.licenseID;
    try {
        const Tooth = await createNewTooth(newToothData);
        res.status(200).json(Tooth);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
