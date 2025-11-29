import { Appointment, Facture, Patient } from "../../models";

export async function retrieveAppointmentByID(appointmentID: number, licenseID: number) {
    try {
        const appointments = await Appointment.findOne({
            where: { appointmentID, licenseID },
            include: [
                {
                    model: Patient,
                    as: "patient",
                },
                {
                    model: Facture,
                    as: "facture",
                },
            ],
        });

        if (!appointments) {
            throw new Error("appointment ID not found");
        }
        return appointments;
    } catch (error: any) {
        throw new Error(error);
    }
}
