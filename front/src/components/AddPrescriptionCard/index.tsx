import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
export default function AddPrescriptionCard(props: AddInvoicingCardProps) {
    const { display, onClose } = props;
    const buttons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            // onClick: func,
        },
        {
            text: "Enregistrer",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            // onClick: func,
        },
       
    ];
    return (
        <Modal modalEnabled={display} onClose={onClose}>
            <PopupCard
                title='Ecrire une ordonnance'
                activatedFooter={true}
                onClose={onClose}
                display={display}
                buttons={buttons}
            ></PopupCard>
        </Modal>
    );
}
interface AddInvoicingCardProps {
    display: boolean;
    onClose?: () => void;
}
