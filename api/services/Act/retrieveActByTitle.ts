import { Act } from "../../models";

export async function retrieveActByTitle(title: string, licenseID: number) {
    try {
        const act = await Act.findOne({ where: { title, licenseID } });

        if (!act) {
            throw new Error("Act not found");
        }

        return act;
    } catch (error: any) {
        throw new Error(error);
    }
}
