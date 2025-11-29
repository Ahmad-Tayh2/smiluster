import { createNewPatient } from "../../services/Patient/newPatient";

export async function newPatient(req: any, res: any){
    let newPatientData = req.body;
    newPatientData.licenseID = req.license.licenseID;
    try {
  
      const patient = await createNewPatient(newPatientData);
  
      res.status(200).json(patient);
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}