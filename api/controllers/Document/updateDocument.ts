import { modifyDocument } from "../../services/Document/updateDocument";


export async function updateDocument(req: any, res: any) {
    const docID = Number(req.params.docID);
    let newDocumentData = req.body;
    newDocumentData.licenseID = req.license.licenseID;
    newDocumentData.userID = req.user.userID;
    try{
        if(!newDocumentData.fileName){
            throw new Error("Please give me the new name");
        }

        if(!newDocumentData.patientID){
            throw new Error("Please give the patientID");
        }
        const document = await modifyDocument({docID, ...newDocumentData});

        res.status(200).json(document);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}