import { Settings } from "../../models";

export async function createNewSettings(newSettingsData: SettingsAttributes) {

    const settings = await Settings.create({
        ...newSettingsData,
    });

    return settings;
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

