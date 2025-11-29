/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ReactComponent as PenSVG } from "./pencil.svg";
import { ReactComponent as ValidSVG } from "./valid.svg";
import { ReactComponent as CancelSVG } from "./cancel.svg";
import { ReactComponent as MinusSVG } from "./minus.svg";
import { ReactComponent as AutoCalculSVG } from "./math.svg";
import SVGIcon from "../SVGIcon";

import "./style.css";
import { useInvoicing } from "../../hooks/useInvoicing";

export default function InvoiceAppointment(props: InvoiceAppointmentProps) {
    const { appointment, index, onClick, isAppointmentClicked } = props;
    const { updateInvoiceCostAppointment } = useInvoicing();

    // COST Related
    const [isCostEdit, setIsCostEdit] = React.useState(false);

    const [appointmentCost, setAppointmentCost] = React.useState(
        appointment && appointment.cost ? appointment.cost : 0,
    );
    const onClickEditCostAppointment = (e: any) => {
        console.log("onClickEditCostAppointment");
        e.stopPropagation();
        setAppointmentCost(appointment?.cost > 0 ? appointment?.cost : 0);
        setIsCostEdit(true);
    };
    const onChangeEditCostAppointment = (e: any) => {
        console.log("onChangeEditCostAppointment");
        setAppointmentCost(e.target.value);
    };
    const autoCalculateCostAppointment = async (e: any) => {
        console.log("validateEditCostAppointment");
        e.stopPropagation();
        //fetch change appointment cost
        await updateInvoiceCostAppointment(appointment.id, -1);
        setAppointmentCost(appointment?.cost > 0 ? appointment?.cost : 0);
        setIsCostEdit(false);
    };
    const validateEditCostAppointment = async (e: any) => {
        console.log("validateEditCostAppointment");
        e.stopPropagation();
        //fetch change appointment cost
        await updateInvoiceCostAppointment(appointment.id, appointmentCost);
        console.log("appointment::", appointment);
        setAppointmentCost(appointment?.cost > 0 ? appointment?.cost : 0);
        setIsCostEdit(false);
    };
    const cancelEditCostAppointment = (e: any) => {
        console.log("cancelEditCostAppointment");
        e.stopPropagation();
        setAppointmentCost(appointment?.cost > 0 ? appointment?.cost : 0);
        setIsCostEdit(false);
    };
    const handleBlurCostAppointment = (e: any) => {
        console.log("handleBlurCostAppointment");
        e.stopPropagation();
        setAppointmentCost(appointment?.cost > 0 ? appointment?.cost : 0);
        setIsCostEdit(false);
    };
    // Payment Related
    const [isPaymentEdit, setIsPaymentEdit] = React.useState(false);
    const [appointmentPayment, setAppointmentPayment] = React.useState(() => {
        let appointmentPayment = 0;
        appointment?.payments?.map((payment: any) => {
            appointmentPayment += payment?.cost;
        });
        return appointmentPayment;
    });
    let appointmentPaymentAPI = 0;
    appointment?.payments?.map((payment: any) => {
        appointmentPaymentAPI += payment?.cost;
    });
    const onClickEditPaymentAppointment = (e: any) => {
        console.log("onClickEditPaymentAppointment");
        e.stopPropagation();
        setAppointmentPayment(() => {
            let appointmentPayment = 0;
            appointment?.payments?.map((payment: any) => {
                appointmentPayment += payment?.cost;
            });
            return appointmentPayment;
        });
        setIsPaymentEdit(true);
    };
    const onChangeEditPaymentAppointment = (e: any) => {
        console.log("onChangeEditPaymentAppointment");
        setAppointmentPayment(e.target.value);
    };
    const validateEditPaymentAppointment = (e: any) => {
        e.stopPropagation();
        console.log("validateEditPaymentAppointment");
        console.log("appointment", appointment);
        //fetch change appointment cost
        setAppointmentCost(
            appointmentPaymentAPI > 0 ? appointmentPaymentAPI : 0,
        );
        setIsPaymentEdit(false);
    };
    const cancelEditPaymentAppointment = (e: any) => {
        console.log("cancelEditPaymentAppointment");
        e.stopPropagation();
        setAppointmentCost(
            appointmentPaymentAPI > 0 ? appointmentPaymentAPI : 0,
        );
        setIsPaymentEdit(false);
    };

    if (appointment) {
        return (
            <tr key={index} className="invoice-appointment-details-container">
                <td>
                    <div
                        className="appointment-description"
                        style={{
                            color: "var(--color-1)",
                            fontWeight: "bold",
                            fontSize: "large",
                            backgroundColor: "var(--color-3)",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--main-gap)",
                        }}
                    >
                        <div
                            style={{
                                transition: "var(--main-transition)",
                                transform: isAppointmentClicked
                                    ? "rotate(-90deg)"
                                    : "rotate(90deg)",
                            }}
                        >
                            <SVGIcon
                                type="right-arrow"
                                height={30}
                                width={30}
                                color="inherit"
                                onClick={() => onClick(index)}
                                style={{}}
                            />
                        </div>
                        Rendez-vous {appointment.date}
                    </div>
                </td>
                <td>
                    {isCostEdit ? (
                        <div className="appointment-cost">
                            <input
                                autoFocus={isCostEdit}
                                value={appointmentCost}
                                style={{
                                    backgroundColor: "#fff5",
                                    border: "1px solid #2c3e50",
                                    width:
                                        appointmentCost.length > 0
                                            ? `${appointmentCost.length + 2}ch`
                                            : "3ch",
                                }}
                                onChange={onChangeEditCostAppointment}
                                // onBlur={handleBlurCostAppointment}
                            />
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <ValidSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={validateEditCostAppointment}
                                    />
                                </div>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <CancelSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={cancelEditCostAppointment}
                                    />
                                </div>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <AutoCalculSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={autoCalculateCostAppointment}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="appointment-cost">
                            <div>
                                {appointment?.cost > 0 ? appointment?.cost : 0}
                            </div>
                            <div style={{ width: "20px", height: "24px" }}>
                                <PenSVG
                                    color="#2c3e50"
                                    width={20}
                                    height={24}
                                    style={{ marginLeft: 3 }}
                                    onClick={onClickEditCostAppointment}
                                />
                            </div>
                        </div>
                    )}
                </td>
                <td>
                    {false && isPaymentEdit ? (
                        <div className="appointment-paid">
                            <input
                                autoFocus={isPaymentEdit}
                                value={appointmentPayment}
                                style={{
                                    backgroundColor: "#fff5",
                                    border: "1px solid #2c3e50",
                                    width:
                                        appointmentPayment.length > 0
                                            ? `${appointmentPayment.length + 2}ch`
                                            : "3ch",
                                }}
                                onChange={onChangeEditPaymentAppointment}
                                // onBlur={cancelEditPaymentAppointment}
                            />
                            <div style={{ display: "flex" }}>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <ValidSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={validateEditPaymentAppointment}
                                    />
                                </div>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <CancelSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={cancelEditPaymentAppointment}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="appointment-paid">
                            <div>
                                {appointmentPaymentAPI > 0
                                    ? appointmentPaymentAPI
                                    : 0}
                            </div>
                            {/* <div style={{ width: "20px", height: "24px" }}>
                                <PenSVG
                                    color="#2c3e50"
                                    width={20}
                                    height={24}
                                    style={{ marginLeft: 3 }}
                                    onClick={onClickEditPaymentAppointment}
                                />
                            </div> */}
                        </div>
                    )}
                </td>
            </tr>
        );
    } else {
        return null;
    }
}

interface InvoiceAppointmentProps {
    appointment?: any;
    index?: number;
    onClick?: (index: number) => void;
    isAppointmentClicked?: boolean;
}

InvoiceAppointment.defaultProps = {};
