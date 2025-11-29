import { retriveActsByPatient } from "../../services/ToothAct/retriveActsByPatient.service";

export async function getToothActByPatient (req: any, res:any) {
    try{
        const patientID = req.params.patientID;
        const licenseID = req.license.licenseID;
        if(!patientID){
            throw new Error('give me valid patientID');
        }

        const actsList = await retriveActsByPatient(patientID, licenseID);

        res.status(200).json(actsList);
    } catch(err: any){
        res.status(500).json({err});
    }
    
}