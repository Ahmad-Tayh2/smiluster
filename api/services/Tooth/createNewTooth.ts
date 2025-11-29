import { Tooth } from "../../models";

export async function createNewTooth(newToothData: ToothAttributes) {
    const exists = await Tooth.findOne({
        where: {
            patientID: newToothData.patientID,
            adult: newToothData.adult,
            toothNumber: newToothData.toothNumber,
        },
    });

    if (!newToothData.patientID === undefined) {
        throw new Error("Enter a patientID!");
    }
    if (newToothData.adult === undefined) {
        throw new Error("Enter a Tooth Type!");
    }
    if (newToothData.toothNumber === undefined) {
        throw new Error("Enter a Tooth Number!");
    }

    if (exists) {
        throw new Error("Tooth already exists");
    }

    const tooth = await Tooth.create({ ...newToothData });
    return tooth;
}

interface ToothAttributes {
    toothID: number;
    patientID: number;
    toothNumber: string;
    adult: boolean;
    notes?: string;
}
