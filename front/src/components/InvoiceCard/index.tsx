/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import "./style.css";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import { InvoiceDetails } from "../InvoiceDetails";
import Button from "../Button";

export function InvoiceDetailsCard(props: InvoiceDetailsCardProps) {
    const { display, handleClose, data } = props;

    const labelStatus = (status: string) => {
        switch (status) {
            case "canceled":
                return "Annuler";
                break;
            // case "canceled":
            //     return "Annuler";
            //     break;
            // case "canceled":
            //     return "Annuler";
            //     break;
            // case "canceled":
            //     return "Annuler";
            //     break;

            default:
                return "non-défini";
                break;
        }
    };
    const invoiceStatus = (status: string) => {
        switch (status) {
            case null:
                return "En cours";
                break;

            default:
                return "En cours";
                break;
        }
    };
    const StatusButton = (
        status: "payed-status" | "impayed" | "part-payed",
    ) => {
        let colorStyle = "#EC5252";
        let text = "Non soldée";
        switch (status) {
            case "payed-status":
                colorStyle = "#53BC57";
                text = "Soldée";
                break;
            case "part-payed":
                colorStyle = "#F1B519";
                text = "Part-soldée";
                break;
            default:
        }
        return (
            <div
                style={{
                    display: "inline",
                    padding: "5px 15px",
                    borderRadius: 4,
                    backgroundColor: colorStyle,
                    color: "white",
                    fontWeight: 700,
                    minWidth: 100,
                    textAlign: "center",
                    fontSize: 14,
                }}
            >
                {text}
            </div>
        );
    };
    if (data) {
        return (
            <Modal modalEnabled={display} onClose={handleClose}>
                <PopupCard
                    style={{ width: "70vw" }}
                    title="Suivi de facturation"
                    activatedFooter={false}
                    onClose={handleClose}
                    display={display}
                    // buttons={popupButtons}
                >
                    <div className="invoice-card">
                        <div className="invoice-card-header">
                            <div className="invoice-ref-date-body">
                                <h1 id="invoice-ref">#{data.ref}</h1>
                                <h2 id="invoice-date">
                                    Date: {data.creationDate}
                                </h2>
                            </div>
                            <div className="invoice-patient-status-body">
                                <div className="patient-name">
                                    <h2>{`${data.firstNameP} ${data.lastNameP}`}</h2>
                                    {/* you should also add an icon so he can easily move to its profile */}
                                </div>
                                <h2 id="invoice-status">
                                    Statut: {StatusButton(data.status)}{" "}
                                </h2>
                            </div>
                        </div>
                        <div className="invoice-card-content">
                            <InvoiceDetails data={data} />
                        </div>
                        <div className="invoice-card-footer">
                            <div className="total-calculation">
                                <div className="amount-container">
                                    <h3 className="amount-label">
                                        Montant Total :
                                    </h3>
                                    <h3 className="amount-value">
                                        {data.totalAmount} TND
                                    </h3>
                                </div>
                                <div className="amount-container">
                                    <h3 className="amount-label">
                                        Montant Payé :
                                    </h3>
                                    <h3 className="amount-value">
                                        {data.payedAmount} TND
                                    </h3>
                                </div>
                                <div className="amount-seperator"></div>
                                <div className="amount-container">
                                    <h3 className="amount-label">
                                        Montant Restant :
                                    </h3>
                                    <h3 className="amount-value">
                                        {data.restAmount} TND
                                    </h3>
                                </div>
                            </div>
                            <div className="invoice-footer-options">
                                {/* <Button
                                    text="Imprimer"
                                    style={{
                                        fontSize: "15px",
                                        height: "35px",
                                    }}
                                    onClick={() =>
                                        alert("open in browser file document")
                                    }
                                /> */}
                                {/* <Button
                                    text="Fermer"
                                    style={{
                                        fontSize: "15px",
                                        height: "35px",
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                </PopupCard>
            </Modal>
        );
    } else {
        return (
            <Modal modalEnabled={display} onClose={handleClose}>
                <PopupCard
                    style={{ width: "70vw" }}
                    title="Suivi de facturation"
                    activatedFooter={true}
                    onClose={handleClose}
                    display={display}
                    // buttons={popupButtons}
                ></PopupCard>
            </Modal>
        );
    }
}

interface InvoiceDetailsCardProps {
    display?: boolean;
    handleClose?: (data?: any) => void;
    data?: any;
}

InvoiceDetailsCard.defaultProps = {
    display: true,
    handleClose: () => {
        console.log("PopupCard is closed");
    },
};
