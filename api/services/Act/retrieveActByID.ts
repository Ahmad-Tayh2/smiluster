import { Act } from "../../models";

export async function retrieveActByID(actID: number, licenseID: number) {
    try {
        const act = await Act.findOne({ where: { actID, licenseID } });

        if (!act) {
            throw new Error("Act not found");
        }

        return act;
    } catch (error: any) {
        throw new Error(error);
    }
}
