import { retrieveDocumentByPatient } from "../../services/Document/getDocumentByPatient";

export async function getDocumentByPatient(req: any, res: any) {
    const patientID =  req.params.patientID;
    const licenseID = req.license.licenseID;
    try{
        const document = await retrieveDocumentByPatient(patientID, licenseID);
        res.status(200).json(document);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}