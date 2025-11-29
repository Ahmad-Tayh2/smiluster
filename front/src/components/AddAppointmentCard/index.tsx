import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { usePatients } from "../../hooks/usePatients";
import { useAppointments } from "../../hooks/useAppointments";
import {
    createAppointmentDateTime,
    reverseAppointmentDateTime,
} from "../../utils/functions";
import { DateTime } from "luxon";

export default function AddAppointmentCard(props: AddAppointmentCardProps) {
    const { display, onClose, toEdit, existing, onSuccess } = props;
    const {
        patients,
        handleSetFilter,
        handleGetPatients,
        resetPatientsFilter,
    } = usePatients();
    const {
        appointments,
        handleAddAppointment,
        handleUpdateAppointment,
        resetErrors,
    } = useAppointments();
    const [selectedStatusOption, setSelectedStatusOption] = React.useState<any>(
        { ...appointments.statusOptions[0] },
    );
    const [oldPatient, setOldPatient] = React.useState<boolean>(true);
    const [newPatient, setNewPatient] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const [newAppointment, setNewAppointment] = React.useState({
        patientID: undefined,
        date: "",
        time: "",
        duration: undefined,
        status: selectedStatusOption?.value,
        note: "",
    });
    const resetAllStates = () => {
        resetPatientsFilter();
        // setSelectedOption(null);
        setSelectedStatusOption({ ...appointments.statusOptions[0] });
        setNewAppointment({
            patientID: undefined,
            date: "",
            time: "",
            duration: undefined,
            status: selectedStatusOption?.value,
            note: "",
        });
        setNewPatient({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
        });
        setOldPatient(true);
        resetErrors();
    };
    const handleClose = () => {
        resetAllStates();
        onClose && onClose();
    };
    React.useEffect(() => {
        if (toEdit) {
            let editedAppointment: any = {
                status: toEdit.status,
                patientID: toEdit.patientID,
                duration: toEdit.appointmentDuration,
            };
            if (toEdit.note) {
                editedAppointment.note = toEdit.note;
            }
            const reversedDateTime = reverseAppointmentDateTime(
                toEdit.appointmentDateTime,
            );
            editedAppointment.date = reversedDateTime.date;
            editedAppointment.time = reversedDateTime.time;
            setNewAppointment(editedAppointment);
            // setSelectedOption({
            //     label:
            //         toEdit.patient.firstName +
            //         " " +
            //         toEdit.patient.lastName +
            //         " - " +
            //         toEdit.patient.phoneNumber,
            //     value: toEdit.patientID,
            // });
            setSelectedStatusOption({
                label:
                    appointments.statusOptions.find(
                        (option: any) =>
                            option.value.toLowerCase() ===
                            toEdit.status.toLowerCase(),
                    )?.label || toEdit.status,
                value: toEdit.status,
            });
        }
    }, [toEdit]);
    const onAddAppointment = async () => {
        let appointment: any = {
            status: newAppointment.status,
            note: newAppointment.note,
            appointmentDuration: newAppointment.duration,
        };
        if (newAppointment.time && newAppointment.date) {
            appointment.appointmentDateTime = createAppointmentDateTime(
                newAppointment.date,
                newAppointment.time,
            );
        }
        if (oldPatient) {
            appointment.patientID = newAppointment.patientID;
        } else {
            appointment.newPatient = { ...newPatient };
        }
        const ok = await handleAddAppointment(appointment);
        if (ok) {
            onSuccess?.();
            handleClose();
        }
    };

    const onUpdateAppointment = async () => {
        let appointment: any = {
            status: newAppointment.status,
            note: newAppointment.note,
            appointmentDuration: newAppointment.duration,
        };
        if (newAppointment.time && newAppointment.date) {
            appointment.appointmentDateTime = createAppointmentDateTime(
                newAppointment.date,
                newAppointment.time,
            );
        }
        if (oldPatient) {
            appointment.patientID = newAppointment.patientID;
        } else {
            appointment.newPatient = { ...newPatient };
        }
        const ok = await handleUpdateAppointment(
            appointment,
            toEdit.appointmentID,
        );
        if (ok) {
            handleClose();
        }
    };
    const colorStyles = {
        control: (styles: any, state: any) => ({
            ...styles,
            width: "100%",
            height: "40px",
            border: "none",
            backgroundColor: state.isFocused ? "white" : "var(--gray-0)",
            transition: " 0.2s ease-in-out",
        }),
        placeholder: (base: any) => ({
            ...base,
            fontSize: "16px",
        }),
        menu: (provided: any) => ({
            ...provided,
            // maxHeight: "90px",
            // overflowY: "auto",
        }),
        option: (styles: any, { data, isSelected }: any) => {
            return {
                ...styles,
                color: isSelected ? "white" : data.color,
                backgroundColor: isSelected ? data.color : "white",
                fontWeight: "400",
                cursor: "pointer",
            };
        },
    };

    const popupButtons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: handleClose,
        },
        {
            text: toEdit ? "Modifiter" : "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
                opacity: (
                    toEdit
                        ? appointments.edit.loading
                        : appointments.create.loading
                )
                    ? "0.5"
                    : "1",
            },
            disabled: toEdit
                ? appointments.edit.loading
                : appointments.create.loading,
            onClick: toEdit ? onUpdateAppointment : onAddAppointment,
        },
    ];
    React.useEffect(() => {
        if (display) {
            handleGetPatients();
        }
    }, [display]);
    // const [selectedOption, setSelectedOption] = React.useState<{
    //     label: string;
    //     value: string;
    // } | null>(null);
    // const loadOptions = (searchValue: any, callBack: any) => {
    //     setTimeout(() => {
    //         handleSetFilter({ search: searchValue });
    //         callBack(
    //             patients.list.data.map((item: any) => ({
    //                 label:
    //                     item.firstName +
    //                     " " +
    //                     item.lastName +
    //                     " - " +
    //                     item.phoneNumber,
    //                 value: item.patientID,
    //             })),
    //         );
    //     }, 1000);
    // };
    const patientsOptions = React.useMemo(() => {
        if (patients.list?.data?.length > 0) {
            return patients.list.data.map((item: any) => ({
                label:
                    item.firstName +
                    " " +
                    item.lastName +
                    " - " +
                    item.phoneNumber,
                value: item.patientID,
            }));
        } else {
            return [];
        }
    }, [patients.list.data]);
    const appointmentInfo = () => {
        return (
            <div className="appointment-infos">
                <div>
                    <label htmlFor="">
                        Date de rendez-vous
                        <Star />
                    </label>
                    <input
                        name="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) =>
                            setNewAppointment((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="status">
                    <label htmlFor="">Statut</label>
                    <Select
                        options={appointments.statusOptions}
                        styles={colorStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "var(--color-1)",
                            },
                        })}
                        isSearchable={false}
                        placeholder="Selectionner..."
                        noOptionsMessage={() => "Aucune option"}
                        value={selectedStatusOption}
                        onChange={(item) => {
                            if (item?.value) {
                                setNewAppointment((prev) => ({
                                    ...prev,
                                    status: item.value,
                                }));
                                setSelectedStatusOption({
                                    label: item.label,
                                    value: item.value,
                                });
                            }
                        }}
                    />
                </div>
                <div className="note">
                    <label htmlFor="">Note</label>
                    <textarea
                        name="note"
                        value={newAppointment.note}
                        onChange={(e) =>
                            setNewAppointment((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="">
                        Temps de rendez-vous
                        <Star />
                    </label>
                    <input
                        name="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) =>
                            setNewAppointment((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <label htmlFor="">
                        Durée
                        <Star />
                        <span
                            style={{
                                opacity: "0.7",
                                fontSize: "small",
                            }}
                        >
                            (en minutes)
                        </span>
                    </label>
                    <input
                        name="duration"
                        type="number"
                        value={newAppointment.duration}
                        onChange={(e) =>
                            setNewAppointment((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
        );
    };
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={`${toEdit ? "Modifier" : "Ajouter"} Rendez-vous`}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={popupButtons}
            >
                {!existing && (
                    <div className="add-appointment-tabs">
                        <div
                            className={`tab ${oldPatient ? "active-form" : ""}`}
                            onClick={() => setOldPatient(true)}
                        >
                            Ancien patient
                        </div>
                        <div
                            className={`tab ${
                                !oldPatient ? "active-form" : ""
                            }`}
                            onClick={() => setOldPatient(false)}
                        >
                            Nouveau patient
                        </div>
                    </div>
                )}
                <div className="appointment-form">
                    {oldPatient ? (
                        <form>
                            {!existing && (
                                <div className="search">
                                    <label htmlFor="search-bar">
                                        Merci de procéder à la recherche du
                                        patient afin de prendre un rendez-vous.
                                        <Star />
                                    </label>
                                    <Select
                                        options={patientsOptions}
                                        // defaultValue={selectedOption}
                                        placeholder={
                                            "Selectionner un ancien patient..."
                                        }
                                        onChange={(item: any) => {
                                            if (item && item.value) {
                                                setNewAppointment((prev) => ({
                                                    ...prev,
                                                    patientID: item.value,
                                                }));
                                            }
                                        }}
                                        styles={{
                                            control: (
                                                styles: any,
                                                state: any,
                                            ) => ({
                                                ...styles,
                                                width: "460px",
                                                height: "40px",
                                                border: "none",
                                                backgroundColor: state.isFocused
                                                    ? "white"
                                                    : "var(--gray-0)",
                                                transition: " 0.2s ease-in-out",
                                            }),
                                        }}
                                    />
                                </div>
                            )}
                            {appointmentInfo()}
                        </form>
                    ) : (
                        <form>
                            <p>
                                Merci de procéder à la création d'un nouveau
                                patient afin de prendre un rendez-vous.
                            </p>
                            <div className="appointment-infos">
                                <div>
                                    <label htmlFor="">
                                        Nom
                                        <Star />
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={newPatient.lastName}
                                        onChange={(e) =>
                                            setNewPatient((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">
                                        Prénon
                                        <Star />
                                    </label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        value={newPatient.firstName}
                                        onChange={(e) =>
                                            setNewPatient((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">
                                        Numéro de téléphone
                                        <Star />
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        type="text"
                                        value={newPatient.phoneNumber}
                                        onChange={(e) =>
                                            setNewPatient((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <input
                                        name="email"
                                        type="text"
                                        value={newPatient.email}
                                        onChange={(e) =>
                                            setNewPatient((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            {appointmentInfo()}
                        </form>
                    )}
                    {appointments.create.error && !toEdit ? (
                        <div className="form-error">
                            {appointments.create.error}
                        </div>
                    ) : (
                        appointments.edit.error &&
                        toEdit && (
                            <div className="form-error">
                                {appointments.edit.error}
                            </div>
                        )
                    )}
                </div>
            </PopupCard>
        </Modal>
    );
}

const Star = () => {
    return (
        <span
            style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "medium",
                padding: "0 2px",
            }}
        >
            *
        </span>
    );
};
interface AddAppointmentCardProps {
    display: boolean;
    onClose?: () => void;
    toEdit?: any;
    existing?: boolean;
    onSuccess?: () => void;
}
