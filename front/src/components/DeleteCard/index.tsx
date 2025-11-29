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
export default function AddAppointmentCard(props: any) {
    const { display, onClose, name, onDelete, additionalText, alert } = props;

    const popupButtons = [
        {
            text: "Supprimer",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: onDelete,
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
                title={"Supprimer " + name}
                activatedFooter={true}
                onClose={onClose}
                display={display}
                buttons={popupButtons}
                style={{
                    width: alert ? "650px" : "500px",
                }}
            >
                <div
                    style={{
                        color: alert ? "var(--danger-color)" : "",
                        fontSize: alert ? "x-large" : "large",
                        lineHeight: "2",
                    }}
                >
                    Confirmez-vous la suppression de {name || "ceci"} ?
                </div>

                {additionalText && (
                    <div
                        style={{
                            backgroundColor: "var(--danger-color-1)",
                            padding: "var(--pd-1)",
                            borderRadius: "var(--main-rd)",
                        }}
                    >
                        {additionalText}
                    </div>
                )}
            </PopupCard>
        </Modal>
    );
}
