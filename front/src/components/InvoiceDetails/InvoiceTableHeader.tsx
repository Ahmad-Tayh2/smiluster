import * as React from "react";
import "./style.css";

export default function InvoiceHeader(props: InvoiceHeaderProps) {
    return (
        <tr
            style={{
                backgroundColor: "#eee",
                padding: "var(--pd-0)",
            }}
        >
            <th style={{ width: "60%", padding: "var(--pd-0)" }}>
                Description
            </th>
            <th style={{ width: "20%", padding: "var(--pd-0)" }}>
                <div style={{ display: "flex", marginLeft: "50%" }}>Doit</div>
            </th>
            <th style={{ width: "20%", padding: "var(--pd-0)" }}>
                <div style={{ display: "flex", marginLeft: "50%" }}>Reçu</div>
            </th>
        </tr>
    );
}

interface InvoiceHeaderProps {}

InvoiceHeader.defaultProps = {};
