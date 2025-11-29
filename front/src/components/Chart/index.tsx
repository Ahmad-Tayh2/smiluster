/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import Table from "../Table";
import ChartCard from "../../components/ChartCard";
import { useChart } from "../../hooks/useChart";
import SVGIcon from "../SVGIcon";
import { ROUTER } from "../../constants/env";
import { useNavigate } from "react-router-dom";
import DeleteCard from "../../components/DeleteCard";
import EditToothActCard from "./EditToothActCard";

export default function Chart(props: any) {
    const { teethImages, patientID, appointmentID, isPatient, goToFacture } =
        props;
    const [openChartCard, setOpenChartCard] = React.useState(false);
    const [selectedTooth, setSelectedTooth] = React.useState<any>(null);
    const {
        teeth,
        toothActsByApp,
        toothActs,
        handleGetTeeth,
        handleGetToothActsByApp,
        handleDeleteToothAct,
        handleGetToothActs,
    } = useChart();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (patientID) {
            if (isPatient) handleGetToothActs(patientID);
            handleGetTeeth(patientID);
        }
    }, [patientID]);
    React.useEffect(() => {
        if (appointmentID && !isPatient) {
            handleGetToothActsByApp(appointmentID);
        }
    }, [appointmentID]);

    React.useEffect(() => {
        if (teeth?.length > 0) {
            setUpperTeeth((prev: any) => {
                const upperTeeth = [...prev];
                for (let i = 0; i < upperTeeth.length; i++) {
                    for (let j = 0; j < teeth.length; j++) {
                        if (
                            String(upperTeeth[i].toothNumber) ===
                            teeth[j].toothNumber
                        ) {
                            upperTeeth[i].toothID = teeth[j].toothID;
                            break;
                        }
                        upperTeeth[i].toothID = null;
                    }
                }
                return upperTeeth;
            });
            setLowerTeeth((prev: any) => {
                const lowerTeeth = [...prev];
                for (let i = 0; i < lowerTeeth.length; i++) {
                    for (let j = 0; j < teeth.length; j++) {
                        if (
                            String(lowerTeeth[i].toothNumber) ===
                            teeth[j].toothNumber
                        ) {
                            lowerTeeth[i].toothID = teeth[j].toothID;
                            break;
                        }
                        lowerTeeth[i].toothID = null;
                    }
                }
                return lowerTeeth;
            });
        }
    }, [teeth]);
    const assignIdToTooth = (toothID: any, toothNumber: any) => {
        let found = false;
        let teeth = [...upperTeeth];
        for (let i = 0; i < teeth.length; i++) {
            if (teeth[i].toothNumber === toothNumber) {
                found = true;
                teeth[i] = { ...teeth[i], toothID };
                break;
            }
        }
        setUpperTeeth(teeth);
        if (!found) {
            teeth = [...lowerTeeth];
            for (let i = 0; i < teeth.length; i++) {
                if (teeth[i].toothNumber === toothNumber) {
                    found = true;
                    teeth[i] = { ...teeth[i], toothID };
                    break;
                }
            }
            setLowerTeeth(teeth);
        }
    };
    const [upperTeeth, setUpperTeeth] = React.useState([
        { img: teethImages.tooth18, toothNumber: 18, toothID: null },
        { img: teethImages.tooth17, toothNumber: 17, toothID: null },
        { img: teethImages.tooth16, toothNumber: 16, toothID: null },
        { img: teethImages.tooth15, toothNumber: 15, toothID: null },
        { img: teethImages.tooth14, toothNumber: 14, toothID: null },
        { img: teethImages.tooth13, toothNumber: 13, toothID: null },
        { img: teethImages.tooth12, toothNumber: 12, toothID: null },
        { img: teethImages.tooth11, toothNumber: 11, toothID: null },
        { img: teethImages.tooth21, toothNumber: 21, toothID: null },
        { img: teethImages.tooth22, toothNumber: 22, toothID: null },
        { img: teethImages.tooth23, toothNumber: 23, toothID: null },
        { img: teethImages.tooth24, toothNumber: 24, toothID: null },
        { img: teethImages.tooth25, toothNumber: 25, toothID: null },
        { img: teethImages.tooth26, toothNumber: 26, toothID: null },
        { img: teethImages.tooth27, toothNumber: 27, toothID: null },
        { img: teethImages.tooth28, toothNumber: 28, toothID: null },
    ]);
    const [lowerTeeth, setLowerTeeth] = React.useState([
        { img: teethImages.tooth48, toothNumber: 48, toothID: null },
        { img: teethImages.tooth47, toothNumber: 47, toothID: null },
        { img: teethImages.tooth46, toothNumber: 46, toothID: null },
        { img: teethImages.tooth45, toothNumber: 45, toothID: null },
        { img: teethImages.tooth44, toothNumber: 44, toothID: null },
        { img: teethImages.tooth43, toothNumber: 43, toothID: null },
        { img: teethImages.tooth42, toothNumber: 42, toothID: null },
        { img: teethImages.tooth41, toothNumber: 41, toothID: null },
        { img: teethImages.tooth31, toothNumber: 31, toothID: null },
        { img: teethImages.tooth32, toothNumber: 32, toothID: null },
        { img: teethImages.tooth33, toothNumber: 33, toothID: null },
        { img: teethImages.tooth34, toothNumber: 34, toothID: null },
        { img: teethImages.tooth35, toothNumber: 35, toothID: null },
        { img: teethImages.tooth36, toothNumber: 36, toothID: null },
        { img: teethImages.tooth37, toothNumber: 37, toothID: null },
        { img: teethImages.tooth38, toothNumber: 38, toothID: null },
    ]);
    const tableDataStructure = {
        header: {
            dataHead: [
                {
                    value: <div>Acte effectué</div>,
                    style: {
                        width: "50%",
                    },
                },
                {
                    value: (
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Prix
                        </div>
                    ),
                    style: {
                        width: "25%",
                    },
                },
                {
                    value: (
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Dent
                        </div>
                    ),
                    style: {
                        width: "25%",
                    },
                },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            ...toothActsByApp.data.map((row: any) => {
                return {
                    dataRow: [
                        {
                            value: <div>{row.Act.title}</div>,
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {row.customCost}
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "small",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {row.Tooth.toothNumber}
                                </div>
                            ),
                        },
                    ],
                    id: row.toothActID,
                    style: {},
                    onClickRow: () => {},
                };
            }),
        ],
    };
    const tableDataStructurePatient = {
        header: {
            dataHead: [
                {
                    value: <div>RDV</div>,
                    style: {
                        width: "20%",
                    },
                },
                {
                    value: (
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Act
                        </div>
                    ),
                    style: {
                        width: "40%",
                    },
                },
                {
                    value: (
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Prix
                        </div>
                    ),
                    style: {
                        width: "20%",
                    },
                },
                {
                    value: (
                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Dent
                        </div>
                    ),
                    style: {
                        width: "20%",
                    },
                },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            ...toothActs.data.map((row: any) => {
                let formattedTime: any = undefined;
                let date: any = undefined;
                if (row.Appointment) {
                    const dateTime = new Date(
                        row.Appointment?.appointmentDateTime,
                    );
                    const day = dateTime.getDate().toString().padStart(2, "0");
                    const month = (dateTime.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                    const year = dateTime.getFullYear();
                    date = `${day}/${month}/${year}`;
                    const hours = dateTime
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    const minutes = dateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                    formattedTime = `${hours}:${minutes}`;
                }

                return {
                    dataRow: [
                        {
                            value: formattedTime ? (
                                <div
                                    onClick={() =>
                                        navigate(
                                            ROUTER.APPOINTMENT_PAGE(
                                                row.Appointment.appointmentID,
                                            ),
                                        )
                                    }
                                >
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
                            ) : (
                                "-"
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {row.Act.title}
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {row.Act.cost}
                                </div>
                            ),
                        },
                        {
                            value: (
                                <div
                                    style={{
                                        textAlign: "center",
                                        fontSize: "small",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {row.Tooth.toothNumber}
                                </div>
                            ),
                        },
                    ],
                    id: row.toothActID,
                    style: {},
                    onClickRow: () => {},
                };
            }),
        ],
    };
    const [openDeleteToothAct, setOpenDeleteToothAct] = React.useState(false);
    const [toDeleteToothActID, setToDeleteToothAct] = React.useState(null);
    const [openEditToothAct, setOpenEditToothAct] = React.useState(false);
    const [toEditToothAct, setToEditToothAct] = React.useState(null);

    const onDeleteToothAct = async () => {
        let ok: any = await handleDeleteToothAct(toDeleteToothActID);
        if (ok) {
            setOpenDeleteToothAct(false);
            await handleGetToothActsByApp(appointmentID);
        }
    };
    const onUpdateToothAct = async () => {
        // let ok: any = await handleDeleteToothAct(toDeleteToothActID);
        // if (ok) {
        //     setOpenDeleteToothAct(false);
        //     await handleGetToothActsByApp(appointmentID);
        // }
        console.log(" up date totthe actss =", toEditToothAct);
    };
    const editToothAct = (toothActData: any) => {
        setToEditToothAct(toothActData);
        setOpenEditToothAct(true);
    };
    const deleteToothAct = (id: any) => {
        setToDeleteToothAct(id);
        setOpenDeleteToothAct(true);
    };
    const tableOptions = [
        // {
        //     label: "Modifier",
        //     icon: (
        //         <SVGIcon
        //             type="edit"
        //             color="var(--color-1)"
        //             width={20}
        //             height={20}
        //         />
        //     ),
        //     onClick: editToothAct,
        // },
        {
            label: "Supprimer",
            icon: (
                <SVGIcon
                    type="trash"
                    color="var(--color-1)"
                    width={20}
                    height={20}
                />
            ),
            onClick: deleteToothAct,
        },
    ];
    return (
        <div className="chart-container">
            <ChartCard
                display={openChartCard}
                onClose={() => {
                    setOpenChartCard(false);
                    setSelectedTooth(null);
                }}
                selectedTooth={selectedTooth}
                assignIdToTooth={assignIdToTooth}
                patientID={patientID}
                appointmentID={appointmentID}
            />
            <DeleteCard
                display={openDeleteToothAct}
                onClose={() => {
                    setOpenDeleteToothAct(false);
                    setToDeleteToothAct(null);
                }}
                onDelete={onDeleteToothAct}
                name={"acte Dent"}
                alert={false}
            />
            <EditToothActCard
                display={openEditToothAct}
                onUpdate={onUpdateToothAct}
                onClose={() => {
                    setOpenEditToothAct(false);
                    setToEditToothAct(null);
                }}
                data={toEditToothAct}
            />
            <div className="teeth-container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {upperTeeth.map((tooth: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="tooth-wrapper"
                                onClick={() => {
                                    setSelectedTooth(tooth);
                                    setOpenChartCard(true);
                                }}
                                style={{
                                    backgroundColor:
                                        selectedTooth?.toothNumber ===
                                        tooth.toothNumber
                                            ? "var(--color-5)"
                                            : "",
                                }}
                            >
                                <img src={tooth.img} alt="tooth" />
                                <div className="tooth-number">
                                    {tooth.toothNumber}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className="lower-teeth"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {lowerTeeth.map((tooth: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="tooth-wrapper"
                                onClick={() => {
                                    setSelectedTooth(tooth);
                                    setOpenChartCard(true);
                                }}
                                style={{
                                    backgroundColor:
                                        selectedTooth?.toothNumber ===
                                        tooth.toothNumber
                                            ? "var(--color-5)"
                                            : "",
                                }}
                            >
                                <div className="tooth-number">
                                    {tooth.toothNumber}
                                </div>
                                <img src={tooth.img} alt="tooth" />

                                {/* <img src="https://photos.app.goo.gl/SetrmE8bQYoAkJfC6" alt='tooth' /> */}
                                {/* <img src="http://drive.google.com/uc?id=1BrpaMT-elVUr-85Evcfw9CHbV-9FNCg8" alt='tooth' /> */}
                                {/* https://drive.google.com/file/d/1BrpaMT-elVUr-85Evcfw9CHbV-9FNCg8/view?usp=sharing */}
                            </div>
                        );
                    })}
                </div>
            </div>
            {!isPatient && (
                <button className="checkout-btn center" onClick={goToFacture}>
                    Accéder à la facture
                    <SVGIcon
                        type="right"
                        height={25}
                        width={25}
                        color="inherit"
                    />
                </button>
            )}
            <div
                style={{
                    position: "relative",
                    minHeight: "130px",
                    width: "100%",
                    borderRadius: "var(--main-rd)",
                    // backgroundColor: "red",
                }}
            >
                {/*<h2
                    style={{
                        fontSize: "large",
                        color: "var(--color-1)",
                        fontWeight: "bold",
                        lineHeight: "2.5",
                        textAlign: "center",
                    }}
                >
                    Liste des actes
                </h2>*/}
                <Table
                    pagination={false}
                    tableDataStructure={
                        isPatient
                            ? tableDataStructurePatient
                            : tableDataStructure
                    }
                    tableOptions={isPatient ? [] : tableOptions}
                    loading={toothActsByApp.loading}
                    noDataMessage="Aucun acte effectué"
                    noDataSize={70}
                />
            </div>
        </div>
    );
}
