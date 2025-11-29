import { License } from "../../models";

export async function retrieveLicense(licenseID: string) {
    try{
        const license = await License.findOne({ where: { licenseID: licenseID } });
        if(!license){
            throw new Error('License not found');
        }
        return license;
    } catch(error: any){
        throw new Error(error);
    }
}