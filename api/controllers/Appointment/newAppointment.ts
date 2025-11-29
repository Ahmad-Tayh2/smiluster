import { createNewAppointment } from "../../services/Appointment/createNewAppointment";
import { createNewPatient } from "../../services/Patient/newPatient";
export async function newAppointment(req: any, res: any) {
    try {
        const userID = req.user.userID;
        const licenseID = req.license.licenseID;
        let {
            patientID,
            factureID,
            appointmentDateTime,
            status,
            diagnostique,
            ordonnance,
            note,
            cost,
            appointmentDuration,
        } = req.body;

        if (!patientID && req.body.newPatient) {
            try {
                const newPatientData = req.body.newPatient;
                newPatientData.licenseID = licenseID;
                if (
                    !newPatientData ||
                    !newPatientData.licenseID ||
                    !newPatientData.lastName
                ) {
                    throw new Error("Fill the fields for the new patient");
                }

                const patient = await createNewPatient(newPatientData);
                patientID = patient.patientID;
            } catch (err: any) {
                return res.status(400).json({ error: err.message });
            }
        }

        if (
            !userID ||
            !licenseID ||
            !patientID ||
            !appointmentDateTime ||
            !status ||
            !appointmentDuration
        ) {
            return res
                .status(400)
                .json({ error: "All required fields must be filled" });
        }

        const appointment = await createNewAppointment({
            userID,
            licenseID,
            patientID,
            factureID,
            appointmentDateTime,
            status,
            diagnostique,
            ordonnance,
            note,
            cost,
            appointmentDuration,
        });

        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
