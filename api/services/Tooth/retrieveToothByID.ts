import { Tooth } from "../../models";

export async function retrieveToothByID(toothID: number, licenseID: number) {
    try {
        const tooth = await Tooth.findOne({
            where: { toothID, licenseID },
        });
        if (!tooth) {
            throw new Error("Tooth not found");
        }
        return tooth;
    } catch (error: any) {
        throw new Error(error);
    }
}
