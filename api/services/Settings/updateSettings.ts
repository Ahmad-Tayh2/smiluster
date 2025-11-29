import { Settings } from "../../models";

export async function modifySettings(updatedSettings: SettingsAttributes) {
    try{
        if(updatedSettings.allowReminderSMS && !updatedSettings.smsRelinderMassage){
            throw new Error("Massage can not be empty!")
        }
    
        const nbPatients = await Settings.update(updatedSettings, {
            where: { licenseID: updatedSettings.licenseID }
        });
    
        return await Settings.findOne({ where: { licenseID:  updatedSettings.licenseID} });
    } catch(err: any){
        throw new Error(err.message);
    }
}

interface SettingsAttributes {
    licenseID: number;
    notificationPreferences: boolean;
    workHours: string;
    sessionPeriod: string;
    holidays?: string;
    allowReminderSMS: boolean;
    smsRelinderMassage?: string;
}
