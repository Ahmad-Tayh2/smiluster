import React from "react";
import "./style.css";
// import SVGIcon from "../../components/SVGIcon";
import AppointmentsList from "../../components/AppointmentsList";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { useAppointments } from "../../hooks/useAppointments";

// import { getCalenderWeekSwitcher } from "../../utils/calenderFunctions";
export default function Appointments() {
    // const {
    //     appointments,
    //     handleGetAppointments,
    //     // handleChangeAppointmentsFilters,
    //     resetAppointments,
    // } = useAppointments();

    //------------------------------------------
    // React.useEffect(() => {
    //     return () => {
    //         resetAppointments();
    //     };
    // }, []);
    // React.useEffect(() => {
    //     if (appointments.filterBy.patientID === undefined) {
    //         handleGetAppointments();
    //     }
    // }, [appointments.filterBy]);

    return (
        <div className='appointment-page'>
            <div className='top'>
                <div className='page-title'>Calendrier de Rendez-vous</div>
            </div>
            {/* <div className='head main-box'>
                <Button
                    text='Ajouter Rendez-vous'
                    iconName='add'
                    iconWidth={20}
                    iconHeight={20}
                    iconColor='white'
                    onClick={handleOpenCard}
                />
               
                {view === "grid" && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className='week-number'
                            style={{
                                fontSize: "small",
                                fontWeight: "bold",
                                color: "var(--color-1)",
                            }}
                        >
                            semaine {weekNumber}
                        </div>
                        <div className='calender-switcher'>
                            <button
                                className='left-arrow '
                                onClick={handlePreviousWeekStep}
                            >
                                <SVGIcon
                                    type='left-arrow'
                                    color='var(--color-1)'
                                    width={30}
                                    height={30}
                                />
                            </button>
                            <button className='calender-btn'>
                                <label
                                    className='calender-label'
                                    htmlFor='input-date'
                                    style={
                                        {
                                            // fontSize: "small",
                                        }
                                    }
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
                                    color='var(--color-1)'
                                    width={30}
                                    height={30}
                                />
                            </button>
                        </div>
                    </div>
                )}
                <div></div>
                // {view === "grid" && (
                //    <div className='calender-views-tabs'>
                //        <button
                //            className={`${isWeek ? "active-tab" : ""}`}
                //            onClick={toggleWeekDayView}
                //        >
                //            Week
                //        </button>
                //        <button
                //             className={`${!isWeek ? "active-tab" : ""}`}
                //             onClick={toggleWeekDayView}
                //         >
                //             Day
                //         </button>
                //     </div>
                // )} 
            </div> */}

            <AppointmentsList
            // isWeek={isWeek}
            // weekDays={weekDays}
            // selectedDay={selectedDay}
            // setSelectedDay={setSelectedDay}
            // weekStep={weekStep}
            // setWeekDays={setWeekDays}
            // setWeekNumber={setWeekNumber}
            />
        </div>
    );
}
