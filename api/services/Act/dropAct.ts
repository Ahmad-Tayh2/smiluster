import { Act } from "../../models";

export async function dropAct(actID: number, licenseID:number) {
    try {
        const act = await Act.destroy({ where: { actID, licenseID } });
        return act;
    } catch (error: any) {
        throw new Error(error);
    }
}
