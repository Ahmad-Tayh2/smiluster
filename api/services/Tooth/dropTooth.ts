import { Tooth } from "../../models";

export async function dropTooth(toothID: number, licenseID: number) {
    try {
        const tooth = await Tooth.destroy({ where: { toothID, licenseID } });
        return tooth;
    } catch (error: any) {
        throw new Error(error);
    }
}
