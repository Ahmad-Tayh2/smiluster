/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useAppointments } from "../../hooks/useAppointments";
import { useChart } from "../../hooks/useChart";

import "./style.css";
import SVGIcon from "../SVGIcon";
export default function ChartCard(props: any) {
    const {
        display,
        onClose,
        selectedTooth,
        patientID,
        appointmentID,
        assignIdToTooth,
    } = props;
    const { patientAppointments } = useAppointments();
    const {
        acts,
        toothActs,
        handleGetToothActs,
        handleGetActs,
        handleAddToothAct,
        handleAddAct,
        error,
        resetError,
        handleGetToothActsByApp,
    } = useChart();

    const [newInput, setNewInput] = React.useState(false);
    const [newToothAct, setNewToothAct] = React.useState({
        toothID: selectedTooth?.toothID || null,
        actList: [],
        newAct: null,
        appointmentID: null,
    });
    const handleClose = () => {
        onClose && onClose();
        setNewToothAct({
            toothID: selectedTooth?.toothID || null,
            actList: [],
            newAct: null,
            appointmentID: null,
        });
        setNewInput(false);
        resetError();
    };
    React.useEffect(() => {
        setNewToothAct((prev: any) => ({ ...prev, appointmentID }));
    }, [appointmentID]);
    React.useEffect(() => {
        if (display) {
            handleGetActs();
            handleGetToothActs(patientID);
        }
    }, [display]);
    React.useEffect(() => {
        if (selectedTooth) {
            setNewToothAct((prev: any) => ({
                ...prev,
                toothID: selectedTooth.toothID,
            }));
        }
    }, [selectedTooth]);
    const addToothActs = async () => {
        let data: any = {
            ...newToothAct,
        };

        let ok: any = true;
        const newActs: any = [];
        // console.log(" data = ", data);
        if (data.newAct !== null) {
            ok = await handleAddAct(data.newAct);
            if (ok) {
                newActs.push(ok.actID);
            }
        }

        data = {
            toothID: data.toothID,
            appointmentID: appointmentID || null,
            actList: [...data.actList, ...newActs],
        };
        if (data.toothID === null) {
            data.newTooth = {
                patientID,
                toothNumber: selectedTooth.toothNumber,
                adult: true,
            };
        }
        if (ok) {
            const createdToothAct = await handleAddToothAct(data);
            if (createdToothAct) {
                assignIdToTooth(
                    createdToothAct[0]?.toothID,
                    selectedTooth.toothNumber,
                );
                if (appointmentID) {
                    handleGetToothActsByApp(appointmentID);
                } else if (patientID) {
                    handleGetToothActs(patientID);
                }
                handleClose();
            }
        }
    };
    const [toothActList, setToothActList] = React.useState<any>([]);
    React.useEffect(() => {
        let newList = [
            ...toothActs.data?.filter(
                (item: any) => item.toothID === selectedTooth?.toothID,
            ),
        ];
        if (appointmentID) {
            newList = newList?.filter(
                (item: any) => item.appointmentID === appointmentID,
            );
        }
        setToothActList(newList);
    }, [toothActs.data, selectedTooth]);
    const buttons: any = [
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
            text: "Valider",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: addToothActs,
        },
    ];
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={
                    <div>
                        Dent{" "}
                        <span
                            style={{
                                backgroundColor: "var(--color-5)",
                                color: "var(--color-1)",
                                padding: "var(--pd-0)",
                                marginLeft: "5px",
                                fontSize: "large",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            {selectedTooth && selectedTooth.toothNumber}
                        </span>
                    </div>
                }
                style={{
                    width: "450px",
                }}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={buttons}
            >
                <div className="chart-popup">
                    {toothActList.length > 0 && (
                        <ToothActsList list={toothActList} />
                    )}
                    <ToothActInputs
                        setNewInput={setNewInput}
                        setNewToothAct={setNewToothAct}
                        newToothAct={newToothAct}
                        appointmentsList={patientAppointments.data}
                        actsList={acts}
                        appointmentID={appointmentID}
                        resetError={resetError}
                    />
                    {error && <div className="form-error">{error}</div>}
                </div>
            </PopupCard>
        </Modal>
    );
}
function AppointmentLabel(props: any) {
    const { item } = props;
    const dateTime = new Date(item.appointmentDateTime);
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear();
    const date = `${day}/${month}/${year}`;
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    const statusOptions = [
        // { value: undefined, label: "Tout les status", color: "var(--color-1)" },
        { value: "scheduled", label: "Planifié", color: "#2C86EF" },
        { value: "pending", label: "En attente", color: "#F18E19" },
        { value: "completed", label: "Terminé", color: "#1BD788" },
        { value: "canceled", label: "Annulé", color: "#E20202" },
    ];
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 20,
            }}
        >
            <div
                style={{
                    backgroundColor:
                        statusOptions?.find(
                            (op: any) =>
                                op.value?.toLowerCase() ===
                                item.status?.toLowerCase(),
                        )?.color || "black",
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                }}
            >
                {/* {
                    statusOptions?.find(
                        (op: any) =>
                            op.value?.toLowerCase() ===
                            item.status?.toLowerCase()
                    )?.label
                } */}
            </div>
            <div>
                <div
                    style={{
                        fontSize: "14px",
                        color: "gray",
                        marginBottom: "2px",
                    }}
                >
                    {date}
                </div>
                <div
                    style={{
                        opacity: "0.7",
                        fontSize: "small",
                        color: "gray",
                    }}
                >
                    {formattedTime}
                </div>
            </div>
        </div>
    );
}
function ToothActInputs(props: any) {
    const {
        setNewInput,
        appointmentsList,
        actsList,
        setNewToothAct,
        newToothAct,
        appointmentID,
        resetError,
    } = props;
    const { appointment } = useAppointments();
    const appsOptions: any = [
        ...appointmentsList?.map((item: any) => ({
            label: <AppointmentLabel item={item} />,
            value: item.appointmentID,
        })),
    ];
    const actsOptions: any = [
        ...actsList.map((item: any) => ({
            label: (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div>{item.title}</div>
                    <div>{item.cost} DT</div>
                </div>
            ),
            value: item.actID,
        })),
    ];

    const colorStyles = {
        control: (styles: any) => ({
            ...styles,
            height: "40px",
            border: "1px solid var(--color-2)",
        }),
        placeholder: (base: any) => ({
            ...base,
            fontSize: "16px",
        }),
        // option: (
        //     styles: any,
        //     { data, isDisabled, isFocused, isSelected }: any
        // ) => {
        //     return {
        //         ...styles,
        //         color: isSelected ? "white" : data.color,
        //         backgroundColor: isSelected ? data.color : "",
        //         fontWeight: "400",
        //         ":hover": {
        //             backgroundColor: data.color,
        //             color: "white",
        //             cursor: "pointer",
        //         },
        //     };
        // },
    };
    const [oldAct, setOldAct] = React.useState(true);
    return (
        <div
            className="tooth-act-input"
            style={{
                padding: "var(--pd-1)",
                borderRadius: "var(--main-rd)",
                border: "2px solid var(--color-3)",
                backgroundColor: "#fafafa",
            }}
        >
            <h1
                style={{
                    color: "var(--color-1)",
                }}
            >
                Ajout d'un acte
            </h1>
            <div
                className="add-appointment-tabs"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                }}
            >
                <div
                    className={`tab ${oldAct ? "active-form" : ""}`}
                    onClick={() => {
                        setOldAct(true);
                        setNewToothAct((prev: any) => ({
                            ...prev,
                            actList: [],
                            newAct: null,
                        }));
                        resetError();
                    }}
                >
                    Choisir l'acte
                </div>
                <div
                    className={`tab ${!oldAct ? "active-form" : ""}`}
                    onClick={() => {
                        setOldAct(false);
                        setNewToothAct((prev: any) => ({
                            ...prev,
                            actList: [],
                            newAct: {
                                title: "",
                                cost: "",
                            },
                        }));
                        resetError();
                    }}
                >
                    Nouveau acte
                </div>
            </div>
            {oldAct ? (
                <div
                    style={{
                        display: "flex",
                        gap: "var(--main-gap)",
                        marginBottom: "5px",
                    }}
                >
                    <div className="act-select input">
                        <label htmlFor="">
                            Acte
                            <Star />
                        </label>
                        <Select
                            options={actsOptions}
                            styles={colorStyles}
                            // isMulti
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: "var(--color-1)",
                                },
                            })}
                            placeholder="Selectionner..."
                            noOptionsMessage={() => "Aucune option"}
                            onChange={(item: any) => {
                                setNewToothAct((prev: any) => {
                                    let updatedToothAct = {
                                        ...prev,
                                        actList: [],
                                    };

                                    updatedToothAct.actList.push(item.value);
                                    return updatedToothAct;
                                });
                            }}
                        />
                    </div>
                    {/* <div className="input">
                        <label htmlFor="">
                            Coût personnalisé (DT) (facultatif)
                        </label>
                        <input
                            type="number"
                            name="cost"
                            value={newToothAct.newAct?.cost || ""}
                            onChange={(e: any) => {
                                setNewToothAct((prev: any) => {
                                    let updatedToothAct = {
                                        ...prev,
                                    };
                                    updatedToothAct.newAct.cost =
                                        e.target.value;
                                    return updatedToothAct;
                                });
                            }}
                        />
                    </div> */}
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        gap: "var(--main-gap)",
                        marginBottom: "5px",
                    }}
                >
                    <div className="input">
                        <label htmlFor="">
                            Nom acte
                            <Star />
                        </label>
                        <input
                            type="text"
                            name="actName"
                            value={newToothAct.newAct?.title || ""}
                            onChange={(e: any) => {
                                setNewToothAct((prev: any) => {
                                    let updatedToothAct = {
                                        ...prev,
                                    };
                                    updatedToothAct.newAct.title =
                                        e.target.value;
                                    return updatedToothAct;
                                });
                            }}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="">
                            Coût (DT)
                            <Star />
                        </label>
                        <input
                            type="number"
                            name="cost"
                            value={newToothAct.newAct?.cost || ""}
                            onChange={(e: any) => {
                                setNewToothAct((prev: any) => {
                                    let updatedToothAct = {
                                        ...prev,
                                    };
                                    updatedToothAct.newAct.cost =
                                        e.target.value;
                                    return updatedToothAct;
                                });
                            }}
                        />
                    </div>
                </div>
            )}
            {appointmentID ? (
                <div className="rdv input">
                    <label htmlFor="">Rendez-vous</label>
                    <div
                        style={{
                            backgroundColor: "#eee",
                            borderRadius: "var(--main-rd)",
                            padding: "var(--pd-0)",
                        }}
                    >
                        <AppointmentLabel item={appointment} />
                    </div>
                    {/* <Select
                        menuIsOpen={false}
                        // options={[
                        //     {
                        //         label: <AppointmentLabel item={appointment} />,
                        //         value: appointmentID,
                        //     },
                        // ]}
                        // styles={colorStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "var(--color-1)",
                            },
                        })}
                        value={{
                            label: <AppointmentLabel item={appointment} />,
                            value: appointmentID,
                        }}
                        isDisabled={true}
                        isSearchable={false}
                    /> */}
                    {/* <label htmlFor=''></label>
                    <div
                        className='center'
                        style={{
                            backgroundColor: "var(--color-3)",
                            height: "40px",
                            borderRadius: "var(--main-rd)",
                        }}
                    >
                        <AppointmentLabel item={appointment} />
                    </div> */}
                </div>
            ) : (
                <div className="rdv input">
                    <label htmlFor="">Rendez-vous (facultatif)</label>
                    <Select
                        options={appsOptions}
                        styles={colorStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: "var(--color-1)",
                            },
                        })}
                        placeholder="Selectionner..."
                        noOptionsMessage={() => "Aucune option"}
                        onChange={(value: any) => {
                            setNewToothAct((prev: any) => {
                                let updatedToothAct = { ...prev };
                                updatedToothAct.appointmentID = value.value;
                                return updatedToothAct;
                            });
                            // handleChangeAppointmentsFilters({
                            //     name: "status",
                            //     value: item?.map((status) => status.value),
                            // })
                        }}
                    />
                </div>
            )}
            {/* <button
                style={{
                    height: "40px",
                    alignSelf: "flex-end",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "var(--danger-color-1)",
                    borderRadius: "var(--main-rd)",
                    border: "1px solid var(--danger-color)",
                }}
                onClick={() => setNewInput(false)}
            >
                <SVGIcon type='trash' color='var(--danger-color)' />
            </button> */}
        </div>
    );
}
function ToothActsList(props: any) {
    const { list } = props;
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--s-gap)",
            }}
        >
            <h1
                style={{
                    color: "var(--color-1)",
                }}
            >
                Liste des actes effectué
            </h1>
            <div
                style={{
                    backgroundColor: "var(--color-3)",
                    borderRadius: "var(--main-rd)",
                    padding: "var(--pd-0)",
                    height: "auto",
                    maxHeight: "250px",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--s-gap)",
                }}
            >
                {list?.map((item: any, index: number) => {
                    const dateTime = new Date(
                        item.Appointment?.appointmentDateTime,
                    );
                    const day = dateTime.getDate().toString().padStart(2, "0");
                    const month = (dateTime.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                    const year = dateTime.getFullYear();
                    const date = `${day}/${month}/${year}`;
                    const hours = dateTime
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    const minutes = dateTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");
                    const formattedTime = `${hours}:${minutes}`;
                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "var(--main-gap)",
                                backgroundColor: "var(--color-2)",
                                color: "gray",
                                padding: "var(--pd-1)",
                                borderRadius: "var(--main-rd)",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "white",
                                    padding: "var(--pd-0)",
                                    borderRadius: "var(--main-rd)",
                                }}
                            >
                                {item.Act.title}
                            </div>
                            {item.Appointment?.appointmentDateTime ? (
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
                            ) : (
                                <div
                                    style={{
                                        // fontSize: "small",
                                        opacity: "0.5",
                                    }}
                                >
                                    Sans rendez-vous
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
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
