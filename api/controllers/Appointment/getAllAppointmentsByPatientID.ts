import { retrieveAllAppointmentsByPatientID } from "../../services/Appointment/retrieveAllAppointmentsByPatientID";

export async function getAllAppointmentsByPatientID(req: any, res: any) {
    try {
        const patientID = req.params.patientID;
        const licenseID = req.license.licenseID;
        const appointments = await retrieveAllAppointmentsByPatientID(
            patientID,
            licenseID,
        );
        if (!appointments) {
            return res.status(404).json({ error: "There is no appointments" });
        }
        res.status(200).json(appointments);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
