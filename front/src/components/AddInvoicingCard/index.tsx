import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
export default function AddInvoicingCard(props: AddInvoicingCardProps) {
    const { display, onClose } = props;
    const func = () => {
        console.log("hi");
    };
    const buttons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: func,
        },
        {
            text: "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: func,
        },
      
    ];
    return (
        <Modal modalEnabled={display} onClose={onClose}>
            <PopupCard
                title='Créer une facture'
                activatedFooter={true}
                onClose={onClose}
                display={display}
                buttons={buttons}
            >
                <div>
                    <h4>Montant total de la facture</h4>
                </div>
            </PopupCard>
        </Modal>
    );
}
interface AddInvoicingCardProps {
    display: boolean;
    onClose?: () => void;
}
