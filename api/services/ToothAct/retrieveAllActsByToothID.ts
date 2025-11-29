import { Tooth, ToothAct, Act, models } from "../../models";

export async function retrieveAllActsByToothID(toothID: number, licenseID: number) {
    const exists = await Tooth.findOne({
        where: { toothID, licenseID },
    });

    if (!exists) {
        throw new Error("Tooth does not exist");
    }

    const toothActs = await ToothAct.findAll({
        where: {
            toothID,
            licenseID,
        },
        include: {
            model: Act
        }
    });

    return toothActs;
}
