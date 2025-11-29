import { Tooth, ToothAct, Act, models } from "../../models";

export async function retrieveAllTeethByActID(actID: number, licenseID: number) {
    const exists = await Act.findOne({
        where: { actID, licenseID },
    });

    if (!exists) {
        throw new Error("Act does not exist");
    }
    const actTeeth = await ToothAct.findAll({
        where: {
            actID,
            licenseID,
        },
        include: {
            model: models.Tooth
        }
    });

    return actTeeth;
}
