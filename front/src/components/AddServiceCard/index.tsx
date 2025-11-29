import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import "./style.css";
import Select from "react-select";
import { useAppointments } from "../../hooks/useAppointments";

export default function AddServiceCard(props: any) {
    const { onClose, display, appointmentID, setIsFactureEdited } = props;
    const handleClose = () => {
        onClose && onClose();
        setService({
            title: "",
            cost: "",
        });
        setSelectedOption(null);
    };

    const [service, setService] = React.useState({
        title: "",
        cost: "",
    });
    const [selectedOption, setSelectedOption] = React.useState<any>(null);

    const {
        handleAddAppointmentService,
        handleAddService,
        handleGetAppointmentServices,
        handleGetServices,
        services,
    } = useAppointments();
    const onAddService = async () => {
        console.log("servces ", service);
        //create service
        console.log("selectedOption = ", selectedOption);
        let ok: any = true;
        let serviceID: any = null;
        if (!oldService) {
            ok = await handleAddService(service);
            if (ok) serviceID = ok?.serviceID;
        } else {
            serviceID = selectedOption?.value || null;
        }
        // //if ok create appService
        if (ok && serviceID) {
            ok = await handleAddAppointmentService({
                appointmentID,
                serviceID,
            });
            if (ok) {
                handleClose();
                setIsFactureEdited(true);
                await handleGetAppointmentServices(appointmentID);
                await handleGetServices();
            }
        }
    };
    const popupButtons = [
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
            text: "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: onAddService,
        },
    ];
    React.useEffect(() => {
        if (display) {
            handleGetServices();
        }
    }, [display]);
    const serviceOptions = React.useMemo(() => {
        return (
            services?.map((option: any) => ({
                label: (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>{option.title}</div>
                        <div>{option.cost} DT</div>
                    </div>
                ),
                value: option.serviceID,
            })) || []
        );
    }, [services]);
    const [oldService, setOldService] = React.useState(true);
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={"Ajouter un service"}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={popupButtons}
            >
                <div className="add-service-tabs">
                    <div
                        className={`tab ${oldService ? "active-form" : ""}`}
                        onClick={() => setOldService(true)}
                    >
                        Ancien service
                    </div>
                    <div
                        className={`tab ${!oldService ? "active-form" : ""}`}
                        onClick={() => setOldService(false)}
                    >
                        Nouveau service
                    </div>
                </div>

                <div className="service-form">
                    <p>
                        Le service que vous allez créer sera associé au
                        rendez-vous en cours.
                    </p>
                    {oldService ? (
                        <div className="act-select">
                            <label htmlFor="">Service</label>
                            <Select
                                options={serviceOptions}
                                // styles={colorStyles}
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
                                onChange={(option: any) => {
                                    setSelectedOption(option);
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="">Nom service</label>
                                <input
                                    type="text"
                                    name="serviceName"
                                    value={service.title}
                                    onChange={(e: any) => {
                                        setService((prev: any) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Coût (DT)</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={service.cost}
                                    onChange={(e: any) => {
                                        setService((prev: any) => ({
                                            ...prev,
                                            cost: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </>
                    )}
                    {services.error && (
                        <div className="form-error">{services.error}</div>
                    )}
                </div>
            </PopupCard>
        </Modal>
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
interface AddAppointmentCardProps {
    display: boolean;
    onClose?: () => void;
    toEdit?: any;
    existing?: boolean;
    onSuccess?: () => void;
}
