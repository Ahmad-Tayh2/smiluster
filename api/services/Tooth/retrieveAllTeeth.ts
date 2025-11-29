import { Tooth } from "../../models";

export async function retrieveAllTeeth(patientID: number, licenseID: number) {
    try {
        const teeth = await Tooth.findAll({ where: { patientID, licenseID } });
        return teeth;
    } catch (error: any) {
        throw new Error(error);
    }
}
