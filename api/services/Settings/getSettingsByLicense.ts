import { Settings } from "../../models";

export async function retrieveSettingsByLicense(licenseID: string){
    try{
        const settings = await Settings.findOne({where : {licenseID}});

        return settings;
    } catch(error: any){
        throw new Error(error);
    }
}