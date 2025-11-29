import { retrieveAllAppointmentsByStatus } from "../../services/Appointment/retrieveAllAppointmentsByStatus";

export async function getAllAppointmentsByStatus(req: any, res: any) {
    try {
        const status = req.params.status;
        const licenseID = req.license.licenseID;
        const appointments = await retrieveAllAppointmentsByStatus(status, licenseID);
        if (!appointments) {
            return res.status(404).json({ error: "There is no appointments" });
        }
        res.status(200).json(appointments);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
