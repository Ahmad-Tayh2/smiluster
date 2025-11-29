export interface SettingState {
    settingID?: string | null;
    notificationPreferences?: boolean;
    worksHours?: WorkHours[] | null;
    sessionPeriod?: number;
    allowReminderSMS?: boolean;
    holidays?: Holiday[] | null;
}

export interface WorkHours {
    day: number;
    startTime: string;
    endTime: string;
}

export interface Holiday {
    date: string;
    designation: string;
}
