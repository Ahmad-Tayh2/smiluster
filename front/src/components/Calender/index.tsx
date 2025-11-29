/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
// import SVGIcon from "../../components/SVGIcon";
import {
    getDayNumber,
    capitalize,
    topPosition,
} from "../../utils/calenderFunctions";
import { useAppointments } from "../../hooks/useAppointments";
// import ProfilePicture from "../ProfilePicture";
import {
    getCurrentWeekDays,
    changeOpacity,
} from "../../utils/calenderFunctions";
import { ROUTER } from "../../constants/env";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { PulseLoader } from "react-spinners";

// interface CalenderProps {
//     isWeek?: boolean;
//     view: "grid" | "list" | "";
//     weekDays: string[] | null;
//     selectedDay: Date;
//     setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
// }
export default function Calender(props: any /*CalenderProps*/) {
    const {
        // view,
        weekDays,
        selectedDay,
        // setSelectedDay,
        isWeek,
        weekStep,
        setWeekDays,
        // setWeekNumber,
        loading,
    } = props;
    const navigate = useNavigate();
    const { appointments } = useAppointments();
    // const onUpdateAppointment = () => {
    //     console.log("onUpdateAppointment");
    // };
    // const onDeleteAppointment = () => {
    //     console.log("ondeleteAppointment");
    // };

    // const rendezvous = [
    //     {
    //         patient: "Malek Mraydi",
    //         day: "lundi",
    //         hour: 10,
    //         minute: 30,
    //         status: "arrived",
    //     },
    //     {
    //         patient: "Ahmad Tayh",
    //         day: "mardi",
    //         hour: 8,
    //         minute: 15,
    //         status: "canceled",
    //     },
    //     {
    //         patient: "Mohamed Souibgui",
    //         day: "jeudi",
    //         hour: 11,
    //         minute: 45,
    //         status: "completed",
    //     },
    //     {
    //         patient: "Malek Mraydi",
    //         day: "mardi",
    //         hour: 9,
    //         minute: 30,
    //         status: "completed",
    //     },
    //     {
    //         patient: "Ahmad 2222Tayh",
    //         day: "vendredi",
    //         hour: 8,
    //         minute: 15,
    //         status: "arrived",
    //     },
    //     {
    //         patient: "Mohamed Souibgui",
    //         day: "samedi",
    //         hour: 11,
    //         minute: 45,
    //         status: "completed",
    //     },
    //     {
    //         patient: "Malek Mraydi",
    //         day: "samedi",
    //         hour: 10,
    //         minute: 30,
    //         status: "arrived",
    //     },
    //     {
    //         patient: "Ahmad1111 Tayh",
    //         day: "jeudi",
    //         hour: 8,
    //         minute: 15,
    //         status: "canceled",
    //     },
    //     {
    //         patient: "Mohamed Souibgui",
    //         day: "mercredi",
    //         hour: 11,
    //         minute: 55,
    //         status: "completed",
    //     },
    // ];

    const timeIntervals: number[] = Array(24).fill(0);
    // const events = [
    //   { day: "Mon", time: "10 AM", title: "Meeting" },
    //   { day: "Tue", time: "2 PM", title: "Lunch" },
    //   // Add more events here
    // ];
    React.useEffect(() => {
        // const { weekDaysVar } = getCurrentWeekDays(weekStep);
        let weekDaysVar = getCurrentWeekDays(weekStep);
        setWeekDays(weekDaysVar);

        // setWeekNumber(weekNumberVar);
        // if (weekDaysVar.length === 7) {
        //     handleChangeAppointmentsFilters({
        //         name: "startDay",
        //         value: weekDaysVar[0],
        //     });
        //     handleChangeAppointmentsFilters({
        //         name: "endDay",
        //         value: weekDaysVar.slice(-1),
        //     });
        // }
    }, [weekStep]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const rowHeigth = 60;
    const startHour = 8;
    const fontSize = `${rowHeigth / 6}px`;
    const rendezPadding = `${rowHeigth / 28}px`;

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop =
                rowHeigth * startHour - rowHeigth / 8; // Scroll down by ..
        }
    }, []);
    const [load, setLoad] = React.useState<boolean>(false);
    React.useEffect(() => {
        let timeout: any;
        if (loading) {
            setLoad(true);
        }
        timeout = setTimeout(() => {
            setLoad(false);
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [loading]);
    if (loading || load) {
        return (
            <div
                className="center"
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "var(--color-3)",
                    borderRadius: "var(--main-rd)",
                }}
            >
                <PulseLoader
                    color={"var(--color-1)"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="week-calender"
            style={{
                border: "1px solid var(--color-2)",
                borderRadius: "var(--main-rd)",
            }}
        >
            <table className="calender-grid-table">
                <thead>
                    <tr>
                        <th colSpan={2}></th>
                        {isWeek ? (
                            weekDays?.map((day: any, index: number) => (
                                <th
                                    key={index}
                                    className="day"
                                    style={
                                        {
                                            // color: `${
                                            //     new Date(
                                            //         selectedDay
                                            //     ).toDateString() ===
                                            //     new Date(day).toDateString()
                                            //         ? "var(--color-1)"
                                            //         : ""
                                            // }`,
                                        }
                                    }
                                >
                                    {capitalize(day.weekDay)}
                                    <span
                                        style={{
                                            fontSize: "medium",
                                        }}
                                    >
                                        {day.day}
                                    </span>
                                </th>
                            ))
                        ) : (
                            <th className="single-day-header">
                                {/* {
                                    formatWeekDay(String(selectedDay))
                                        .capitalizedDayName
                                } */}
                                <span
                                    style={{
                                        backgroundColor: "var(--color-1)",
                                        color: "white",
                                        borderRadius: "var(--main-rd)",
                                        padding: "3px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    {/* {
                                        formatWeekDay(String(selectedDay))
                                            .dayOfMonth
                                    } */}
                                </span>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody
                    style={{
                        position: "relative",
                    }}
                >
                    {timeIntervals.map((_, index) => (
                        <tr
                            key={index}
                            style={{
                                height: `${rowHeigth}px`,
                            }}
                        >
                            <td className="times">
                                <span
                                    style={{
                                        width: "180%",
                                        fontSize: "12px",
                                    }}
                                >
                                    {index < 9 && index !== 23 ? "0" : ""}
                                    {index !== 23 ? index + 1 + ":00H" : ""}
                                </span>
                            </td>
                            <td className="lines"></td>
                            {isWeek ? (
                                weekDays?.map((_: any, index: any) => (
                                    <td key={index}>
                                        <div className="cell"></div>
                                    </td>
                                ))
                            ) : (
                                <td key={index}>
                                    <div className="cell"></div>
                                </td>
                            )}
                        </tr>
                    ))}
                    <tr>
                        <td className="rendez-vous-layer">
                            <div>
                                {appointments.calendar?.data?.map(
                                    (rendez: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="rendez-wrapper"
                                                style={{
                                                    height: `${
                                                        (Math.max(
                                                            rendez.appointmentDuration,
                                                            15,
                                                        ) *
                                                            rowHeigth) /
                                                        60
                                                    }px`,
                                                    left: `calc((100% - 70px) / 7 * ${getDayNumber(
                                                        rendez.appointmentDateTime,
                                                    )} + 72px)`,
                                                    top: `${topPosition(
                                                        rendez.appointmentDateTime,
                                                        rowHeigth,
                                                    )}px`,
                                                }}
                                            >
                                                <div
                                                    key={index}
                                                    className="rendez"
                                                    style={{
                                                        color:
                                                            appointments.statusOptions.find(
                                                                (status: any) =>
                                                                    status.value ===
                                                                    rendez.status,
                                                            )?.color ||
                                                            "#000000",

                                                        backgroundColor:
                                                            changeOpacity(
                                                                appointments.statusOptions.find(
                                                                    (
                                                                        status: any,
                                                                    ) =>
                                                                        status.value ===
                                                                        rendez.status,
                                                                )?.color ||
                                                                    "#000000",
                                                                0.3,
                                                            ),
                                                        borderColor:
                                                            appointments.statusOptions.find(
                                                                (status: any) =>
                                                                    status.value ===
                                                                    rendez.status,
                                                            )?.color ||
                                                            "#000000",
                                                        // fontSize: "x-small",
                                                        fontWeight: "bold",
                                                        padding: rendezPadding,
                                                    }}
                                                >
                                                    <div
                                                        className="details-rendez center"
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            top: "0",
                                                            left: "0",
                                                            height: "100%",
                                                            width: "100%",
                                                            backgroundColor:
                                                                appointments.statusOptions.find(
                                                                    (
                                                                        status: any,
                                                                    ) =>
                                                                        status.value ===
                                                                        rendez.status,
                                                                )?.color ||
                                                                "#000000",
                                                            color: "white",
                                                            fontSize,

                                                            fontWeight: "500",
                                                        }}
                                                        onClick={() =>
                                                            navigate(
                                                                ROUTER.APPOINTMENT_PAGE(
                                                                    rendez.appointmentID,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        {
                                                            rendez.appointmentDuration
                                                        }{" "}
                                                        minutes
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize,
                                                            }}
                                                        >
                                                            {rendez.patient.firstName
                                                                .slice(0, 1)
                                                                .toUpperCase()}
                                                            .{" "}
                                                            {
                                                                rendez.patient
                                                                    .lastName
                                                            }
                                                        </div>

                                                        <div
                                                            style={{
                                                                fontSize,
                                                            }}
                                                        >
                                                            {DateTime.fromISO(
                                                                rendez.appointmentDateTime,
                                                            )
                                                                .toLocal()
                                                                // .toISOTime()
                                                                .toFormat(
                                                                    "HH:mm",
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
