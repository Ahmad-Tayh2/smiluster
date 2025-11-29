import { modifySettings } from "../../services/Settings/updateSettings";


export async function updateSettings(req: any, res: any) {
    const settingsID = req.params.settingsID
    let newSettingsData = req.body;
    newSettingsData.licenseID = req.license.licenseID;
    try{
        const settings = await modifySettings({settingsID, ...newSettingsData});

        res.status(200).json(settings);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}