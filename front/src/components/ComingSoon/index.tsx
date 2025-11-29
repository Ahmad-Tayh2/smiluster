import React from "react";
import SVGIcon from "../SVGIcon";
export default function ComingSoon() {
    return (
        <div
            className='center'
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: "0",
                left: "0",
                color: "var(--color-1)",
                fontWeight: "bold",
                fontSize: "xx-large",
                backdropFilter: "blur(8px)",
                zIndex: "9",
                /* Optional: Add a fallback background color */
                backgroundColor: "rgba(255, 255, 255, 0.6)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "var(--main-gap)",
                    color: "var(--color-1)",
                    fontWeight: "bold",
                    fontSize: "xx-large",
                    backgroundColor: "#ffebd8a0",
                    padding: "var(--pd-3)",
                    borderRadius: "var(--main-rd)",
                    border: "4px dashed var(--color-1)",
                }}
            >
                <SVGIcon
                    type='sand-clock'
                    color='var(--color-1)'
                    height={40}
                    width={40}
                />
                Bientôt, disponible !
            </div>
        </div>
    );
}
