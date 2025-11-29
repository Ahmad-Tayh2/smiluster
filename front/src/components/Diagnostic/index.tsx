import React from "react";
import "./style.css";

export default function Diagnotic() {
    return (
        <div>
            <textarea
                name=''
                style={{
                    border: "1px solid var(--color-2)",
                    borderRadius: "var(--main-rd)",
                    backgroundColor: "var(--color-3)",
                    height: "435px",
                    width: "100%",
                }}
            ></textarea>
            <div
                style={{
                    height: "60px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <button
                    style={{
                        backgroundColor: "var(--color-1)",
                        padding: "0 20px",
                        color: "white",
                        borderRadius: "var(--main-rd)",
                        height: "100%",
                    }}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    );
}
