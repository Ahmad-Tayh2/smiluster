/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import "./style.css";
import Button from "../../components/Button";
import Table from "../../components/Table";
import SVGIcon from "../../components/SVGIcon";
import PatientCardForm from "../../components/PatientCardForm";
import DeleteCard from "../../components/DeleteCard";
import { usePatients } from "../../hooks/usePatients";
import { ReactComponent as EditSVG } from "../../icons/edit.svg";
import { ReactComponent as DeleteSVG } from "../../icons/trash.svg";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../constants/env";
import { DateTime } from "luxon";
import { usePagination } from "../../hooks/usePagination";
export default function Patient() {
    const {
        patients,
        handleGetPatients,
        handleSetFilter,
        handleGetPatient,
        patient,
        handleAddPatient,
        handleUpdatePatient,
        handleDeletePatient,
        handleResetPatient,
    } = usePatients();
    const navigate = useNavigate();
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

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        handleSetFilter({ [name]: value });
    };

    const handleChangeGender = (option: any) => {
        handleSetFilter({ gender: option });
    };

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
        option: (styles: any, { data }: any) => {
            return {
                ...styles,
                color: data.color,
                fontWeight: "400",
                cursor: "pointer",
            };
        },
    };

    React.useEffect(() => {
        if (
            currentPageNumber ||
            itemsPerPage ||
            patients.list.filterBy.dateOfBirth ||
            patients.list.filterBy.gender ||
            patients.list.filterBy.search
        ) {
            handleGetPatients();
        }
    }, [patients.list.filterBy, currentPageNumber, itemsPerPage]);

    const [showAddCard, setShowAddCard] = React.useState<boolean>(false);

    const handleOpenCard = () => {
        setShowAddCard(true);
    };
    const handleCloseCard = () => {
        setShowAddCard(false);
    };
    const listOfPatient = () => {
        let result = [];
        if (patients.list.data) {
            result = patients.list.data.map((patient: any) => {
                let patientDateBirth;
                if (DateTime.fromISO(patient.dateOfBirth).isValid) {
                    patientDateBirth = DateTime.fromISO(
                        patient.dateOfBirth
                    ).toFormat("dd/LL/yyyy");
                } else {
                    patientDateBirth = " - ";
                }
                const patientInfo = [
                    {
                        value: (
                            <div className='patient-entry'>
                                {patient.patientID}
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>{`${patient.firstName} ${patient.lastName}`}</div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {patientDateBirth}
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {/* {patient.gender.toLowerCase() === "male"
                                    ? "Homme"
                                    : "Femme"} */}
                                <div
                                    style={{
                                        color: "white",
                                        padding: "2px 4px",
                                        borderRadius: "var(--main-rd)",
                                        backgroundColor:
                                            patients.sexeOptions.find(
                                                (option: any) =>
                                                    option.value?.toLowerCase() ===
                                                    patient.gender?.toLowerCase()
                                            )?.color,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "fit-content",
                                    }}
                                >
                                    {/* {patients.sexeOptions.find(
                                        (option: any) =>
                                            option.value?.toLowerCase() ===
                                            patient.gender?.toLowerCase()
                                    )?.label || "opps!!"} */}
                                    <SVGIcon
                                        type={
                                            patients.sexeOptions.find(
                                                (option: any) =>
                                                    option.value?.toLowerCase() ===
                                                    patient.gender?.toLowerCase()
                                            )?.iconType
                                        }
                                        color='white'
                                        height={25}
                                        width={25}
                                    />
                                </div>
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {patient.phoneNumber}
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>{patient.email}</div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {patient.address}
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {patient.generalState}
                            </div>
                        ),
                    },
                    {
                        value: (
                            <div className='patient-entry'>
                                {patient.profession}
                            </div>
                        ),
                    },
                ];
                return {
                    id: patient.patientID,
                    dataRow: patientInfo,
                    style: {},
                    onClickRow: () => {
                        navigate(ROUTER.PATIENT_PROFILE(patient.patientID));
                    },
                };
            });
        }
        return result;
    };

    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [patientInfo, setPatientInfo] = React.useState({
        patientID: "",
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

    React.useEffect(() => {
        if (patient.data) {
            setPatientInfo(patient.data);
        }
    }, [patient]);

    const handlePatientEdit = async (patientID: any) => {
        await handleGetPatient(patientID);
        setIsEditOpen(true);
    };
    const handlePatientUpdate = async (patient: any) => {
        await handleUpdatePatient(patient);
        await handleGetPatients();
    };
    const handleNewPatientCreation = async (patient: any) => {
        await handleAddPatient(patient);
        await handleResetPatient();
        await handleGetPatients();
    };

    const [showDeleteCard, setShowDeleteCard] = React.useState(false);
    const [patientToDelete, setPatientToDelete] = React.useState("");
    const handlePatientDelete = (patientID: any) => {
        setShowDeleteCard(true);
        setPatientToDelete(patientID);

        // console.log("patient ID: ", patientID);
        // Swal.fire({
        //     title: "Are you sure you want to delete this patient?",
        //     showCancelButton: true,
        //     cancelButtonText: "NON",
        //     confirmButtonText: "OUI",
        //     confirmButtonColor: "#e74c3c",
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         await handleDeletePatient(patientID);
        //         await handleGetPatients();
        //     }
        // });
    };
    const handleOnDeletePatient = async () => {
        if (patientToDelete) {
            await handleDeletePatient(patientToDelete);
            await handleGetPatients();
            setShowDeleteCard(false);
        }
    };

    return (
        <div className='patient-list-page'>
            <div className='page-title'>Patients</div>

            <div className='patient-list main-box'>
                <div className='header-container'>
                    <div className='filters'>
                        <div>
                            <label htmlFor='search'>Rechercher </label>
                            <div className='search'>
                                <SVGIcon
                                    type={"search"}
                                    color='var(--color-1)'
                                    width={25}
                                    height={25}
                                />
                                <input
                                 
                                    type='text'
                                    placeholder='Rechercher'
                                    name='search'
                                    onChange={handleOnChange}
                                    value={patients.list.filterBy.search}
                                />
                            </div>
                        </div>
                        <div className='date'>
                            <label htmlFor='dateOfBirth'>
                                Date de naissance
                            </label>
                            <input
                                type='date'
                                name='dateOfBirth'
                                id='dateOfBirth'
                                value={patients.list.filterBy.dateOfBirth}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div
                            className='gender'
                            style={{
                                zIndex: "19",
                            }}
                        >
                            <label htmlFor=''>Sexe</label>
                            <Select
                                options={[
                                    { value: undefined, label: "Tous" },
                                    { value: "male", label: "Homme" },
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
                                value={patients.list.filterBy.gender}
                                onChange={handleChangeGender}
                            />
                        </div>
                    </div>
                    {/* <div className='search'>
                        <label htmlFor='search'>
                            <SVGIcon
                                name={"search"}
                                color='var(--color-1)'
                                width={25}
                                height={25}
                            />
                        </label>
                        <input
                            name='search'
                            id='search'
                            type='text'
                            placeholder='Rechercher...'
                            value={patients.filterBy.search}
                            onChange={handleOnChange}
                        />
                    </div> */}
                    <Button
                        text='Ajouter Patient'
                        iconName='add'
                        iconWidth={20}
                        iconHeight={20}
                        iconColor='white'
                        onClick={handleOpenCard}
                        style={{
                            marginBottom: 8,
                            marginLeft: "auto",
                            alignSelf: "end",
                        }}
                    />
                    <PatientCardForm
                        display={showAddCard}
                        onClose={handleCloseCard}
                        onAdd={handleNewPatientCreation}
                    />
                    {/* <div className='head'>
                       
                        
                    </div> */}
                </div>
                <div className='list'>
                    <Table
                        tableDataStructure={{
                            header: {
                                dataHead: [
                                    { value: "ID" },
                                    { value: "Nom et prénom" },
                                    { value: "Date de naissance" },
                                    { value: "Sexe" },
                                    { value: "Tél." },
                                    { value: "E-mail" },
                                    { value: "Addresse" },
                                    { value: "État génerale" },
                                    { value: "Profession" },
                                ],
                            },
                            data: listOfPatient(),
                        }}
                        tableOptions={[
                            {
                                label: "Modifier",
                                icon: <EditSVG width={20} height={20} />,
                                link: null,
                                onClick: handlePatientEdit,
                            },
                            {
                                label: "Supprimer",
                                icon: <DeleteSVG width={20} height={20} />,
                                link: null,
                                onClick: handlePatientDelete,
                            },
                        ]}
                        noDataMessage='Aucun patient trouvé'
                        loading={patients.list.loading}
                    />
                    <DeleteCard
                        display={showDeleteCard}
                        onClose={() => setShowDeleteCard(false)}
                        onDelete={handleOnDeletePatient}
                        name='patient'
                        additionalText='Attention !! En supprimant ce patient, tous les rendez-vous, documents et opérations dentaires associés seront également supprimés.'
                        alert={true}
                    />
                    <PatientCardForm
                        display={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        initialPatient={patientInfo}
                        onUpdate={handlePatientUpdate}
                    />
                </div>
            </div>
        </div>
    );
}
