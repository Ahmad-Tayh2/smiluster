import { retrieveDocumentByAppointment } from "../../services/Document/getDocumentByAppointment"; 

export async function getDocumentByAppointment(req: any, res: any) {
    const appointmentID =  req.params.appointmentID;
    const licenseID = req.license.licenseID;
    try{
        const document = await retrieveDocumentByAppointment(appointmentID, licenseID);
        res.status(200).json(document);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}