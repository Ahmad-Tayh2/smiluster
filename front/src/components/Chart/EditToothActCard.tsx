/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
// import Select from "react-select";
// import AsyncSelect from "react-select/async";
// import { usePatients } from "../../hooks/usePatients";
// import { useAppointments } from "../../hooks/useAppointments";
// import {
//     createAppointmentDateTime,
//     reverseAppointmentDateTime,
// } from "../../utils/functions";
export default function EditToothActCard(props: any) {
    const { display, onUpdate, onClose, data } = props;

    const popupButtons = [
        {
            text: "Modifier",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: onUpdate,
        },
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: onClose,
        },
    ];

    return (
        <Modal modalEnabled={display} onClose={onClose}>
            <PopupCard
                title={"Modifier acte dentaire"}
                activatedFooter={true}
                onClose={onClose}
                display={display}
                buttons={popupButtons}
            >
                <form action="">
                    <div>
                        <label htmlFor="">Acte</label>
                        <input type="text" />
                    </div>
                </form>
            </PopupCard>
        </Modal>
    );
}
