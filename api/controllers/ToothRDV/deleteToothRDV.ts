import { dropToothRDV } from "../../services/ToothRDV/deleteToothRDV";

export async function deleteToothRDV(req: any, res: any) {
    try{
        const appointmentID = req.params.appointmentID;
        const toothID = req.params.toothID;

        if(!appointmentID || !toothID){
            throw new Error("Please Give me both appointmentID & toothID");
        }

        const deletedElement = await dropToothRDV(appointmentID, toothID);

        res.status(200).json("Element was successfully deleted");
    } catch(err: any){
        res.status(500).json({ error: err.message });
    }
}