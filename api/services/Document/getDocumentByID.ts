import { Document } from "../../models";

export async function retrieveDocumentByID(documentID: number, licenseID: number){
    try{
        const document = await Document.findOne({where : { docID: documentID, licenseID }});

        if(!document){
            throw new Error("Document not found");
        }

        return document;
    } catch(error: any){
        throw new Error(error);
    }
}