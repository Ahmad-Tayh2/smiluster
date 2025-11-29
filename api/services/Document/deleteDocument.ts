import { Document } from "../../models";
const fs = require('fs');

export async function dropDocument(docID: number, licenseID:number) {
    try{
        const doc = await Document.findOne({where: { docID, licenseID }});
        if(!doc){
            throw Error('Document not found');
        }
        fs.unlink(doc.url, (err: any) => {
            if (err) {
                throw Error('Something went wrong');
            }
        });
        const document = await Document.destroy({ where: { docID, licenseID } });
        return document;
    } catch(error: any){
        throw new Error(error);
    }
}