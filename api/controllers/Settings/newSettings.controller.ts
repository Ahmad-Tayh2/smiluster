import { createNewSettings } from "../../services/Settings/newSettings";

export async function newSettings(req: any, res: any){
    let newSettingsData = req.body;
    newSettingsData.licenseID = req.license.licenseID;
    try {
  
      const settings = await createNewSettings(newSettingsData);
  
      res.status(200).json(settings);
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}
