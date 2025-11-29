import { createNewTooth } from "../../services/Tooth/createNewTooth";
import { modifyToothRDV } from "../../services/ToothRDV/updateToothRDV";

export async function updateToothRDV(req: any, res: any) {
    try{
        const appointmentID = req.params.appointmentID;
        let toothID = req.params.toothID;
        const newData = req.body

        if (req.body.newTooth) {
            try {
                const newToothData = req.body.newTooth;
                if (!newToothData || !newToothData.adult || !newToothData.toothNumber || !newToothData.patientID) {
                    throw new Error('Fill the fields for the new Tooth');
                }

                const tooth = await createNewTooth(newToothData);
                toothID = tooth.toothID;
            } catch (err: any) {
                return res.status(400).json({ error: err.message });
            }
        }

        if(!appointmentID || !toothID){
            throw new Error("Please Give me both appointmentID & toothID");
        }

        if(!newData.appointmentID || !newData.toothID){
            throw new Error("Please Give me both the new appointmentID & the new toothID");
        }

        const updatedElement = await modifyToothRDV(appointmentID, toothID, newData);

        res.status(200).json(updatedElement);
    } catch(err: any){
        res.status(500).json({ error: err.message });
    }
} 