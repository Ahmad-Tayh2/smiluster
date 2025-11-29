import { License } from "../../models";

export async function dropLicense(licenseID: number) {
    try{
        const license = await License.destroy({ where: { licenseID } });
        return license;
    } catch(error: any){
        throw new Error(error);
    }
}