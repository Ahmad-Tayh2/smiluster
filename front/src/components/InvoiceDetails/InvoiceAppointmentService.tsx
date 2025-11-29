import * as React from "react";
import { ReactComponent as MinusSVG } from "./minus.svg";
import { ReactComponent as DisableSVG } from "./unavailable.svg";
import { ReactComponent as PenSVG } from "./pencil.svg";
import { ReactComponent as ValidSVG } from "./valid.svg";
import { ReactComponent as CancelSVG } from "./cancel.svg";
import "./style.css";
import { useInvoicing } from "../../hooks/useInvoicing";
import SVGIcon from "../SVGIcon";

export default function InvoiceAppointmentService(
    props: InvoiceAppointmentServiceProps,
) {
    const { updateInvoiceServiceCostAppointment } = useInvoicing();
    const { service, autoCalcEnabled } = props;
    const [isServiceEdit, setIsServiceEdit] = React.useState(false);
    const [serviceCost, setServiceCost] = React.useState(service?.cost);
    const onClickEditServiceCost = (e: any) => {
        e.stopPropagation();
        setServiceCost(service?.cost);
        setIsServiceEdit(true);
    };
    const onChangeEditServiceCost = (e: any) => {
        setServiceCost(e.target.value);
    };
    const validateEditServiceCost = async (e: any) => {
        e.stopPropagation();
        //fetch change appointment cost
        console.log("service", service);
        await updateInvoiceServiceCostAppointment(service.id, serviceCost);
        setServiceCost(service?.cost);
        setIsServiceEdit(false);
    };
    const cancelEditServiceCost = (e: any) => {
        e.stopPropagation();
        setServiceCost(service?.cost);
        setIsServiceEdit(false);
    };

    const InputValueDisplay = () => {
        if (isServiceEdit) {
            return (
                <>
                    <input
                        autoFocus={isServiceEdit}
                        value={serviceCost}
                        style={{
                            backgroundColor: "#fff5",
                            border: "1px solid #2c3e50",
                            width:
                                serviceCost.length > 0
                                    ? `${serviceCost.length + 2}ch`
                                    : "3ch",
                        }}
                        onChange={onChangeEditServiceCost}
                        // onBlur={cancelEditServiceCost}
                    />
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "20px", height: "24px" }}>
                            <ValidSVG
                                color="#2c3e50"
                                width={20}
                                height={24}
                                style={{ marginLeft: 3 }}
                                onClick={validateEditServiceCost}
                            />
                        </div>
                        <div style={{ width: "20px", height: "24px" }}>
                            <CancelSVG
                                color="#2c3e50"
                                width={20}
                                height={24}
                                style={{ marginLeft: 3 }}
                                onClick={cancelEditServiceCost}
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div>{service?.cost > 0 ? service?.cost : 0}</div>
                    <div style={{ width: "20px", height: "24px" }}>
                        <PenSVG
                            color="#2c3e50"
                            width={20}
                            height={24}
                            style={{ marginLeft: 3 }}
                            onClick={onClickEditServiceCost}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <tr key={service.id} className="invoice-appointment-service-container">
            <td>
                <div
                    className="appointment-service-description"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <SVGIcon type="dot" />
                    {service.title}
                </div>
            </td>
            <td>
                <div className="appointment-service-cost">
                    {service?.cost && autoCalcEnabled ? (
                        <InputValueDisplay />
                    ) : (
                        <div style={{ width: "20px", height: "24px" }}>
                            <DisableSVG
                                color="#2c3e50"
                                width={20}
                                height={24}
                                style={{
                                    cursor: "default",
                                }}
                            />
                        </div>
                    )}
                </div>
            </td>
            <td>
                <div className="appointment-service-payment">
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
        </tr>
    );
}

interface InvoiceAppointmentServiceProps {
    service?: any;
}

InvoiceAppointmentService.defaultProps = {};
