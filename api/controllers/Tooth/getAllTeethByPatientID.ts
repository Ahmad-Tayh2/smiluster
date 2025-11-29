import { retrieveAllTeeth } from "../../services/Tooth/retrieveAllTeeth";

export async function getAllTeethByPatientID(req: any, res: any) {
    try {
        const patientID = req.params.patientID;
        const licenseID = req.license.licenseID;
        const teeth = await retrieveAllTeeth(patientID, licenseID);
        if (!teeth) {
            return res.status(404).json({ error: "There is no teeth" });
        }
        res.status(200).json(teeth);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
