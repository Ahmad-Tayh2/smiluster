/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";

import { setNotifications } from "../redux/features/notifications/notificationsSlice";
export const useNotifications = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state: any) => state.notifications);
    const getNotifications = async (all: boolean = false) => {
        try {
            const response = await fetch(API.notifications.get(all), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setNotifications(data));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const setNotificationClicked = async (notifId: any) => {
        try {
            const response = await fetch(
                API.notifications.setClicked(notifId),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            const data = await response.json();
            if (response.ok) {
                console.log("data", data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const setAllNotificationsSeen = async () => {
        try {
            const response = await fetch(API.notifications.setAllSeen, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log("data", data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return {
        notifications,
        getNotifications,
        setNotificationClicked,
        setAllNotificationsSeen,
    };
};
