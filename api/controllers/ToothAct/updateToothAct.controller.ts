import { createNewTooth } from "../../services/Tooth/createNewTooth";
import { modifyToothAct } from "../../services/ToothAct/updateToothAct";

export async function updateToothAct(req: any, res: any) {
    try{
        const toothActID = req.params.toothActID;
        let newData = req.body;
        newData.licenseID = req.license.licenseID;
        
        if (!req.body.toothID && req.body.newTooth) {
            try {
                const newToothData = req.body.newTooth;
                if (!newToothData || !newToothData.adult || !newToothData.toothNumber || !newToothData.patientID) {
                    throw new Error('Fill the fields for the new Tooth');
                }

                const tooth = await createNewTooth(newToothData);
                newData.toothID = tooth.toothID;
            } catch (err: any) {
                return res.status(400).json({ error: err.message });
            }
        }
        
        const updatedElement = await modifyToothAct(toothActID, newData);

        res.status(200).json(updatedElement);
    } catch(err: any){
        console.error(err)
        res.status(500).json({ error: err.message });
    }
} 