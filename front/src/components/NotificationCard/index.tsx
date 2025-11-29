/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import NotificationItem from "../../components/NotificationItem";
import ComingSoon from "../../components/ComingSoon";

export default function NotificationCard() {
    return (
        <div
            className='notifications-card-container'
            onClick={(e) => e.stopPropagation()}
        >
            <ComingSoon />
            <div className='notif-head'>
                <div className='title'>Notifications</div>
            </div>
            <div className='notif-body'>
                {Array(20)
                    .fill(0)
                    .map((_: any, index: any) => {
                        return <NotificationItem type='small' key={index} />;
                    })}
            </div>
            <div className='notif-foot'>
                <Link to='/notifications'>Toutes les notifications</Link>
            </div>
        </div>
    );
}
