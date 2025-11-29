import { Document} from "../../models";

export async function modifyDocument(updatedDocument: any){
    const exists = await Document.findOne({ where: { docID:  updatedDocument.docID} });

    if (!exists) {
        throw new Error('Document does not exist');
    }

    const nbDocuments = await Document.update(updatedDocument, {
        where: { docID:  updatedDocument.docID}
    });

    return await Document.findOne({ where: { docID:  updatedDocument.docID} });
}