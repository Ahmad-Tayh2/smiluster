import { retrieveAllAppointmentsByToothID } from "../../services/ToothRDV/retrieveAllAppointmentsByToothID";

export async function getAllAppointmentsByToothID(req: any, res: any) {
    try {
        const toothID = req.params.toothID;

        const allAppointments = await retrieveAllAppointmentsByToothID(toothID);
        
        res.status(200).json(allAppointments);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
