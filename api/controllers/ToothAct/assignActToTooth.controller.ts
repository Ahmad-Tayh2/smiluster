import { createNewTooth } from "../../services/Tooth/createNewTooth";
import { attachActToTooth } from "../../services/ToothAct/attachActToTooth";

export async function assignProcedureToTooth(req: any, res: any) {
    try {
        let {
            toothID,
            actList,
            licenseID,
            datePerformed,
            appointmentID,
            isPaid,
        } = req.body;
        licenseID = req.license.licenseID;
        

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

        if(actList.length === 0){
            throw new Error("Give at least one act!")
        }

        const toothActAssignment = await attachActToTooth({
            toothID,
            actList,
            licenseID,
            datePerformed,
            appointmentID,
            isPaid,
        });

        if (!toothActAssignment) {
            return res.status(404).json({ error: "something went wrong" });
        }

        res.status(200).json(toothActAssignment);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
