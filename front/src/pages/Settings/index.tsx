/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./style.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ToggleButton from "../../components/Toggle";
import Select from "react-select";
// import { API } from "../../constants/env";
import SettingCard from "./Card";
import { useSetting } from "../../hooks/useSettings";
import Button from "../../components/Button";
import ComingSoon from "../../components/ComingSoon";
// import { DateTime } from "luxon";

export default function Settings() {
    const {
        getSetting,
        updateSetting,
        settingState,
        setAllowReminderSMS,
        // setHolidays,
        setNotificationPreferences,
        setSessionPeriod,
        setWorkHours,
    } = useSetting();
    // const [data, setData] = React.useState<any>({});
    const handleNotificationPreferences = () => {
        setNotificationPreferences(!settingState?.notificationPreferences);
    };
    const handleAllowReminderSMS = () => {
        setAllowReminderSMS(!settingState?.allowReminderSMS);
    };

    React.useEffect(() => {
        getSetting();
    }, []);

    // React.useEffect(() => {
    //     if (data) {
    //         console.log("DATA", data);
    //         if (
    //             sessionPeriodOptions.find(
    //                 (elem) => elem.value === parseInt(data?.sessionPeriod)
    //             )
    //         ) {
    //             setSelectedSessionPeriod({
    //                 value: data?.sessionPeriod,
    //                 label: `${data?.sessionPeriod}min`,
    //             });
    //         }
    //     }
    // }, [data]);

    // const colorStyles = {
    //     control: (styles: any, state: any) => ({
    //         ...styles,
    //         width: "100%",
    //         height: "40px",
    //         border: "none",
    //         backgroundColor: state.isFocused ? "white" : "var(--gray-0)",
    //         transition: " 0.2s ease-in-out",
    //     }),
    //     placeholder: (base: any) => ({
    //         ...base,
    //         fontSize: "16px",
    //     }),
    //     menu: (provided: any) => ({
    //         ...provided,
    //         maxHeight: "220px",
    //         overflowY: "scroll",
    //     }),
    //     option: (
    //         styles: any,
    //         { data, isDisabled, isFocused, isSelected }: any
    //     ) => {
    //         return {
    //             ...styles,
    //             color: isSelected ? "white" : data.color,
    //             backgroundColor: isSelected ? "var(--color-1)" : "white",
    //             fontWeight: "400",
    //             cursor: "pointer",
    //         };
    //     },
    // };

    //session period
    const sessionPeriodOptions = [
        { label: "15min", value: 15 },
        { label: "30min", value: 30 },
        { label: "45min", value: 45 },
        { label: "60min", value: 60 },
    ];
    // const [selectedSessionPeriod, setSelectedSessionPeriod] = React.useState(
    //     sessionPeriodOptions[0]
    // );
    const handleSessionPeriod = (data: any) => {
        // setSelectedSessionPeriod(data);
        setSessionPeriod(data.value);
    };

    interface DayType {
        value: number;
        label: string;
        isActive: boolean;
        startTime?: string;
        endTime?: string;
    }
    //worksHours
    const [days, setDays] = React.useState<DayType[]>([
        {
            value: 1,
            label: "Lundi",
            isActive: false,
        },
        { value: 2, label: "Mardi", isActive: false },
        { value: 3, label: "Mercredi", isActive: false },
        { value: 4, label: "Jeudi", isActive: false },
        { value: 5, label: "Vendredi", isActive: false },
        { value: 6, label: "Samedi", isActive: false },
        { value: 7, label: "Dimanche", isActive: false },
    ]);

    const handleUpdateDays = (index: number, configuration: any) => {
        setDays(
            days.map((selectedDay) => {
                if (selectedDay.value === index) {
                    const elem = {
                        ...selectedDay,
                        isActive: configuration.isActive,
                    };
                    if (elem.isActive) {
                        if (configuration.startTime !== undefined) {
                            elem.startTime = configuration.startTime;
                        }
                        if (configuration.endTime !== undefined) {
                            elem.endTime = configuration.endTime;
                        }
                        setWorkHours(elem);
                    }
                    return elem;
                }
                return selectedDay;
            })
        );
    };

    const RenderWorkDaysOptions = () => {
        const handleChangeStartTime = (e: any, index: number) => {
            handleUpdateDays(index, {
                isActive: true,
                startTime: e.target.value,
            });
        };

        const handleChangeEndTime = (e: any, index: number) => {
            handleUpdateDays(index, {
                isActive: true,
                endTime: e.target.value,
            });
        };

        const toggleIsActive = (index: any) => {
            handleUpdateDays(index, {
                isActive:
                    !days.find((day) => day.value === index)?.isActive ?? false,
            });
        };

        return days.map((day) => {
            return (
                <div className='date-box' key={day.value}>
                    <div className='date-day-container'>
                        <ToggleButton
                            isChecked={day.isActive}
                            onClick={() => toggleIsActive(day.value)}
                        />
                        <div>{day.label}</div>
                    </div>
                    {day.isActive && (
                        <div
                            style={{
                                marginTop: "7px",
                                color: "#181c32",
                                fontSize: "16px",
                            }}
                        >
                            de{" "}
                            <input
                                type='time'
                                style={{
                                    width: 80,
                                    borderRadius: "5px",
                                    padding: "0 3px",
                                }}
                                value={day?.startTime}
                                onChange={(e) =>
                                    handleChangeStartTime(e, day.value)
                                }
                            />{" "}
                            à{" "}
                            <input
                                type='time'
                                style={{
                                    width: 80,
                                    borderRadius: "5px",
                                    padding: "0 3px",
                                }}
                                value={day?.endTime}
                                onChange={(e) =>
                                    handleChangeEndTime(e, day.value)
                                }
                            />
                        </div>
                    )}
                </div>
            );
        });
    };

    // const RenderVacationItems = () => {
    //     const AddNewVacation = () => {
    //         return (
    //             <div>
    //                 <button>Ajouter congé</button>
    //             </div>
    //         );
    //     };
    //     const vacationList = [{ vacationName: "", vacationDate: "" }];
    // };

    const handleSubmitSetting = () => {
        updateSetting();
    };

    const defaultSessionPeriodValue = () => {
        const defaultsession = sessionPeriodOptions.find(
            (session) => session.value === settingState?.sessionPeriod,
        );
        return defaultsession;
    };
    return (
        <div className='setting-page'>
            <div className='page-title'>Paramètres</div>

            <div
                className='settings-container main-box'
                style={{
                    position: "relative",
                }}
            >
                <ComingSoon />
                <div className='settings-content'>
                    <SettingCard
                        title='Activer les notifications hors-travail'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                        sideOption={
                            <ToggleButton
                                isChecked={
                                    settingState?.notificationPreferences
                                }
                                onClick={handleNotificationPreferences}
                            />
                        }
                    />
                    <SettingCard
                        title='Les jours de travail et horaire'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                        bottomOption={
                            <div
                                className='date-container'
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <RenderWorkDaysOptions />
                            </div>
                        }
                    />
                    <SettingCard
                        title="Durée d'une seance"
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                        sideOption={
                            <Select
                                options={sessionPeriodOptions}
                                onChange={handleSessionPeriod}
                                value={defaultSessionPeriodValue()}
                            />
                        }
                    />
                    <SettingCard
                        title="Activer l'envoie des sms"
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                        sideOption={
                            <ToggleButton
                                isChecked={settingState?.allowReminderSMS}
                                onClick={handleAllowReminderSMS}
                            />
                        }
                    />

                    {/* <SettingCard
                        title='Les vacances'
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
                        bottomOption={
                            <div className='date-container vacation-container'>
                                {settingState?.holidays?.map((vacation) => {
                                    return (
                                        <div className='vacation-item'>
                                            <div>{vacation.designation}</div>
                                            <div>
                                                {DateTime.fromFormat(
                                                    vacation.date,
                                                    "yyyy-MM-dd"
                                                ).toFormat("dd-MM-yyyy")}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className='vacation-item'>
                                    <Button text={"Ajouter une vacance"} />
                                </div>
                            </div>
                        }
                    /> */}
                </div>
                <div
                    className='settings-content'
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        text={"Enregister"}
                        style={{
                            width: "150px",
                            height: "40px",
                            marginBottom: "12px",
                        }}
                        onClick={handleSubmitSetting}
                    />
                </div>
            </div>
        </div>
    );
}
