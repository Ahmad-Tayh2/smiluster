import React from "react";
import "./style.css";
import NotificationItem from "../../components/NotificationItem";
import ComingSoon from "../../components/ComingSoon";

export default function Notifications() {
    const [all, setAll] = React.useState(true);
    return (
        <div
            className='notifications-page'
            style={{
                position: "relative",
            }}
        >
            <ComingSoon />
            <div className='page-title'>Notifications</div>
            <div className='notifications-list main-box'>
                <div className='add-appointment-tabs'>
                    <div
                        className={`tab ${all ? "active-form" : ""}`}
                        onClick={() => setAll(true)}
                    >
                        Tout
                    </div>
                    <div
                        className={`tab ${!all ? "active-form" : ""}`}
                        onClick={() => setAll(false)}
                    >
                        Non lu (15)
                    </div>
                </div>
                <div className='items'>
                    {Array(20)
                        .fill(0)
                        .map(() => {
                            return <NotificationItem />;
                        })}
                </div>
            </div>
        </div>
    );
}
