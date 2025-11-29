import { retriveActsByApp } from "../../services/ToothAct/retriveActsByApp.service";

export async function getActsByAppointment (req: any, res:any) {
    try{
        const appointmentID = req.params.appointmentID;
        const licenseID = req.license.licenseID;
        if(!appointmentID){
            throw new Error('give me valid appointmentID');
        }

        const actsList = await retriveActsByApp(appointmentID, licenseID);

        res.status(200).json(actsList);
    } catch(err: any){
        res.status(500).json({err});
    }
    
}