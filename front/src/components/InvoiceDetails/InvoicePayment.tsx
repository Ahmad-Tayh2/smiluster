/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ReactComponent as PenSVG } from "./pencil.svg";
import { ReactComponent as ValidSVG } from "./valid.svg";
import { ReactComponent as CancelSVG } from "./cancel.svg";
import { ReactComponent as MinusSVG } from "./minus.svg";

import "./style.css";
import { useInvoicing } from "../../hooks/useInvoicing";

export default function InvoicePayment(props: InvoicePaymentProps) {
    const { updateInvoicePayment } = useInvoicing();
    const { payments } = props;
    const [isEdit, setIsEdit] = React.useState(payments.map((_: any) => false));
    const [newPaymentValue, setNewPaymentValue] = React.useState(
        payments.map((payment: any) => payment?.cost?.toString()),
    );
    const handleEditPayment = (idPayment: number, index: number) => {
        setIsEdit((prevState) => {
            const updatedIsEdit = [...prevState];
            updatedIsEdit[index] = !updatedIsEdit[index];
            return updatedIsEdit;
        });
    };
    const handlePaymentEdit = (e: any, key: number) => {
        const updatedPayments = [...newPaymentValue];
        updatedPayments[key] = e.target.value;
        setNewPaymentValue(updatedPayments);
    };
    const validateEditPayment = async (idPayment: number, index: number) => {
        setIsEdit((prevState) => {
            const updatedIsEdit = [...prevState];
            updatedIsEdit[index] = !updatedIsEdit[index];
            return updatedIsEdit;
        });
        await updateInvoicePayment(idPayment, newPaymentValue[index]);
        //confirm user confirm the change or not ?
        //send request to change the payment cost
    };
    const cancelEditPayment = (idPayment: number, index: number) => {
        setIsEdit((prevState) => {
            const updatedIsEdit = [...prevState];
            updatedIsEdit[index] = !updatedIsEdit[index];
            return updatedIsEdit;
        });
        const updatedPayments = [...newPaymentValue];
        updatedPayments[key] = payment.cost;
        setNewPaymentValue(updatedPayments);
    };
    if (payments && payments.length > 0) {
        const result = payments.map((payment: any, key: number) => {
            return (
                <tr
                    key={key}
                    id={payment.id}
                    className="invoice-payment-container"
                >
                    <td>
                        <div
                            className="payment-description"
                            style={{
                                color: "var(--color-2)",
                                fontWeight: "bold",
                                fontSize: "large",
                                backgroundColor: "white",
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--main-gap)",
                                borderRadius: "var(--main-rd)",
                            }}
                        >{`Paiement ${payment.date} ${payment.time}`}</div>
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <div className="payment-cost">
                            <div style={{ width: "20px", height: "24px" }}>
                                -
                                {/* <MinusSVG
                                    color="#2c3e50"
                                    width={20}
                                    height={24}
                                    style={{
                                        cursor: "default",
                                    }}
                                /> */}
                            </div>
                        </div>
                    </td>
                    <td
                        style={{
                            textAlign: "center",
                        }}
                    >
                        {isEdit[key] ? (
                            <div className="payment-paid">
                                <input
                                    autoFocus={isEdit[key]}
                                    value={newPaymentValue[key]}
                                    style={{
                                        backgroundColor: "#fff5",
                                        border: "1px solid #2c3e50",
                                        width:
                                            newPaymentValue[key].length > 0
                                                ? `${newPaymentValue[key].length + 2}ch`
                                                : "3ch",
                                    }}
                                    onChange={(e: any) =>
                                        handlePaymentEdit(e, key)
                                    }
                                    // onBlur={() =>
                                    //     cancelEditPayment(payment.id, key)
                                    // }
                                />
                                <div style={{ display: "flex" }}>
                                    <div
                                        style={{
                                            width: "20px",
                                            height: "24px",
                                        }}
                                    >
                                        <ValidSVG
                                            color="#2c3e50"
                                            width={20}
                                            height={24}
                                            style={{ marginLeft: 3 }}
                                            onClick={() =>
                                                validateEditPayment(
                                                    payment.id,
                                                    key,
                                                )
                                            }
                                        />
                                    </div>
                                    <div
                                        style={{
                                            width: "20px",
                                            height: "24px",
                                        }}
                                    >
                                        <CancelSVG
                                            color="#2c3e50"
                                            width={20}
                                            height={24}
                                            style={{ marginLeft: 3 }}
                                            onClick={() =>
                                                cancelEditPayment(
                                                    payment.id,
                                                    key,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="payment-paid">
                                <div>{payment.cost}</div>
                                <div style={{ width: "20px", height: "24px" }}>
                                    <PenSVG
                                        color="#2c3e50"
                                        width={20}
                                        height={24}
                                        style={{ marginLeft: 3 }}
                                        onClick={() =>
                                            handleEditPayment(payment.id, key)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </td>
                </tr>
            );
        });
        return <>{result}</>;
    } else {
        return null;
    }
}
interface InvoicePaymentProps {
    payments?: any[];
}
InvoicePayment.defaultProps = {
    payments: [],
};
