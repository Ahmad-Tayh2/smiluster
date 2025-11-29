import { Tooth } from "../../models";

export async function modifyTooth(
    toothID: number,
    updatedTooth: ToothAttributes
) {
    const exists = await Tooth.findOne({
        where: { toothID },
    });

    if (!exists) {
        throw new Error("Tooth does not exist");
    }

    const nbTooths = await Tooth.update(updatedTooth, {
        where: { toothID: toothID },
    });

    return await Tooth.findOne({
        where: { toothID },
    });
}

interface ToothAttributes {
    patientID: number;
    toothNumber: string;
    adult: boolean;
    notes?: string;
}
