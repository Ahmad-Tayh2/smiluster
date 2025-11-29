import { modifyPatient } from "../../services/Patient/updatePatient";


export async function updatePatient(req: any, res: any) {
    const patientID = Number(req.params.patientID);
    let newPatientData = req.body;
    newPatientData.licenseID = req.license.licenseID;
    try{
        const patient = await modifyPatient({patientID, ...newPatientData});

        res.status(200).json(patient);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}