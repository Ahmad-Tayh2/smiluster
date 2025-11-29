import React from "react";
import "./style.css";
import SVGIcon from "../SVGIcon";
export default function NotificationItem(props: any) {
    const { type } = props;
    const des =
        "this is the description of the notification item, try to display it as you want";
    return (
        <div className='notif-item'>
            <div className='center icon'>
                <div className='center icon-wrapper'>
                    <SVGIcon
                        type='notification'
                        height={40}
                        width={40}
                        color='var(--color-1)'
                    />
                </div>
            </div>
            <div className='content'>
                <div
                    className='title'
                    style={{
                        fontSize: type === "small" ? "14px" : "17px",
                    }}
                >
                    Notif Title
                </div>
                <div
                    className='description'
                    style={{
                        fontSize: type === "small" ? "13px" : "16px",
                    }}
                >
                    {type === "small" ? des.slice(0, 45) : des}
                    {type === "small" && des.length > 45 ? "..." : ""}
                </div>
                <div
                    className='time'
                    style={{
                        fontSize: type === "small" ? "13px" : "14px",
                    }}
                >
                    Il y a une heure
                </div>
            </div>
            <div className='options'>
                {/* <div>
                    <SVGIcon
                        type='dots'
                        height={20}
                        width={20}
                        color='var(--color-1)'
                        style={{
                            transform: "rotate(90deg)",
                        }}
                    />
                </div> */}
                <div
                    style={{
                        height: type === "small" ? "9px" : "12px",
                        width: type === "small" ? "9px" : "12px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-1)",
                    }}
                ></div>
            </div>
        </div>
    );
}
