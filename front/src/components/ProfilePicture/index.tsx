import React from "react";

export default function ProfilePicture(props: any) {
    const { src, alt, color, bgColor, size } = props;
    return (
        <>
            {src === "1" ? (
                <img
                    src={src}
                    alt='doctor image'
                    style={{
                        width: "100%",
                        borderRadius: "var(--main-rd)",
                    }}
                />
            ) : (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color,
                        fontSize: size,
                        backgroundColor: bgColor,
                        borderRadius: "var(--main-rd)",
                    }}
                >
                    {alt.toUpperCase()}
                </div>
            )}
        </>
    );
}
