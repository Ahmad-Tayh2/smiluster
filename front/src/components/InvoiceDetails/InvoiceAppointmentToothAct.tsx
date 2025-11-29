import * as React from "react";
import { ReactComponent as MinusSVG } from "./minus.svg";
import { ReactComponent as DisableSVG } from "./unavailable.svg";
import { ReactComponent as PenSVG } from "./pencil.svg";
import { ReactComponent as ValidSVG } from "./valid.svg";
import { ReactComponent as CancelSVG } from "./cancel.svg";
import "./style.css";
import { useInvoicing } from "../../hooks/useInvoicing";
import SVGIcon from "../SVGIcon";

export default function InvoiceAppointmentToothAct(
    props: InvoiceAppointmentToothActProps,
) {
    const { updateInvoiceToothActCostAppointment } = useInvoicing();
    const { toothAct, autoCalcEnabled } = props;
    const [isCostEdit, setIsCostEdit] = React.useState(false);
    const [toothActCost, setToothActCost] = React.useState(toothAct?.cost);
    const onClickEditToothActCost = (e: any) => {
        e.stopPropagation();
        setToothActCost(toothAct?.cost);
        setIsCostEdit(true);
    };
    const onChangeEditToothActCost = (e: any) => {
        setToothActCost(e.target.value);
    };
    const validateEditToothActCost = async (e: any) => {
        e.stopPropagation();
        //fetch change appointment cost
        console.log("toothAct", toothAct);
        await updateInvoiceToothActCostAppointment(toothAct.id, toothActCost);
        setToothActCost(toothAct?.cost);
        setIsCostEdit(false);
    };
    const cancelEditToothActCost = (e: any) => {
        e.stopPropagation();
        setToothActCost(toothAct?.cost);
        setIsCostEdit(false);
    };

    const InputValueDisplay = () => {
        if (isCostEdit) {
            return (
                <>
                    <input
                        autoFocus={isCostEdit}
                        value={toothActCost}
                        style={{
                            backgroundColor: "#fff5",
                            border: "1px solid #2c3e50",
                            width:
                                toothActCost.length > 0
                                    ? `${toothActCost.length + 2}ch`
                                    : "4ch",
                            padding: "2px 5px",
                            borderRadius: "5px",
                        }}
                        onChange={onChangeEditToothActCost}
                        // onBlur={cancelEditToothActCost}
                    />
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "20px", height: "24px" }}>
                            <ValidSVG
                                color="#2c3e50"
                                width={20}
                                height={24}
                                style={{ marginLeft: 3 }}
                                onClick={validateEditToothActCost}
                            />
                        </div>
                        <div style={{ width: "20px", height: "24px" }}>
                            <CancelSVG
                                color="#2c3e50"
                                width={20}
                                height={24}
                                style={{ marginLeft: 3 }}
                                onClick={cancelEditToothActCost}
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div>{toothAct?.cost > 0 ? toothAct?.cost : 0}</div>
                    <div style={{ width: "20px", height: "24px" }}>
                        <PenSVG
                            color="#2c3e50"
                            width={20}
                            height={24}
                            style={{ marginLeft: 3 }}
                            onClick={onClickEditToothActCost}
                        />
                    </div>
                </>
            );
        }
    };

    return (
        <tr
            key={toothAct.id}
            className="invoice-appointment-toothAct-container"
        >
            <td>
                <div
                    className="appointment-toothAct-description"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <SVGIcon type="dot" />
                    {`${toothAct.actName ? `${toothAct.actName}` : ""} `}
                    {"   "}
                    <div
                        style={{
                            fontSize: "small",
                            marginLeft: "5px",
                            color: "gray",
                        }}
                    >
                        (Dent {toothAct.toothNumber})
                    </div>
                </div>
            </td>
            <td>
                <div className="appointment-toothAct-cost">
                    {toothAct?.cost && autoCalcEnabled ? (
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
                <div className="appointment-toothAct-payment">
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

interface InvoiceAppointmentToothActProps {
    toothAct: any;
    autoCalcEnabled?: boolean;
}

InvoiceAppointmentToothAct.defaultProps = {
    autoCalcEnabled: false,
};
