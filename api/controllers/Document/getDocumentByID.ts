import { retrieveDocumentByID } from "../../services/Document/getDocumentByID";

export async function getDocumentByID(req: any, res: any) {
    const documentID =  req.params.docID;
    const licenseID = req.license.licenseID;
    try{
        const document = await retrieveDocumentByID(documentID, licenseID);
        res.status(200).json(document);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}