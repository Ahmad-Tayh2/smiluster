import { Document } from "../../models";

export async function retrieveDocumentByPatient(patientID: number, licenseID: number){
    try{
        const documents = await Document.findAll({where : { patientID, licenseID }});
        return documents;
    } catch(error: any){
        throw new Error(error);
    }
}