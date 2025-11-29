import React from "react";
import "./style.css";
import Select from "react-select";

import SVGIcon from "../../components/SVGIcon";
import BillDetails from "./BillDetails";
import CostAndPayment from "./CostAndPayment";
import { useInvoicing } from "../../hooks/useInvoicing";
import { useAppointments } from "../../hooks/useAppointments";
import { useChart } from "../../hooks/useChart";
import { InvoiceDetailsCard } from "../InvoiceCard";

export default function Invoice(props: any) {
    const { patientID, appointmentID, toEditAppointment } = props;
    const {
        setPatientsBillFilter,
        invoicing,
        getInvoiceByID,
        resetInvoicingFilters,
        getPatientInvoices,
        handleAddNewPayment,
        handleUpdatePayment,
    } = useInvoicing();
    const {
        handleGetToothActsByApp,
        handleUpdateToothAct,
        handleDeleteToothAct,
        toothActsByApp,
    } = useChart();
    const {
        handleGetAppointment,
        handleUpdateAppointment,
        appointment,
        appointments,
        facture,
        appServices,
        resetErrors,
        handleGetFactureOfAppointment,
        // handleGetServices,
        handleGetAppointmentServices,
        handleUpdateAppointmentService,
        handleDeleteAppointmentService,
    } = useAppointments();

    const billOptions: any = [
        ...invoicing.patientBills.list.map((bill: any) => ({
            label: bill.ref,
            value: bill.id,
        })),
    ];
    const [selectedOption, setSelectedOption] = React.useState<string>("new");
    const [selectedbill, setSelectedbill] = React.useState<any>(null);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
    const actsTotalCost = React.useMemo(() => {
        let total = 0;
        toothActsByApp.data?.map((item: any) => {
            total += item.Act.cost;
        });
        return total;
    }, [toothActsByApp]);
    const appServicesTotalCost = React.useMemo(() => {
        let total = 0;
        appServices?.map((item: any) => {
            total += item.services.cost;
        });
        return total;
    }, [appServices]);
    const payment = React.useMemo(() => {
        if (facture) {
            let payments =
                facture.payments?.filter(
                    (item: any) =>
                        item.appointmentID === appointment.appointmentID,
                ) || [];
            if (payments.length) {
                return payments[0];
            }
        }
        return null;
    }, [facture]);
    const [isManuelSum, setIsManuelSum] = React.useState(false);
    React.useEffect(() => {
        if (appointment.cost === -1) {
            setIsManuelSum(false);
        } else if (appointment.cost >= 0) {
            setIsManuelSum(true);
        }
    }, [appointment.cost]);
    const validateInvoicing = async () => {
        // let factureID =
        //     !toEditAppointment.factureID && selectedbill?.value
        //         ? selectedbill?.value
        //         : toEditAppointment.factureID;
        // console.log(" object update appointment = ", {
        //     // ...toEditAppointment,
        //     factureID,
        //     cost: billInfo.cost,
        //     factureAction,
        // });
        let factureID = appointment.factureID
            ? appointment.factureID
            : selectedOption === "new"
              ? null
              : selectedbill?.value;
        let factureAction =
            selectedOption === "new" && !appointment.factureID
                ? "create"
                : undefined;

        // console.log(
        //     " appp = ",
        //     {
        //         ...toEditAppointment,
        //         factureID,
        //         cost: isManuelSum ? billInfo.cost : -1,
        //     },
        //     appointmentID,
        //     factureAction,
        // );

        let ok: any = await handleUpdateAppointment(
            {
                ...toEditAppointment,
                factureID,
                cost: isManuelSum ? billInfo.cost : -1,
            },
            appointmentID,
            factureAction,
        );
        if (ok) {
            if (billInfo?.payed > 0) {
                if (payment === null) {
                    ok = await handleAddNewPayment({
                        factureID: ok?.data.factureID,
                        payed: billInfo.payed,
                        paymentDate: undefined,
                        appointmentID: appointmentID,
                    });
                } else if (billInfo?.payed !== payment?.paymentAmount) {
                    ok = await handleUpdatePayment(
                        { ...payment, paymentAmount: billInfo?.payed },
                        payment.paymentID,
                    );
                } else console.log(" do not touch the payment");
            }
            if (ok) {
                await handleGetAppointment(appointmentID);
                setIsEditing(false);
            }
        }
    };
    React.useEffect(() => {
        if (patientID) {
            getPatientInvoices(patientID);

            // setPatientsBillFilter({ patientID });
        }
    }, [patientID]);
    React.useEffect(() => {
        if (appointmentID) {
            handleGetToothActsByApp(appointmentID);
            handleGetAppointmentServices(appointmentID);
        }
    }, [appointmentID]);
    React.useEffect(() => {}, [invoicing.patientBills.filtersBy]);
    const [openFactDetails, setOpenFactDetails] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [billInfo, setBillInfo] = React.useState<any>({
        cost: null,
        payed: null,
    });
    const onBillChange = (e: any) => {
        const { name, value } = e.target;
        setBillInfo((prev: any) => ({ ...prev, [name]: value }));
    };
    const handleCancelValidation = () => {
        setIsEditing(false);
        resetErrors();
    };
    React.useEffect(() => {
        if (appointment.factureID) {
            handleGetFactureOfAppointment(appointment.factureID);
            setBillInfo((prev: any) => ({
                ...prev,
                cost: appointment.cost === -1 ? null : appointment.cost,
            }));
            getInvoiceByID(appointment.factureID);
        } else {
            setIsEditing(true);
        }
    }, [appointment]);
    React.useEffect(() => {
        setBillInfo((prev: any) => ({
            ...prev,
            payed: payment?.paymentAmount || 0,
        }));
    }, [payment]);

    return (
        <div
            className="invoice-appointment-container"
            style={{
                width: "100%",
            }}
        >
            {/* <div className="add-appointment-tabs">
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
                    </div> */}
            {!appointment.factureID && (
                <div
                    className="add-appointment-tabs"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "var(--gap-2)",
                        width: "100%",
                        marginBottom: "0",
                    }}
                >
                    <div
                        className={`tab ${selectedOption === "new" ? "active-form" : ""}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--main-gap)",
                            width: "calc(50% - 20px)",
                            fontSize: "14px",
                            color: "var(--gray-1)",
                        }}
                    >
                        <label
                            className="checkbox-label"
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "var(--s-gap)",
                            }}
                        >
                            <input
                                type="radio"
                                id=""
                                name="billOptions"
                                value="new"
                                checked={selectedOption === "new"}
                                onChange={handleOptionChange}
                            />
                            <div
                                style={{
                                    height: "18px",
                                    width: "18px",
                                    border: "1px solid var(--color-1)",
                                    borderRadius: "50%",
                                }}
                            >
                                <SVGIcon
                                    type="check"
                                    height={17}
                                    width={17}
                                    color="white"
                                />
                            </div>
                            Créer une nouvelle facture.
                        </label>
                    </div>
                    <div
                        className={`tab ${selectedOption !== "new" ? "active-form" : ""}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--main-gap)",
                            width: "calc(50% - 20px)",
                            fontSize: "14px",
                            color: "var(--gray-1)",
                        }}
                    >
                        <label
                            className="checkbox-label"
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "var(--s-gap)",
                            }}
                        >
                            <input
                                type="radio"
                                id=""
                                name="billOptions"
                                value="old"
                                checked={selectedOption === "old"}
                                onChange={handleOptionChange}
                            />
                            <div
                                style={{
                                    height: "18px",
                                    width: "18px",
                                    border: "1px solid var(--color-1)",
                                    borderRadius: "50%",
                                }}
                            >
                                <SVGIcon
                                    type="check"
                                    height={17}
                                    width={17}
                                    color="white"
                                />
                            </div>{" "}
                            Utiliser une ancienne facture.
                        </label>
                    </div>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "var(--gap-2)",
                }}
            >
                <div
                    className="invoice"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--main-gap)",
                        width: "100%",
                        backgroundColor: "var(--color-3)",
                        padding: "var(--pd-1)",
                        borderRadius: "var(--main-rd)",
                        position: "relative",
                    }}
                >
                    {!appointment.factureID ? (
                        <div
                            style={{
                                height: "60px",
                                padding: "var(--pd-1) 0",
                            }}
                        >
                            {selectedOption === "old" ? (
                                <div>
                                    <Select
                                        options={billOptions}
                                        isSearchable={true}
                                        placeholder="Selectionner une référende de facture"
                                        noOptionsMessage={() => "Aucune option"}
                                        value={selectedbill}
                                        onChange={(item: any) => {
                                            setSelectedbill(item);
                                        }}
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        color: "var(--color-1)",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            lineHeight: "1.5",
                                        }}
                                    >
                                        Nouvelle facture
                                    </div>
                                    <p
                                        style={
                                            {
                                                // lineHeight: "1",
                                            }
                                        }
                                    >
                                        Ces informations seront affectées à une
                                        nouvelle facture!
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--main-gap)",
                            }}
                        >
                            <div className="input">
                                <label htmlFor="">Référence du facture</label>
                                <div
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "20px",
                                        height: "40px",
                                        color: "var(--color-1)",
                                        // fontWeight: "bold",
                                    }}
                                >
                                    {appointment.facture.factureRef}
                                </div>
                            </div>
                            <button
                                className="center"
                                style={{
                                    backgroundColor: "white",
                                    padding: "var(--pd-0)",
                                    borderRadius: "var(--main-rd)",
                                    gap: "var(--s-gap)",
                                    alignItems: "center",
                                    color: "#555",
                                    border: "1px solid #ddd",
                                    fontSize: "small",
                                }}
                                onClick={() => setOpenFactDetails(true)}
                            >
                                <SVGIcon
                                    type="show"
                                    height={20}
                                    width={20}
                                    color="inherit"
                                />
                                Afficher la facture
                            </button>
                            <InvoiceDetailsCard
                                display={openFactDetails}
                                handleClose={() => setOpenFactDetails(false)}
                                data={invoicing.invoice}
                            />
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--main-gap)",
                            width: "calc(50% - 20px)",
                            fontSize: "14px",
                            color: "var(--gray-1)",
                        }}
                    >
                        <label
                            className="checkbox-label"
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "var(--s-gap)",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={isManuelSum}
                                onChange={() => {
                                    setIsManuelSum((prev: boolean) => !prev);
                                    setIsEditing(true);
                                }}
                            />
                            <div
                                style={{
                                    height: "18px",
                                    width: "18px",
                                    border: "1px solid var(--color-1)",
                                    borderRadius: "var(--main-rd)",
                                    // backgroundColor: "white",
                                }}
                            >
                                <SVGIcon
                                    type="check"
                                    height={17}
                                    width={17}
                                    color="white"
                                />
                            </div>
                            Effectuer une somme manuelle.
                        </label>
                    </div>
                    <BillDetails
                        actsTotalCost={actsTotalCost}
                        appServicesTotalCost={appServicesTotalCost}
                        toothActs={toothActsByApp}
                        appServices={appServices}
                        hide={isManuelSum}
                        handleUpdateToothAct={handleUpdateToothAct}
                        handleDeleteToothAct={handleDeleteToothAct}
                        handleGetToothActsByApp={handleGetToothActsByApp}
                        handleUpdateAppointmentService={
                            handleUpdateAppointmentService
                        }
                        handleDeleteAppointmentService={
                            handleDeleteAppointmentService
                        }
                        handleGetAppointmentServices={
                            handleGetAppointmentServices
                        }
                        appointmentID={appointmentID}
                        setIsEditing={setIsEditing}
                    />
                    <div
                        style={
                            {
                                // position: "sticky",
                                // bottom: "-10px",
                                // backgroundColor: "var(--color-3)",
                                // padding: "var(--pd-1)",
                                // boxShadow:
                                //     " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                            }
                        }
                    >
                        <div
                            style={{
                                // backgroundColor: "red",
                                // padding: "10px",
                                width: isManuelSum ? "100%" : "50%",
                                marginLeft: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: "var(--main-gap)",
                            }}
                        >
                            <CostAndPayment
                                costsArray={[
                                    actsTotalCost,
                                    appServicesTotalCost,
                                ]}
                                isManuelSum={isManuelSum}
                                billInfo={billInfo}
                                isEditing={isEditing}
                                onBillChange={onBillChange}
                            />
                            {/* <div className="edit-btn" onClick={validateInvoicing}>
                        <SVGIcon
                            type="invoicing"
                            color="inherit"
                            width={25}
                            height={25}
                        />
                        Valider ce payement
                    </div> */}
                            {!isEditing ? (
                                <div
                                    className="edit-btn"
                                    onClick={() => setIsEditing(true)}
                                >
                                    {appointment.factureID && (
                                        <SVGIcon
                                            type="edit"
                                            color="inherit"
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                    {appointment.factureID
                                        ? "Modifier"
                                        : "Valider"}
                                </div>
                            ) : (
                                <div
                                    className="center"
                                    style={{
                                        gap: "var(--main-gap)",
                                    }}
                                >
                                    <div
                                        className="edit-btn"
                                        onClick={validateInvoicing}
                                    >
                                        Valider
                                    </div>
                                    <div
                                        className="delete-btn"
                                        onClick={handleCancelValidation}
                                    >
                                        Annuler
                                    </div>
                                </div>
                            )}
                            {appointments.edit.error && (
                                <div className="form-error">
                                    {appointments.edit.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
