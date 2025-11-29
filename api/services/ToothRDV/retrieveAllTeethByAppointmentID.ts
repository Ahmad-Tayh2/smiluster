import { Tooth, ToothRDV, Appointment, models } from "../../models";

export async function retrieveAllTeethByAppointmentID(appointmentID: number) {
    const exists = await Appointment.findOne({
        where: { appointmentID },
    });

    if (!exists) {
        throw new Error("Tooth does not exist");
    }

    const teeth = await ToothRDV.findAll({
        where: {
            appointmentID,
        },
        include: {
            model: models.Tooth,
        },
    });

    return teeth;
}
