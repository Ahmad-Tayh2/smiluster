import path from "path";
import { Document } from "../../models";

export async function createNewDocument(
    newDocuments: any,
    restDocumentData: any
) {
    if(!newDocuments){
        throw new Error("Please Add Doc");
    }
    let docs = [];
    
    for (const doc of newDocuments) {
        const document = {
            licenseID: restDocumentData.licenseID,
            userId: restDocumentData.userID,
            patientID: restDocumentData.patientID,
            fileName: restDocumentData.fileName,
            appointmentID: restDocumentData.appointmentId
                ? restDocumentData.appointmentId
                : null,
            url:
                path.extname(doc.originalname).toLowerCase() === ".pdf"
                    ? `public/files/${doc.filename}`
                    : `public/images/${doc.filename}`,
            extension: path.extname(doc.originalname),
        };
        const document2 = await Document.create(document);
        docs.push(document2);
    }

    return docs;
}
