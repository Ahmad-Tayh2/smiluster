/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
// import { usePatients } from "../../hooks/usePatients";
import Select from "react-select";
import { DateTime } from "luxon";

import "./style.css";
export default function PatientCardForm(props: PatientCardFormProps) {
    const { display, onClose, initialPatient, onUpdate, onAdd } = props;
    const [patient, setPatient] = React.useState(
        initialPatient || {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            email: "",
            profession: "",
            address: "",
            generalState: "",
        }
    );
    const [selectedGender, setSelectedGender] = React.useState({});
    const [selectedDate, setselectedDate] = React.useState<any>();

    React.useEffect(() => {
        if (initialPatient) {
            setPatient(initialPatient);
            setSelectedGender({
                value: initialPatient.gender,
                label:
                    initialPatient.gender?.toLowerCase() === "male"
                        ? "Homme"
                        : "Femme",
            });
            setselectedDate(
                DateTime.fromISO(initialPatient.dateOfBirth).toFormat(
                    "yyyy-LL-dd"
                )
            );
        }
    }, [initialPatient]);

    const handleSelectGender = (option: any) => {
        setSelectedGender(option);
        setPatient((prev) => ({ ...prev, gender: option.value }));
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
        option: (styles: any, { data, isSelected }: any) => {
            return {
                ...styles,
                color: isSelected ? "white" : data.color,
                backgroundColor: isSelected ? "var(--color-1)" : data.color,
                fontWeight: "400",
                ":hover": {
                    // backgroundColor: data.color,
                    // color: "white",
                    cursor: "pointer",
                },
            };
        },
    };
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setPatient((prev) => ({ ...prev, [name]: value }));
        if (name === "dateOfBirth") {
            setselectedDate(value);
        }
    };

    const submitAction = initialPatient ? onUpdate : onAdd;

    const submitButtonText = initialPatient ? "Modifier" : "Ajouter";

    const submitFunction = () => {
        submitAction?.(patient);
        setPatient({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            phoneNumber: "",
            email: "",
            profession: "",
            address: "",
            generalState: "",
        });
        onClose && onClose();
    };

    const buttons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: onClose,
        },
        {
            text: submitButtonText,
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: submitFunction,
        },
    ];

    return (
        <Modal modalEnabled={display} onClose={onClose}>
            <PopupCard
                title={
                    initialPatient
                        ? "Modifier le patient"
                        : "Ajouter un patient"
                }
                activatedFooter={true}
                onClose={onClose}
                display={display}
                buttons={buttons}
            >
                <div className='add-patient-form'>
                    <form>
                        <div className='add-patient-infos'>
                            <div className='info-item'>
                                <label htmlFor='firstName'>
                                    Nom
                                    <Star />
                                </label>
                                <input
                                    name='firstName'
                                    type='text'
                                    value={patient.firstName}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>
                                    Prénom
                                    <Star />
                                </label>
                                <input
                                    name='lastName'
                                    type='text'
                                    value={patient.lastName}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>
                                    Numéro de téléphone
                                    <Star />
                                </label>
                                <input
                                    name='phoneNumber'
                                    type='text'
                                    value={patient.phoneNumber}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>Date de naissance<Star/></label>
                                <input
                                    name='dateOfBirth'
                                    type='date'
                                    value={selectedDate}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>Email</label>
                                <input
                                    name='email'
                                    type='email'
                                    value={patient.email}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>Addresse</label>
                                <input
                                    name='address'
                                    type='text'
                                    value={patient.address}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>Sexe</label>
                                <Select
                                    options={[
                                        { value: "Male", label: "Homme" },
                                        { value: "female", label: "Femme" },
                                    ]}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "var(--color-1)",
                                        },
                                    })}
                                    styles={colorStyles}
                                    isSearchable={false}
                                    placeholder='Selectionner...'
                                    value={selectedGender}
                                    onChange={handleSelectGender}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>Profession</label>
                                <input
                                    name='profession'
                                    type='text'
                                    value={patient.profession}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className='info-item'>
                                <label htmlFor=''>État générale</label>
                                <textarea
                                    name='generalState'
                                    value={patient.generalState}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>
                        </div>
                    </form>
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
interface PatientCardFormProps {
    initialPatient?: {
        patientID: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        gender: string;
        phoneNumber: string;
        email: string;
        profession: string;
        address: string;
        generalState: string;
    };
    display: boolean;
    onClose?: () => void;
    onUpdate?: (patient: any) => void;
    onAdd?: (patient: any) => void;
}
