import * as React from "react";
import "./style.css";
import InvoicePayment from "./InvoicePayment";
import InvoiceHeader from "./InvoiceTableHeader";
import InvoiceAppointment from "./InvoiceAppointment";
import InvoiceAppointmentToothAct from "./InvoiceAppointmentToothAct";
import InvoiceAppointmentService from "./InvoiceAppointmentService";

export function InvoiceDetails(props: InvoideDetailsProps) {
    const { data } = props;
    const [appointments, setAppointments] = React.useState(
        data.details.filter((elem) => elem.type === "appointment"),
    );
    const [payments, setPayments] = React.useState(
        data.details.filter((elem) => elem.type === "payment"),
    );
    React.useEffect(() => {
        console.log("data.details", data.details);
        if (data) {
            setAppointments(
                data.details.filter((elem) => elem.type === "appointment"),
            );
            setPayments(data.details.filter((elem) => elem.type === "payment"));
        }
    }, [data]);

    const [isAppointmentClicked, setIsAppointmentClicked] = React.useState(
        appointments.map((_) => true),
    );

    const toggleIsAppointmentClicked = (index: number) => {
        console.log("index is eq", index);
        const toggleList = isAppointmentClicked.map((val: any, i: number) =>
            index === i ? !val : val,
        );

        console.log("toggleList", toggleList);
        setIsAppointmentClicked(() => toggleList);
    };
    return (
        <div className="invoice-details-container">
            <table
                style={{
                    width: "100%",
                    tableLayout: "fixed",
                    borderCollapse: "collapse",
                }}
            >
                <InvoiceHeader />
                {appointments &&
                    appointments.length > 0 &&
                    appointments.map((appointment: any, key: number) => {
                        if (isAppointmentClicked[key]) {
                            return (
                                <>
                                    <InvoiceAppointment
                                        onClick={toggleIsAppointmentClicked}
                                        appointment={appointment}
                                        index={key}
                                        isAppointmentClicked={
                                            isAppointmentClicked[key]
                                        }
                                    />
                                    {appointment.toothActs?.length > 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                style={{
                                                    // backgroundColor: "red",
                                                    padding: "0",
                                                    backgroundColor:
                                                        "var(--color-5)",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginLeft: "30px",
                                                        padding: "var(--pd-1)",
                                                        width: "fit-content",
                                                        height: "inherit",
                                                    }}
                                                >
                                                    Acte(s) effectué(s)
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {appointment.toothActs?.length > 0
                                        ? appointment.toothActs.map(
                                              (toothAct: any) => {
                                                  return (
                                                      <InvoiceAppointmentToothAct
                                                          key={key}
                                                          toothAct={toothAct}
                                                          autoCalcEnabled={true}
                                                      />
                                                  );
                                              },
                                          )
                                        : null}
                                    {appointment.services?.length > 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                style={{
                                                    // backgroundColor: "red",
                                                    padding: "0",
                                                    backgroundColor:
                                                        "var(--color-5)",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        marginLeft: "30px",

                                                        padding: "var(--pd-1)",
                                                        width: "fit-content",
                                                        fontSize: "large",

                                                        height: "inherit",
                                                    }}
                                                >
                                                    Service(s) fourni(s)
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {appointment.services?.length > 0
                                        ? appointment.services.map(
                                              (service: any) => {
                                                  return (
                                                      <InvoiceAppointmentService
                                                          key={key}
                                                          service={service}
                                                          autoCalcEnabled={true}
                                                      />
                                                  );
                                              },
                                          )
                                        : null}
                                </>
                            );
                        } else {
                            return (
                                <InvoiceAppointment
                                    key={key}
                                    index={key}
                                    onClick={toggleIsAppointmentClicked}
                                    appointment={appointment}
                                />
                            );
                        }
                    })}

                <InvoicePayment payments={payments} />
            </table>
        </div>
    );
}

interface InvoideDetailsProps {
    data?: any;
}
