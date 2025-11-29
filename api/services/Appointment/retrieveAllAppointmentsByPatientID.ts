import { Appointment } from "../../models";

export async function retrieveAllAppointmentsByPatientID(patientID: any, licenseID: number) {
    try {
        const appointments = await Appointment.findAll({
            where: { patientID, licenseID },
        });

        return appointments;
    } catch (error: any) {
        throw new Error(error);
    }
}
