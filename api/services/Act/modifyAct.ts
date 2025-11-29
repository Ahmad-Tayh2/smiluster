import { Act } from "../../models";

export async function modifyAct(updatedAct: ActAttributes) {
    const exists = await Act.findOne({
        where: { actID: updatedAct.actID },
    });

    if (!exists) {
        throw new Error("Act does not exist");
    }

    const nbActs = await Act.update(updatedAct, {
        where: { actID: updatedAct.actID },
    });

    return await Act.findOne({
        where: { actID: updatedAct.actID },
    });
}

interface ActAttributes {
    actID?: number;
    title: string;
    cost: number;
    licenseID: number;
}
