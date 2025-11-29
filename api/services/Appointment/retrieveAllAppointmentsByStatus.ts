import { Appointment } from "../../models";

export async function retrieveAllAppointmentsByStatus(status: any, licenseID: number) {
    try {
        const appointments = await Appointment.findAll({
            where: { status, licenseID },
        });

        if (!appointments) {
            throw new Error("appointments not found");
        }

        return appointments;
    } catch (error: any) {
        throw new Error(error);
    }
}
