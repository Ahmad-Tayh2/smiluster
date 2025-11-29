/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { Holiday } from "../redux/features/settings/type";
import { updateSettingProperties } from "../redux/features/settings/settingsSlice";
import { API } from "../constants/env";

export const useSetting = () => {
    const dispatch = useAppDispatch();

    const settingState = useAppSelector((state: any) => state.settings);
    const getSetting = async () => {
        const response = await fetch(API.settings.get, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            dispatch(updateSettingProperties(data));
        }
    };

    const setNotificationPreferences = (isOn: boolean) => {
        dispatch(updateSettingProperties({ notificationPreferences: isOn }));
    };
    const setAllowReminderSMS = (isOn: boolean) => {
        dispatch(updateSettingProperties({ allowReminderSMS: isOn }));
    };
    const setSessionPeriod = (periodInMinutes: string) => {
        dispatch(
            updateSettingProperties({
                sessionPeriod: parseInt(periodInMinutes),
            })
        );
    };
    const setHolidays = (newHoliday: Holiday) => {
        dispatch(
            updateSettingProperties({
                holidays: [newHoliday, ...settingState.holidays],
            })
        );
    };
    const setWorkHours = (newWorkHours: any) => {
        const isExisted = settingState.worksHours.find((workhour: any) => {
            workhour.day === newWorkHours.day;
        });
        if (isExisted) {
            dispatch(
                updateSettingProperties({
                    worksHours: settingState.worksHours.map((workHour: any) => {
                        if (workHour.day === isExisted.day) {
                            return isExisted;
                        } else {
                            return workHour;
                        }
                    }),
                })
            );
        } else {
            dispatch(
                updateSettingProperties({
                    worksHours: [...settingState.worksHours, newWorkHours],
                })
            );
        }
    };

    const updateSetting = async () => {
        if (settingState.settingID) {
            const response = await fetch(
                API.settings.update(settingState.settingID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(settingState),
                }
            );
            const data = await response.json();
            if (response.ok) {
                dispatch(updateSettingProperties(data));
            }
        } else {
            const response = await fetch(API.settings.create, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(settingState),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateSettingProperties(data));
            }
        }
    };
    return {
        settingState,
        getSetting,
        updateSetting,
        setNotificationPreferences,
        setAllowReminderSMS,
        setSessionPeriod,
        setHolidays,
        setWorkHours,
    };
};
