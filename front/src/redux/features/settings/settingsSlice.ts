import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingState } from "./type";
const initialState: SettingState = {
    settingID: null,
    notificationPreferences: false,
    worksHours: null,
    sessionPeriod: 0,
    allowReminderSMS: false,
    holidays: null,
};
const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateSettingProperties: (
            state,
            action: PayloadAction<SettingState>
        ) => {
            const {
                settingID,
                notificationPreferences,
                worksHours,
                sessionPeriod,
                allowReminderSMS,
                holidays,
            } = action.payload;

            if (settingID !== undefined) {
                state.settingID = settingID;
            }
            if (notificationPreferences !== undefined) {
                state.notificationPreferences = notificationPreferences;
            }
            if (worksHours != undefined) {
                state.worksHours = worksHours;
            }
            if (sessionPeriod != undefined) {
                state.sessionPeriod = sessionPeriod;
            }
            if (allowReminderSMS != undefined) {
                state.allowReminderSMS = allowReminderSMS;
            }
            if (holidays != undefined) {
                state.holidays = holidays;
            }
        },
    },
});

export const { updateSettingProperties } = settingsSlice.actions;

export default settingsSlice.reducer;
