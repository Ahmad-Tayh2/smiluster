import { Act } from "../../models";

export async function retrieveAllActs(licenseID:number) {
    try {
        const acts = await Act.findAll({where: {licenseID}});
        return acts;
    } catch (error: any) {
        throw new Error(error);
    }
}
