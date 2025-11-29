/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
import { useInvoicing } from "../../hooks/useInvoicing";

export default function AddPaymentCard(props: AddPaymentCardProps) {
    const { display, title, onClose, onSubmit } = props;
    const { invoicing } = useInvoicing();
    const [invoiceInfo, setInvoiceInfo] = useState<any>(null);
    const [addedAmount, setAddedAmount] = useState(0);
    useEffect(() => {
        if (invoicing?.invoice) {
            setInvoiceInfo(invoicing?.invoice);
        }
    }, [invoicing?.invoice]);

    const handleClose = () => {
        onClose && onClose();
    };
    const handleSubmit = () => {
        onSubmit(addedAmount);
        onClose && onClose();
    };
    const handleChange = (e: any) => {
        setAddedAmount(e.target.value);
    };
    const popupButtons: any = [
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
            text: "Payer",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: handleSubmit,
        },
    ];
    if (invoiceInfo) {
        return (
            <Modal modalEnabled={display} onClose={handleClose}>
                <PopupCard
                    title={title}
                    activatedFooter={true}
                    onClose={handleClose}
                    display={display}
                    buttons={popupButtons}
                >
                    <div className='add-payment-card-container'>
                        <div className='payment-card-header'>
                            <div
                                className='fact-ref'
                                style={{
                                    color: "var(--wh-slate-700)",
                                    fontWeight: 700,
                                }}
                            >
                                Réf: {invoiceInfo.ref}
                            </div>
                            <div
                                className='fact-patient'
                                style={{
                                    color: "var(--wh-slate-500)",
                                }}
                            >
                                {`${invoiceInfo.firstNameP} ${invoiceInfo.lastNameP}`}
                            </div>
                        </div>
                        <div className='payment-info'>
                            <div className='payment-card-subheader'>
                                <div
                                    style={{
                                        color: "var(--wh-slate-700)",
                                        fontWeight: 500,
                                    }}
                                >
                                    Montant total :
                                </div>
                                <div>{invoiceInfo.totalAmount}</div>
                            </div>
                            <div className='payment-card-subheader'>
                                <div
                                    style={{
                                        color: "var(--wh-slate-700)",
                                        fontWeight: 500,
                                    }}
                                >
                                    Montant payé :
                                </div>
                                <div>{invoiceInfo.payedAmount}</div>
                            </div>
                            <div className='payment-card-subheader'>
                                <div
                                    style={{
                                        color: "var(--wh-slate-700)",
                                        fontWeight: 500,
                                    }}
                                >
                                    Montant Restant :
                                </div>
                                <div>{invoiceInfo.restAmount}</div>
                            </div>
                        </div>
                        <div className='payment-card-content'>
                            <div
                                style={{
                                    color: "var(--color-1)",
                                    margin: "7px 0",
                                    fontWeight: 700,
                                }}
                            >
                                Montant en cours
                            </div>
                            <div>
                                <input
                                    style={{
                                        border: "1px solid #bcbcbc",
                                        padding: 5,
                                        borderRadius: 4,
                                        marginBottom: 10,
                                    }}
                                    name='cost'
                                    type='text'
                                    placeholder='Somme Payée...'
                                    onChange={handleChange}
                                />
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
                    title={title}
                    activatedFooter={true}
                    onClose={handleClose}
                    display={display}
                    buttons={popupButtons}
                >
                    <div className='add-payment-card-container'>Loading...</div>
                </PopupCard>
            </Modal>
        );
    }
}
interface AddPaymentCardProps {
    display: boolean;
    title: string;
    onClose: Function;
    onSubmit: Function;
    onCancel: Function;
}

AddPaymentCard.defaultProps = {
    display: true,
    title: "Ajouter un montant payé",
};
