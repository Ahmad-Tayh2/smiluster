import React from "react";
import "./style.css";

import SVGIcon from "../../components/SVGIcon";

export default function ActionsTable(props: any) {
    const {
        appointmentID,
        onUpdate,
        onDelete,
        onGet,
        total,
        totalText,
        columns,
        data,
        noDataMessagge,
        setIsEditing,
    } = props;
    return (
        <table
            className="invoicing-acts-table"
            style={{
                width: "100%",
                backgroundColor: "white",
                // opacity: hide ? "0.5" : "1",
                borderRadius: "var(--main-rd)",
                overflow: "hidden",
            }}
        >
            <thead
                style={{
                    // backgroundColor: "var(--color-5)",
                    color: "var(--color-1)",
                    position: "sticky",
                    top: 0,
                }}
            >
                <tr
                    style={{
                        backgroundColor: "#a3d4d5",
                    }}
                >
                    {columns.map((item: string, index: number) => (
                        <th
                            style={{
                                width:
                                    index === 0
                                        ? "50%"
                                        : index === 2
                                          ? "100px"
                                          : "auto",
                            }}
                        >
                            <div
                                style={{
                                    padding: "var(--pd-0)",
                                    textAlign: "left",
                                }}
                            >
                                {item}
                            </div>
                        </th>
                    ))}
                    <th
                        style={{
                            width: "45px",
                        }}
                    ></th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item: any, index: number) => {
                    return (
                        <tr
                            key={index}
                            style={{
                                backgroundColor:
                                    index % 2 ? "#f5f5f5" : "white",
                            }}
                        >
                            <td>
                                <div
                                    style={{
                                        textAlign: "left",
                                        display: "block",
                                        height: "inherit",
                                    }}
                                >
                                    {item.title}
                                </div>
                            </td>
                            <td>
                                <div
                                    style={{
                                        textAlign: "right",

                                        display: "block",
                                        marginRight: "38%",
                                    }}
                                >
                                    {item.cost}{" "}
                                    <span
                                        style={{
                                            fontSize: "small",
                                            color: "#aaa",
                                        }}
                                    >
                                        DT
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="center">
                                    <div
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            gap: "var(--s-gap)",
                                            width: "fit-content",
                                            padding: "3px 5px",
                                            color: item.isPaid
                                                ? "var(--success-color-1)"
                                                : "var(--danger-color)",
                                            borderRadius: "5px",
                                            backgroundColor: item.isPaid
                                                ? "var(--success-color)"
                                                : "var(--danger-color-1)",
                                        }}
                                        onClick={async () => {
                                            let ok = await onUpdate(
                                                {
                                                    ...item.prevData,
                                                    isPaid: !item.isPaid,
                                                },
                                                item.id,
                                            );
                                            if (ok) {
                                                setIsEditing(true);
                                                await onGet(appointmentID);
                                            }
                                        }}
                                    >
                                        {item.isPaid && (
                                            <SVGIcon
                                                type="check"
                                                height={17}
                                                width={17}
                                                color="white"
                                            />
                                        )}
                                        <div>
                                            {item.isPaid ? "Payé" : "À payer"}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <SVGIcon
                                        type={"trash"}
                                        color={"var(--danger-color)"}
                                        width={25}
                                        height={25}
                                        onClick={async () => {
                                            let ok = await onDelete(item.id);
                                            if (ok) {
                                                setIsEditing(true);
                                                await onGet(appointmentID);
                                            }
                                        }}
                                    />
                                </div>
                            </td>
                        </tr>
                    );
                })}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={3}>
                            <div
                                className="center"
                                style={{
                                    color: "gray",
                                    gap: "var(--s-gap)",
                                }}
                            >
                                <SVGIcon
                                    type="not-found"
                                    color="gray"
                                    width={20}
                                    height={20}
                                />
                                {noDataMessagge}
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            {data?.length > 1 && (
                <tfoot
                    style={{
                        position: "sticky",
                        bottom: 0,
                    }}
                >
                    <tr>
                        <td>
                            <div
                                style={{
                                    textAlign: "left",
                                    display: "block",
                                    height: "inherit",
                                    color: "white",
                                    fontSize: "large",
                                    fontWeight: "bold",
                                    backgroundColor: "var(--color-1)",
                                }}
                            >
                                {totalText}
                            </div>
                        </td>
                        <td colSpan={1}>
                            <div
                                style={{
                                    textAlign: "right",

                                    display: "block",
                                    fontSize: "large",
                                    fontWeight: "bold",
                                    color: "white",
                                    backgroundColor: "var(--color-1)",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "right",

                                        display: "block",
                                        marginRight: "38%",
                                        fontSize: "large",
                                        fontWeight: "bold",
                                        color: "white",
                                        backgroundColor: "var(--color-1)",
                                    }}
                                >
                                    {total}{" "}
                                    <span
                                        style={{
                                            fontSize: "medium",
                                            color: "#ccc",
                                        }}
                                    >
                                        DT
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td
                            style={{
                                backgroundColor: "var(--color-1)",
                                color: "white",
                            }}
                        >
                            <div className="center">
                                {
                                    data?.filter((item: any) => item.isPaid)
                                        .length
                                }
                                /{data.length}
                            </div>
                        </td>
                        <td
                            style={{
                                backgroundColor: "var(--color-1)",
                            }}
                        ></td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
}
