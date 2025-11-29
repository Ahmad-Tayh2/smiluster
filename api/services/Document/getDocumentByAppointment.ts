import { Document } from "../../models";

export async function retrieveDocumentByAppointment(appointmentID: number, licenseID: number){
    try{
        const documents = await Document.findAll({ where : { appointmentID, licenseID }});
        return documents;
    } catch(error: any){
        throw new Error(error);
    }
}