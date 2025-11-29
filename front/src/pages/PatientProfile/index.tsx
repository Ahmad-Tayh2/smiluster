/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import PatientAppointmentsList from "../../components/PatientAppointmentsList";
import Documents from "../../components/Documents";
// import Prescriptions from "../../components/Prescriptions";
import Chart from "../../components/Chart";
import { useAppointments } from "../../hooks/useAppointments";
import SVGIcon from "../../components/SVGIcon";
import PatientCardForm from "../../components/PatientCardForm";
import DeleteCard from "../../components/DeleteCard";
import { ROUTER } from "../../constants/env";
import { PulseLoader } from "react-spinners";
import tooth11 from "../../assets/images/teeth/11.png";
import tooth12 from "../../assets/images/teeth/12.png";
import tooth13 from "../../assets/images/teeth/13.png";
import tooth14 from "../../assets/images/teeth/14.png";
import tooth15 from "../../assets/images/teeth/15.png";
import tooth16 from "../../assets/images/teeth/16.png";
import tooth17 from "../../assets/images/teeth/17.png";
import tooth18 from "../../assets/images/teeth/18.png";
import tooth21 from "../../assets/images/teeth/21.png";
import tooth22 from "../../assets/images/teeth/22.png";
import tooth23 from "../../assets/images/teeth/23.png";
import tooth24 from "../../assets/images/teeth/24.png";
import tooth25 from "../../assets/images/teeth/25.png";
import tooth26 from "../../assets/images/teeth/26.png";
import tooth27 from "../../assets/images/teeth/27.png";
import tooth28 from "../../assets/images/teeth/28.png";
import tooth31 from "../../assets/images/teeth/31.png";
import tooth32 from "../../assets/images/teeth/32.png";
import tooth33 from "../../assets/images/teeth/33.png";
import tooth34 from "../../assets/images/teeth/34.png";
import tooth35 from "../../assets/images/teeth/35.png";
import tooth36 from "../../assets/images/teeth/36.png";
import tooth37 from "../../assets/images/teeth/37.png";
import tooth38 from "../../assets/images/teeth/38.png";
import tooth41 from "../../assets/images/teeth/41.png";
import tooth42 from "../../assets/images/teeth/42.png";
import tooth43 from "../../assets/images/teeth/43.png";
import tooth44 from "../../assets/images/teeth/44.png";
import tooth45 from "../../assets/images/teeth/45.png";
import tooth46 from "../../assets/images/teeth/46.png";
import tooth47 from "../../assets/images/teeth/47.png";
import tooth48 from "../../assets/images/teeth/48.png";
const teethImages = {
    tooth11,
    tooth12,
    tooth13,
    tooth14,
    tooth15,
    tooth16,
    tooth17,
    tooth18,
    tooth21,
    tooth22,
    tooth23,
    tooth24,
    tooth25,
    tooth26,
    tooth27,
    tooth28,
    tooth31,
    tooth32,
    tooth33,
    tooth34,
    tooth35,
    tooth36,
    tooth37,
    tooth38,
    tooth41,
    tooth42,
    tooth43,
    tooth44,
    tooth45,
    tooth46,
    tooth47,
    tooth48,
};
export default function PatientProfile() {
    const { id } = useParams<{ id: string }>();
    const {
        handleChangePatientAppointmentsFilters,
        patientAppointments,
        handleGetPatientAppointments,
        clearPatientAppointments,
    } = useAppointments();
    // const { children } = props;

    const {
        patient,
        handleGetPatient,
        handleUpdatePatient,
        patients,
        handleDeletePatient,
    } = usePatients();
    const [patientBirthDay, setPatientBirthday] = React.useState<any>({});
    React.useEffect(() => {
        if (id) {
            const func = async () => {
                await handleGetPatient(id);
                await handleChangePatientAppointmentsFilters([
                    { name: "patientID", value: id },
                ]);
            };
            func();
        }
        return () => {
            clearPatientAppointments();
        };
    }, [id]);
    React.useEffect(() => {
        if (patientAppointments.filterBy.patientID) {
            handleGetPatientAppointments();
        }
    }, [patientAppointments.filterBy]);

    React.useEffect(() => {
        if (patient.data) {
            const birthday = new Date(patient.data?.dateOfBirth);
            const day = birthday.getDate().toString().padStart(2, "0");
            const month = (birthday.getMonth() + 1).toString().padStart(2, "0");
            const year = birthday.getFullYear();
            setPatientBirthday({
                day: `${day}/${month}/${year}`,
                age: new Date().getFullYear() - year,
            });
        }
    }, [patient.data]);
    const handlePatientUpdate = async (patient: any) => {
        await handleUpdatePatient(patient);
        await handleGetPatient(patient.patientID);
    };
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [toEdit, setToEdit] = React.useState(undefined);
    const [openCard, setOpenCard] = React.useState(false);
    const [showDeleteCard, setShowDeleteCard] = React.useState(false);
    const navigate = useNavigate();
    const handleOnDeleteAppointment = async () => {
        const ok = await handleDeletePatient(id || "");
        if (ok) {
            setShowDeleteCard(false);
            navigate(ROUTER.PATIENTS);
        }
    };

    return (
        <div className="patient-profile-page">
            <PatientCardForm
                display={openCard}
                onClose={() => setOpenCard(false)}
                initialPatient={toEdit}
                onUpdate={handlePatientUpdate}
            />
            <DeleteCard
                display={showDeleteCard}
                onClose={() => setShowDeleteCard(false)}
                onDelete={handleOnDeleteAppointment}
                name="ce patient"
                additionalText="Attention !! En supprimant ce patient, toutes les rendez-vous, documents et opérations dentaires liés à ce patient seront également supprimés."
                alert={true}
            />
            <div className="page-title">Fiche patient</div>
            {patient.loading ? (
                <div
                    className="patient-profile-page center main-box"
                    style={{}}
                >
                    <PulseLoader
                        color={"var(--color-1)"}
                        loading={true}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="content">
                    <div className="header-profile center main-box">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <div
                                className="photo"
                                style={{
                                    height: "60px",
                                    width: "60px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "var(--main-rd)",
                                    border: "1px solid var(--gray-1)",
                                    overflow: "hidden",
                                }}
                            >
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "var(--main-gap)",
                                }}
                            >
                                <div className="id">
                                    #{patient.data?.patientID}
                                </div>
                                <div className="name">
                                    {patient.data?.firstName +
                                        " " +
                                        patient.data?.lastName}
                                </div>
                            </div>
                        </div>
                        <div className="info-list" style={{ overflow: "auto" }}>
                            <div className="data-slice">
                                <div className="data-name">Téléphone</div>
                                <div className="data-text">
                                    {patient.data?.phoneNumber}
                                </div>
                            </div>

                            <div className="data-slice">
                                <div className="data-name">Email</div>
                                <div className="data-text">
                                    {patient.data?.email || "-"}
                                </div>
                            </div>

                            {patient.data?.dateOfBirth ? (
                                <div className="data-slice">
                                    <div className="data-name">
                                        Date de naissance (
                                        <b> {patientBirthDay?.age}</b> ans)
                                    </div>
                                    <div className="data-text">
                                        {patientBirthDay?.day}
                                    </div>
                                </div>
                            ) : (
                                <div className="data-slice">
                                    <div className="data-name">
                                        Date de naissance
                                    </div>
                                    <div className="data-text">"-"</div>
                                </div>
                            )}

                            <div className="data-slice">
                                <div className="data-name">Adresse</div>
                                <div className="data-text">
                                    {patient.data?.address || "-"}
                                </div>
                            </div>

                            <div className="data-slice">
                                <div className="data-name">Profession</div>
                                <div className="data-text">
                                    {patient.data?.profession || "-"}
                                </div>
                            </div>

                            {patient.data?.gender ? (
                                <div className="data-slice">
                                    <div className="data-name">Sexe</div>
                                    <div className="data-text">
                                        <div
                                            style={{
                                                color: "white",
                                                padding: "2px 4px",
                                                borderRadius: "var(--main-rd)",
                                                backgroundColor:
                                                    patients.sexeOptions.find(
                                                        (option: any) =>
                                                            option.value?.toLowerCase() ===
                                                            patient.data?.gender?.toLowerCase(),
                                                    )?.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {patients.sexeOptions.find(
                                                (option: any) =>
                                                    option.value?.toLowerCase() ===
                                                    patient.data?.gender?.toLowerCase(),
                                            )?.label || "opps!!"}
                                            <SVGIcon
                                                type={
                                                    patients.sexeOptions.find(
                                                        (option: any) =>
                                                            option.value?.toLowerCase() ===
                                                            patient.data?.gender?.toLowerCase(),
                                                    )?.iconType
                                                }
                                                color="white"
                                                height={25}
                                                width={25}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="data-slice">
                                    <div className="data-name">Sexe</div>
                                    <div className="data-text">"-"</div>
                                </div>
                            )}

                            <div className="data-slice">
                                <div className="data-name">Statut générale</div>
                                <div className="data-text">
                                    {patient.data?.generalState || "-"}
                                </div>
                            </div>

                            <div
                                className="actions"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                    position: "sticky",
                                    bottom: "0",
                                }}
                            >
                                <div
                                    className="edit-btn"
                                    onClick={() => {
                                        setToEdit(patient.data);
                                        setOpenCard(true);
                                    }}
                                >
                                    <SVGIcon
                                        type="edit"
                                        color="inherit"
                                        width={25}
                                        height={25}
                                    />
                                    Modifier
                                </div>
                                <div
                                    className="delete-btn"
                                    onClick={() => {
                                        setShowDeleteCard(true);
                                    }}
                                >
                                    <SVGIcon
                                        type="trash"
                                        color="inherit"
                                        width={25}
                                        height={25}
                                    />
                                    Supprimer
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className='demography main-box'>
                        <div className='title'>Démographie</div>
                        <div className=''>
                            <div>Numéro de téléphone</div>
                            <div>+216 {patient.data?.phoneNumber}</div>
                        </div>
                        <div className=''>
                            <div>Date de naissance </div>
                            <div>
                                {patientBirthDay.day} ({patientBirthDay.age}{" "}
                                ans)
                            </div>
                        </div>
                        <div className=''>
                            <div>Sexe</div>
                            <div>{patient.data?.gender}</div>
                        </div>
                        <div className='state'>
                            <div>État Géneral </div>
                            <div>
                                {patient.data?.generalState}
                               
                            </div>
                        </div>
                        <div className=''>
                            <div>Email</div>
                            <div>{patient.data?.email}</div>
                        </div>
                        <div className=''>
                            <div>Addresse</div>
                            <div>{patient.data?.address}</div>
                        </div>
                        <div className=''>
                            <div>Profession</div>
                            <div>{patient.data?.profession}</div>
                        </div> 
                    </div>*/}
                    <div className="profile-data">
                        {/* <div className='tabs main-box'>
                        <NavLink to={`/patients/${id}/appointments`}>
                            Rendez-vous
                        </NavLink>
                        <NavLink to={`/patients/${id}/prescriptions`}>
                            Ordonnances
                        </NavLink>
                        <NavLink to={`/patients/${id}/documents`}>
                            Documents
                        </NavLink>
                        <NavLink to={`/patients/${id}/chart`}>Chart</NavLink>
                    </div> */}
                        <div className="tabs main-box">
                            {[
                                "Rendez-vous",
                                // "Ordonnances",
                                "Chart",

                                "Documents",
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    className={
                                        index === selectedTab ? "active" : ""
                                    }
                                    onClick={() => setSelectedTab(index)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                        <div className="content-data main-box">
                            {selectedTab === 0 ? (
                                <PatientAppointmentsList
                                // openCard={handleOpenCard}
                                // closeCard={handleCloseCard}
                                // setToEdit={setToEdit}
                                />
                            ) : // ) : selectedTab === -1 ? (
                            //     <Prescriptions />
                            selectedTab === 1 ? (
                                <Chart
                                    teethImages={teethImages}
                                    patientID={id}
                                    isPatient={true}
                                />
                            ) : (
                                <Documents />
                            )}
                        </div>
                        {/* <div className='content-data main-box'>{children}</div> */}
                    </div>
                </div>
            )}
        </div>
    );
}
