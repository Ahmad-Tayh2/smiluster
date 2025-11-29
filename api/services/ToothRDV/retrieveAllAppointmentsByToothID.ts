import { Tooth, ToothRDV, Appointment, models } from "../../models";

export async function retrieveAllAppointmentsByToothID(toothID: number) {
    const exists = await Tooth.findOne({
        where: { toothID },
    });

    if (!exists) {
        throw new Error("Tooth does not exist");
    }

    const appointments = await ToothRDV.findAll({
        where: {
            toothID,
        },
        include: {
            model: models.Appointment,
        },
    });

    return appointments;
}
