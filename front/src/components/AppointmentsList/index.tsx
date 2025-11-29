/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Table from "../Table";
import Button from "../Button";
import Select from "react-select";
import SVGIcon from "../../components/SVGIcon";
import "./style.css";
import {
    getCalenderWeekSwitcher,
    getFirstAndLastDayOfWeek,
} from "../../utils/calenderFunctions";
import { DateTime } from "luxon";

import AddAppointmentCard from "../AddAppointmentCard";
import Calender from "../../components/Calender";

import { useAppointments } from "../../hooks/useAppointments";
import { usePagination } from "../../hooks/usePagination";
import ProfilePicture from "../ProfilePicture";
import DeleteCard from "../DeleteCard";
import { ROUTER } from "../../constants/env";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ListViewSVG } from "../../icons/list-view.svg";
import { ReactComponent as GridViewSVG } from "../../icons/grid-view.svg";

export default function AppointmentsList(props: any) {
    const {} = props;
    const {
        appointments,
        handleChangeAppointmentsFilters,
        handleDeleteAppointment,
        handleGetAppointments,
        handleGetCalendarData,
        handleSetCalendarFilter,
        resetAppointments,
    } = useAppointments();
    const {
        itemsPerPage,
        currentPageNumber,
        setCurrentPageNumber,
        setItemsPerPage,
    } = usePagination();
    React.useEffect(() => {
        setCurrentPageNumber(1);
        if (!(itemsPerPage && itemsPerPage > 0)) {
            setItemsPerPage(10);
        }
    }, []);
    const navigate = useNavigate();
    const [view, setView] = React.useState<any>(
        localStorage.getItem("view") || "grid"
    );
    React.useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);
    const [showAddCard, setShowAddCard] = React.useState<boolean>(false);
    const handleCloseCard = () => {
        setShowAddCard(false);
        setToEdit(null);
    };
    const handleOpenCard = (e: any) => {
        e.preventDefault();
        setShowAddCard(true);
    };
    const onUpdateAppointment = (id: string) => {
        setToEdit(
            appointments.data.find((item: any) => item.appointmentID === id)
        );
        setShowAddCard(true);
    };

    const onDeleteAppointment = (id: string) => {
        setOpenDeleteCard({ display: true, id });
    };
    const [openDeleteCard, setOpenDeleteCard] = React.useState({
        display: false,
        id: "",
    });
    const handleOnDeleteAppointment = async () => {
        const ok = await handleDeleteAppointment(openDeleteCard.id);
        if (ok) {
            setOpenDeleteCard({
                display: false,
                id: "",
            });
        }
    };

    const tableOptions = [
        {
            label: "Modifier",
            icon: (
                <SVGIcon
                    type='edit'
                    color='var(--color-1)'
                    width={20}
                    height={20}
                />
            ),
            onClick: onUpdateAppointment,
        },
        {
            label: "Supprimer",
            icon: (
                <SVGIcon
                    type='trash'
                    color='var(--color-1)'
                    width={20}
                    height={20}
                />
            ),
            onClick: onDeleteAppointment,
        },
    ];
    const statusOptions = [
        { value: "scheduled", label: "Planifié", color: "#2C86EF" },
        { value: "pending", label: "En attente", color: "#F18E19" },
        { value: "completed", label: "Terminé", color: "#1BD788" },
        { value: "canceled", label: "Annulé", color: "#E20202" },
    ];
    const colorStyles = {
        control: (styles: any) => ({
            ...styles,
            minWidth: "140px",
            width: "fit-content",
            height: "40px",
            border: "1px solid var(--color-2)",
        }),
        placeholder: (base: any) => ({
            ...base,
            fontSize: "16px",
        }),
        option: (styles: any, { data, isSelected }: any) => {
            return {
                ...styles,
                color: isSelected ? "white" : data.color,
                backgroundColor: isSelected ? data.color : "",
                fontWeight: "400",
                ":hover": {
                    backgroundColor: data.color,
                    color: "white",
                    cursor: "pointer",
                },
            };
        },
        multiValue: (styles: any, { data }: any) => {
            return {
                ...styles,
                backgroundColor: data.color,
                fontWeight: "500",
            };
        },
        multiValueLabel: (styles: any) => {
            return { ...styles, color: "white" };
        },
        multiValueRemove: (styles: any) => {
            return { ...styles, color: "white", ":hover": {} };
        },
    };
    const tableDataStructure = {
        header: {
            dataHead: [
                {
                    value: "Date",
                    style: {
                        width: "15%",
                    },
                },
                {
                    value: "Durée",
                    style: {
                        width: "15%",
                    },
                },
                {
                    value: "Patient",
                    style: {
                        width: "30%",
                    },
                },
                {
                    value: "Statut",
                    style: {
                        width: "20%",
                    },
                },
                {
                    value: "Note",
                    style: {
                        width: "20%",
                    },
                },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            ...appointments.data.map((row: any) => {
                const dateTime = new Date(row.appointmentDateTime);
                const day = dateTime.getDate().toString().padStart(2, "0");
                const month = (dateTime.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                const year = dateTime.getFullYear();
                const date = `${day}/${month}/${year}`;
                const hours = dateTime.getHours().toString().padStart(2, "0");
                const minutes = dateTime
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                return {
                    dataRow: [
                        {
                            value: (
                                <div>
                                    <div>{date}</div>
                                    <div
                                        style={{
                                            fontSize: "small",
                                            opacity: "0.7",
                                        }}
                                    >
                                        {formattedTime}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            value: <div>{row.appointmentDuration} mn</div>,
                        },
                        {
                            value: (
                                <div className='patient-in-table'>
                                    <div className='image'>
                                        <ProfilePicture
                                            src={
                                                "https://www.nicepng.com/png/detail/353-3533165_young-doctor-transpare-young-doctor.png"
                                            }
                                            alt={
                                                row.patient.firstName?.slice(
                                                    0,
                                                    1
                                                ) +
                                                row.patient.lastName?.slice(
                                                    0,
                                                    1
                                                )
                                            }
                                            color='white'
                                            bgColor='var(--color-1)'
                                            size='90%'
                                        />
                                    </div>
                                    <div>
                                        {row.patient.firstName +
                                            " " +
                                            row.patient.lastName}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        backgroundColor:
                                            statusOptions?.find(
                                                (item: any) =>
                                                    item.value?.toLowerCase() ===
                                                    row.status?.toLowerCase()
                                            )?.color || "black",
                                        color: "white",
                                        width: "fit-content",
                                        padding: "3px 6px",
                                        borderRadius: "var(--main-rd)",
                                    }}
                                >
                                    {
                                        statusOptions?.find(
                                            (item: any) =>
                                                item.value?.toLowerCase() ===
                                                row.status?.toLowerCase()
                                        )?.label
                                    }
                                </div>
                            ),
                        },
                        {
                            value: row.note || (
                                <div style={{ opacity: "0.25" }}>
                                    pas de note
                                </div>
                            ),
                        },
                    ],
                    id: row.appointmentID,
                    style: {},
                    onClickRow: () => {
                        navigate(ROUTER.APPOINTMENT_PAGE(row.appointmentID));
                    },
                };
            }),
        ],
    };
    const [toEdit, setToEdit] = React.useState<any>(null);
    //calender
    const [weekDays, setWeekDays] = React.useState<string[]>([]);
    const [weekNumber, setWeekNumber] = React.useState<number>(0);
    const [weekStep, setWeekStep] = React.useState<number>(0);
    const [selectedDay, setSelectedDay] = React.useState<Date>(new Date());
    const [isWeek] = React.useState<boolean>(true);

    const handleNextWeekStep = () => {
        setWeekStep((step) => step + 1);
    };
    const handlePreviousWeekStep = () => {
        setWeekStep((step) => step - 1);
    };

    React.useEffect(() => {
        setWeekNumber(
            DateTime.fromJSDate(
                new Date(
                    new Date().getTime() + weekStep * 24 * 60 * 60 * 1000 * 7
                )
            ).weekNumber
        );
        const { firstDayOfWeek, lastDayOfWeek } = getFirstAndLastDayOfWeek(
            new Date(new Date().getTime() + weekStep * 24 * 60 * 60 * 1000 * 7)
        );
        setCalendarLimits((prev: any) => ({
            start: firstDayOfWeek,
            end: lastDayOfWeek,
        }));
    }, [weekStep, selectedDay]);

    React.useEffect(() => {
        if (appointments.filterBy.patientID === undefined && view !== "grid") {
            handleGetAppointments();
        }
    }, [appointments.filterBy, view, currentPageNumber, itemsPerPage]);
    const [dayFilters, setDayFilters] = React.useState({
        start: "",
        end: "",
    });
    const [calendarLimits, setCalendarLimits] = React.useState({
        start: "",
        end: "",
    });
    React.useEffect(() => {
        if (calendarLimits.start && calendarLimits.end) {
            handleGetCalendarData(calendarLimits.start, calendarLimits.end);
        }
    }, [calendarLimits]);
    React.useEffect(() => {
        let start = appointments.filterBy.startDay || "";
        let end = appointments.filterBy.endDay || "";
        setDayFilters({ start, end });
    }, [appointments.filterBy]);
    const toggleView = (e: any) => {
        e.preventDefault();
        setView((prev: any) => (prev === "list" ? "grid" : "list"));
    };
    const onValidateAppointment = async () => {
        const { start, end } = calendarLimits;
        if (start && end) {
            await handleGetCalendarData(start, end);
        }
        await handleGetAppointments();
    };
    return (
        <div
            className='appointment-list main-box'
            style={{
                overflow: "hidden",
            }}
        >
            <AddAppointmentCard
                display={showAddCard}
                onClose={handleCloseCard}
                toEdit={toEdit}
                onSuccess={onValidateAppointment}
            />
            <DeleteCard
                display={openDeleteCard.display}
                onClose={() => setOpenDeleteCard({ display: false, id: "" })}
                onDelete={handleOnDeleteAppointment}
                name='ce rendez-vous'
                additionalText='Attention !! En supprimant ce rendez-vous, tous les documents et opérations dentaires associés seront également supprimés.'
                alert={true}
            />
            {view === "grid" ? (
                <div
                    style={{
                        height: "70px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "fit-content",
                            marginBottom: 8,
                            // marginLeft: "auto",
                            alignSelf: "end",
                            gap: "var(--main-gap)",
                        }}
                    >
                        {/* <div
                            className='period-views-btn'
                            style={{
                                gap: "1px",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            <button
                                className='center'
                                style={{
                                    backgroundColor: "var(--color-3)",
                                }}
                            >
                                Jour
                            </button>
                            <button
                                className='center'
                                style={{
                                    backgroundColor: "var(--color-2)",
                                }}
                            >
                                Semaine
                            </button>
                            <button
                                className='center'
                                style={{
                                    backgroundColor: "var(--color-3)",
                                }}
                            >
                                Mois
                            </button>
                        </div> */}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "fit-content",
                            marginLeft: "200px",
                        }}
                    >
                        <div
                            className='week-number'
                            style={{
                                fontSize: "small",
                                fontWeight: "bold",
                                color: "var(--color-2)",
                            }}
                        >
                            semaine {weekNumber}
                        </div>
                        <div
                            className='calender-switcher'
                            style={{
                                alignItems: "center",
                                display: "flex",
                            }}
                        >
                            <button
                                className='left-arrow'
                                onClick={handlePreviousWeekStep}
                            >
                                <SVGIcon
                                    type='left-arrow'
                                    color='inherit'
                                    width={40}
                                    height={40}
                                />
                            </button>
                            <button className='calender-btn'>
                                <label
                                    className='calender-label'
                                    htmlFor='input-date'
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "large",
                                        color: "var(--color-1)",
                                    }}
                                >
                                    {getCalenderWeekSwitcher(
                                        new Date(
                                            new Date().getTime() +
                                                weekStep *
                                                    24 *
                                                    60 *
                                                    60 *
                                                    1000 *
                                                    7
                                        )
                                    )}
                                </label>
                                <input
                                    type='date'
                                    id='input-date'
                                    style={{
                                        // position: "absolute",
                                        display: "none",
                                        clip: "rect(1px, 1px, 1px, 1px)",
                                    }}
                                />
                            </button>
                            <button
                                className='right-arrow'
                                onClick={handleNextWeekStep}
                            >
                                <SVGIcon
                                    type='right-arrow'
                                    color='inherit'
                                    width={40}
                                    height={40}
                                />
                            </button>
                        </div>
                    </div>{" "}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "fit-content",
                            width: "fit-content",
                            marginBottom: 8,
                            alignSelf: "end",
                            gap: "var(--main-gap)",
                        }}
                    >
                        <div
                            className='views-btn'
                            style={{
                                backgroundColor: "var(--color-3)",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            <button
                                className='center'
                                style={{
                                    backgroundColor: `${
                                        view === "grid" ? "var(--color-2)" : ""
                                    }`,
                                    padding: "var(--pd-0)",

                                    borderRight: "1px solid white",
                                }}
                                onClick={toggleView}
                            >
                                <GridViewSVG />
                            </button>
                            <button
                                className='center'
                                style={{
                                    backgroundColor: `${
                                        view === "list" ? "var(--color-2)" : ""
                                    }`,
                                    padding: "var(--pd-0)",
                                }}
                                onClick={toggleView}
                            >
                                <ListViewSVG />
                            </button>
                        </div>

                        <Button
                            text='Ajouter Rendez-vous'
                            iconName='add'
                            iconWidth={20}
                            iconHeight={20}
                            iconColor='white'
                            onClick={handleOpenCard}
                        />
                    </div>
                </div>
            ) : (
                <form className='filters'>
                    <div>
                        <label htmlFor=''>Rechercher</label>

                        <div className='search'>
                            <SVGIcon
                                type='search'
                                color='var(--color-1)'
                                width={25}
                                height={25}
                            />
                            <input
                                name='search'
                                type='text'
                                placeholder='Rechercher...'
                                value={appointments.filterBy.search}
                                onChange={(e) =>
                                    handleChangeAppointmentsFilters([
                                        {
                                            name: e.target.name,
                                            value: e.target.value,
                                        },
                                    ])
                                }
                            />
                        </div>
                    </div>
                    <div className='date'>
                        <label htmlFor='startDay'>Depuis le</label>
                        <input
                            type='date'
                            name='startDay'
                            id='startDay'
                            value={dayFilters.start}
                            onChange={(e) =>
                                handleChangeAppointmentsFilters([
                                    {
                                        name: e.target.name,
                                        value: e.target.value,
                                    },
                                ])
                            }
                        />
                    </div>
                    <div className='date'>
                        <label htmlFor='endDay'>Jusqu'à le</label>
                        <input
                            type='date'
                            name='endDay'
                            id='endDay'
                            value={dayFilters.end}
                            onChange={(e) =>
                                handleChangeAppointmentsFilters([
                                    {
                                        name: e.target.name,
                                        value: e.target.value,
                                    },
                                ])
                            }
                        />
                    </div>
                    <div
                        className='status'
                        style={{
                            zIndex: "19",
                        }}
                    >
                        <label htmlFor=''>Statut</label>
                        <Select
                            options={statusOptions}
                            styles={colorStyles}
                            isMulti
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "var(--color-1)",
                                },
                            })}
                            isSearchable={false}
                            placeholder='Selectionner...'
                            noOptionsMessage={() => "Aucune option"}
                            onChange={(item) =>
                                handleChangeAppointmentsFilters([
                                    {
                                        name: "status",
                                        value: item?.map(
                                            (status) => status.value
                                        ),
                                    },
                                ])
                            }
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "fit-content",
                            marginBottom: 8,
                            marginLeft: "auto",
                            alignSelf: "end",
                            gap: "var(--main-gap)",
                        }}
                    >
                        <div
                            className='views-btn'
                            style={{
                                backgroundColor: "var(--color-3)",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            <button
                                className='center'
                                style={{
                                    backgroundColor: `${
                                        view === "grid" ? "var(--color-2)" : ""
                                    }`,
                                    padding: "var(--pd-0)",

                                    borderRight: "1px solid white",
                                }}
                                onClick={toggleView}
                            >
                                <GridViewSVG />
                            </button>
                            <button
                                className='center'
                                style={{
                                    backgroundColor: `${
                                        view === "list" ? "var(--color-2)" : ""
                                    }`,
                                    padding: "var(--pd-0)",
                                }}
                                onClick={toggleView}
                            >
                                <ListViewSVG />
                            </button>
                        </div>

                        <Button
                            text='Ajouter Rendez-vous'
                            iconName='add'
                            iconWidth={20}
                            iconHeight={20}
                            iconColor='white'
                            onClick={handleOpenCard}
                        />
                    </div>
                </form>
            )}

            <div className='list'>
                {view === "grid" ? (
                    <Calender
                        view={view}
                        isWeek={isWeek}
                        weekDays={weekDays}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        weekStep={weekStep}
                        setWeekDays={setWeekDays}
                        setWeekNumber={setWeekNumber}
                        loading={appointments.calendar.loading}
                    />
                ) : (
                    // <div></div>

                    <Table
                        // pagination={appointments.pagination}
                        pagination={true}
                        tableDataStructure={tableDataStructure}
                        tableOptions={tableOptions}
                        loading={appointments.loading}
                        noDataMessage='Aucun rendez-vous trouvé'
                    />
                )}
            </div>
        </div>
    );
}
