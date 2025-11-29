/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
// import Diagnostic from "../../components/Diagnostic";
import AddAppointmentCard from "../../components/AddAppointmentCard";
import DeleteCard from "../../components/DeleteCard";
import SVGIcon from "../../components/SVGIcon";
import Documents from "../../components/Documents";
import Chart from "../../components/Chart";
import Invoice from "../../components/Invoice";
import TextEditor from "../../components/TextEditor";
// import Invoice from "../../components/Invoice";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../constants/env";
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
export default function AppointmentPage() {
    const {
        appointments,
        appointment,
        handleGetAppointment,
        handleUpdateAppointment,
        handleDeleteAppointment,
    } = useAppointments();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        if (id) {
            handleGetAppointment(id);
        }
    }, [id]);

    const [toEditAppointment, setToEditAppointment] = React.useState<any>({});
    React.useEffect(() => {
        if (appointment) setToEditAppointment(appointment);
        else setToEditAppointment({});
    }, [appointment]);
    const onUpdateAppointment = (newData: any) => {
        handleUpdateAppointment(newData, toEditAppointment.appointmentID);
    };
    const [toEdit, setToEdit] = React.useState<any>(null);

    const [showAddCard, setShowAddCard] = React.useState<boolean>(false);
    const handleCloseCard = () => {
        setShowAddCard(false);
        setToEdit(null);
    };
    const handleOpenCard = () => {
        setShowAddCard(true);
    };

    const [selectedTab, setSelectedTab] = React.useState(0);
    const [frenchDateString, setFrenchDateString] = React.useState("");
    const [frenchTimeString, setFrenchTimeString] = React.useState("");

    React.useEffect(() => {
        if (appointment !== null) {
            const appointmentDateTime = appointment?.appointmentDateTime;
            const dateObject = new Date(appointmentDateTime);

            // Format date string (DD Mon YYYY)
            setFrenchDateString(
                dateObject.toLocaleDateString("fr-FR", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
            );

            // Format time string (HH:MM)
            setFrenchTimeString(
                dateObject.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            );
        }
    }, [appointment]);
    const [showDeleteCard, setShowDeleteCard] = React.useState(false);
    const handleOnDeleteAppointment = async () => {
        const ok = await handleDeleteAppointment(id || "");
        if (ok) {
            setShowDeleteCard(false);
            navigate(-1);
        }
    };
    return (
        <div className="appointment-page-container">
            <AddAppointmentCard
                existing={true}
                display={showAddCard}
                onClose={handleCloseCard}
                toEdit={toEdit}
            />
            <DeleteCard
                display={showDeleteCard}
                onClose={() => setShowDeleteCard(false)}
                onDelete={handleOnDeleteAppointment}
                name="ce rendez-vous"
                additionalText="Attention !! En supprimant ce rendez-vous, tous les documents et opérations dentaires associés seront également supprimés."
                alert={true}
            />
            <div className="page-title">Rendez-vous</div>
            <div
                className="content"
                style={{
                    height: "calc(100% - 20px)",
                    width: "100%",
                }}
            >
                <div
                    className="main-box app-info"
                    style={{
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <div className="data-slice">
                        <div className="data-name">Patient</div>
                        <div
                            className="data-text patient-link"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "3px",
                            }}
                            onClick={() => {
                                navigate(
                                    ROUTER.PATIENT_PROFILE(
                                        appointment?.patient?.patientID,
                                    ),
                                );
                            }}
                        >
                            {appointment?.patient?.firstName}{" "}
                            {appointment?.patient?.lastName}{" "}
                            <SVGIcon
                                type="link"
                                color="var(--color-1)"
                                height={15}
                                width={15}
                                style={{
                                    fill: "inherit",
                                }}
                            />
                        </div>
                    </div>
                    <div className="data-slice">
                        <div className="data-name">Date</div>
                        <div className="data-text">{frenchDateString}</div>
                    </div>
                    <div className="data-slice">
                        <div className="data-name">Temps</div>
                        <div className="data-text">{frenchTimeString}</div>
                    </div>
                    <div className="data-slice">
                        <div className="data-name">Durée</div>
                        <div className="data-text">
                            {appointment?.appointmentDuration} minutes
                        </div>
                    </div>
                    <div className="data-slice">
                        <div className="data-name">Statut</div>
                        <div
                            className="data-text"
                            style={{
                                backgroundColor:
                                    appointments.statusOptions.find(
                                        (option: any) =>
                                            option.value ===
                                            appointment?.status,
                                    )?.color || "var(--color-2)",
                                color: "white",
                                padding: "var(--pd-0)",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            {appointments.statusOptions.find(
                                (option: any) =>
                                    option.value === appointment?.status,
                            )?.label || appointment?.status}
                        </div>
                    </div>
                    <div className="data-slice">
                        <div className="data-name">Note</div>
                        <div className="data-text">
                            {appointment?.note ?? "-"}
                        </div>
                    </div>
                    <div
                        className="edit-btn"
                        onClick={() => {
                            setToEdit(appointment);
                            handleOpenCard();
                        }}
                    >
                        <SVGIcon
                            type="edit"
                            color="inherit"
                            width={25}
                            height={25}
                        />
                        Modifier
                    </div>{" "}
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
                <div
                    className="app-data"
                    style={{
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <div className="tabs main-box">
                        {[
                            "Chart",
                            "Documents",
                            "Diagnostique",
                            "Ordonnance",
                            "Facturation",
                        ].map((item, index) => (
                            <a
                                key={index}
                                className={
                                    index === selectedTab ? "active" : ""
                                }
                                onClick={() => setSelectedTab(index)}
                                style={{
                                    position: "relative",
                                }}
                            >
                                {item}
                                {item === "Facturation" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            color: "black",
                                            fontWeight: "bold",
                                            fontSize: "x-small",
                                            backgroundColor: "#f37316",
                                            padding: "2px",
                                            borderRadius: "3px",
                                            top: "-5px",
                                            right: "-5px",
                                        }}
                                    >
                                        beta
                                    </div>
                                )}
                            </a>
                        ))}
                    </div>
                    <div
                        className="content-data main-box"
                        style={{
                            height: "calc(100% - 0px)",
                            overflow: "auto",
                            // height: "100%",
                        }}
                    >
                        {selectedTab === 0 ? (
                            <Chart
                                teethImages={teethImages}
                                patientID={appointment?.patientID}
                                appointmentID={appointment?.appointmentID}
                                goToFacture={() => setSelectedTab(4)}
                            />
                        ) : selectedTab === 1 ? (
                            <Documents
                                patientID={appointment?.patientID}
                                appointmentID={appointment?.appointmentID}
                            />
                        ) : selectedTab === 2 ? (
                            <TextEditor
                                placeHolder={"."}
                                onBlur={(diagnostic: string) =>
                                    onUpdateAppointment({
                                        ...toEditAppointment,
                                        diagnostique: diagnostic,
                                    })
                                }
                                data={toEditAppointment?.diagnostique || ""}
                            />
                        ) : selectedTab === 3 ? (
                            <TextEditor
                                placeHolder={"."}
                                onBlur={(prescription: string) =>
                                    onUpdateAppointment({
                                        ...toEditAppointment,
                                        ordonnance: prescription,
                                    })
                                }
                                data={toEditAppointment?.ordonnance || ""}
                            />
                        ) : (
                            <Invoice
                                patientID={appointment?.patientID}
                                appointmentID={appointment?.appointmentID}
                                toEditAppointment={toEditAppointment}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
