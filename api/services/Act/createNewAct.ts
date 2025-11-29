import { Act } from "../../models";

export async function createNewAct(newActData: ActAttributes) {
    const exists = await Act.findOne({
        where: {
            title: newActData.title,
        },
    });

    if (!newActData.title) {
        throw new Error("Enter a title!");
    }

    if (exists) {
        throw new Error("Act already exists");
    }

    const newAct = await Act.create({ ...newActData });
    return newAct;
}

interface ActAttributes {
    acteID?: number;
    title: string;
    cost: number;
    licenseID: number;
}
