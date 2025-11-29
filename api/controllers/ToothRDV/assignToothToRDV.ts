import { createNewTooth } from "../../services/Tooth/createNewTooth";
import { attachToothToRDV } from "../../services/ToothRDV/attachToothToRDV";

export async function assignToothToRDV(req: any, res: any) {
    
    try {
        const appointmentID = req.params.appointmentID;
        let toothID = req.params.toothID;
        const licenseID = req.license.licenseID;

        if (req.body.newTooth) {
            try {
                const newToothData = req.body.newTooth;
                newToothData.licenseID = licenseID;
                if (!newToothData || !newToothData.adult || !newToothData.toothNumber || !newToothData.patientID) {
                    throw new Error('Fill the fields for the new Tooth');
                }

                const tooth = await createNewTooth(newToothData);
                toothID = tooth.toothID;
            } catch (err: any) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (!appointmentID  || !toothID) {
            return res.status(400).json({ error: "All fields must be filled" });
        }
        const toothRDVassignment = await attachToothToRDV(
            appointmentID,
            toothID,
            licenseID
        );
        if (!toothRDVassignment) {
            return res.status(404).json({ error: "something went wrong" });
        }

        res.status(200).json(toothRDVassignment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
