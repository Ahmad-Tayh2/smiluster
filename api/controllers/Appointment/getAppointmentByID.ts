import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";

export async function getAppointmentByID(req: any, res: any) {
    try {
        const appointmentID = req.params.appointmentID;
        const licenseID = req.license.licenseID;
        const appointment = await retrieveAppointmentByID(appointmentID, licenseID);
        if (!appointment) {
            return res.status(404).json({ error: "There is no appointment" });
        }
        res.status(200).json(appointment);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
