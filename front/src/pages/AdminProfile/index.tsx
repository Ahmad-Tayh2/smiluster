import React from "react";
import "./style.css";
import img from "./doctor.jpg";
import SVGIcon from "../../components/SVGIcon";
import { useAuth } from "../../hooks/useAuth";
export default function AdminProfile() {
    const { user } = useAuth();
    return (
        <div className='admin-profile-page'>
            <div
                className='main-box'
                style={{
                    padding: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "var(--main-gap)",
                        // alignItems: "center",
                    }}
                >
                    <div
                        className='photo-container'
                        style={{
                            height: "400px",
                            width: "fit-content",
                            backgroundColor: "red",
                            borderRadius: "var(--main-rd)",
                            overflow: "hidden",
                            border: "2px solid var(--color-1)",
                            position: "relative",
                        }}
                    >
                        <img
                            src={img}
                            alt=''
                            style={{
                                height: "100%",
                            }}
                        />
                        <div
                            className='add-photo-stripe center'
                            style={{
                                position: "absolute",
                                backgroundImage:
                                    "linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.05))",
                                // height: "70px",
                                padding: "var(--pd-2)",
                                height: "70px",
                                width: "100%",
                                left: "0",
                            }}
                        >
                            <SVGIcon
                                type='camera'
                                height={40}
                                width={40}
                                color='white'
                            />
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                color: "var(--color-1)",
                                fontSize: "large",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--gray-1)",
                                }}
                            >
                                Nom:
                            </span>{" "}
                            {user.lastName}
                        </div>
                        <div
                            style={{
                                color: "var(--color-1)",
                                fontSize: "large",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--gray-1)",
                                }}
                            >
                                Prénon:
                            </span>{" "}
                            {user.firstName}
                        </div>
                        <div
                            style={{
                                color: "var(--color-1)",
                                fontSize: "large",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--gray-1)",
                                }}
                            >
                                Role:
                            </span>{" "}
                            {user.role}
                        </div>
                        <div
                            style={{
                                color: "var(--color-1)",
                                fontSize: "large",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--gray-1)",
                                }}
                            >
                                Email:
                            </span>{" "}
                            {user.email}
                        </div>
                        <div
                            style={{
                                color: "var(--color-1)",
                                fontSize: "large",
                                fontWeight: "bold",
                                margin: "10px",
                            }}
                        >
                            <span
                                style={{
                                    color: "var(--gray-1)",
                                }}
                            >
                                Téléphone:
                            </span>{" "}
                            {user.phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
