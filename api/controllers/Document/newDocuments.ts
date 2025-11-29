import { error } from "console";
import { createNewDocument } from "../../services/Document/newDocument";
import * as express from 'express';

export async function newDocuments(req: any, res: express.Response){
    const newDocuments = req.files as Express.Multer.File[];

    let restDocumentData = req.body;
    restDocumentData.userID = req.user.userID;
    restDocumentData.licenseID = req.license.licenseID;

    try {
      
      if(!restDocumentData.userID){
        throw new Error("Give Me UserID")
      }

      if(!restDocumentData.licenseID){
        throw new Error("Give Me licenseID")
      }

      if(!restDocumentData.fileName){
        throw new Error("Give Me fileName")
      }
      
      if(!restDocumentData.patientID){
        throw new Error("Give Me Patient")
      }

      const document = await createNewDocument(newDocuments, restDocumentData);
  
      res.status(200).json(document);
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}