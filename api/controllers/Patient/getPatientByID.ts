import { retrievePatientByID } from "../../services/Patient/getPatientByID";

export async function getPatientByID(req: any, res: any) {
    const patientID =  req.params.patientID;
    const licenseID = req.license.licenseID;
    try{
        const patient = await retrievePatientByID(patientID);
        res.status(200).json(patient);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}