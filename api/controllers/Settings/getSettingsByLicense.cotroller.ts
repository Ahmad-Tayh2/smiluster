import { retrieveSettingsByLicense } from "../../services/Settings/getSettingsByLicense";

export async function getSettingsByLicense(req: any, res: any) {
    const licenseID =  req.license.licenseID;
    try{
        const settigs = await retrieveSettingsByLicense(licenseID);
        res.status(200).json(settigs);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}