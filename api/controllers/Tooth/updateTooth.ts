import { modifyTooth } from "../../services/Tooth/modifyTooth";

export async function updateTooth(req: any, res: any) {
    const toothID = req.params.toothID;
    let newToothData = req.body;
    newToothData.licenseID = req.license.licenseID;
    try {
        const tooth = await modifyTooth(toothID, {
            ...newToothData,
        });

        res.status(200).json(tooth);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
