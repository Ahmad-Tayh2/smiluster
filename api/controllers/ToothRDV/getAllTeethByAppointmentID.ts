import { retrieveAllTeethByAppointmentID } from "../../services/ToothRDV/retrieveAllTeethByAppointmentID";

export async function getAllTeethByAppointmentID(req: any, res: any) {
    try {
        const appointmentID = req.params.appointmentID;

        const allTeeth = await retrieveAllTeethByAppointmentID(appointmentID);
        
        res.status(200).json(allTeeth);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
