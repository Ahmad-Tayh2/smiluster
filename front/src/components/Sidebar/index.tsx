import * as React from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../constants/sidebarLinks";
import { ReactComponent as LeftArrowSVG } from "../../icons/left-arrows.svg";
import SVGIcon from "../SVGIcon";
import logo from "./logo.png";
import toothLogo from "./tooth-logo.png";
import { ROUTER } from "../../constants/env";
export default function Sidebar(props: SidebarProps) {
    const { shape, toggleShape } = props;
    const navigate = useNavigate();
    const navigateToHelpPage = () => {
        navigate(ROUTER.HELP);
    };
    return (
        <div
            className="sidebar"
            style={{
                minWidth: shape ? "210px" : "70px",
                width: shape ? "210px" : "70px",
                transition: "var(--main-transition)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "var(--gap-4)",
            }}
        >
            <div
                className="head center"
                style={{
                    position: "relative",
                }}
            >
                {shape ? (
                    <div
                        className="logo"
                        style={{
                            visibility: `${shape ? "visible" : "hidden"}`,
                            opacity: `${shape ? 1 : 0}`,
                            width: `${shape ? "90%" : "0%"}`,
                            height: "fit-content",
                            padding: "0 10px 10px 10px",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            marginTop: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        {/* SMILUSTER */}
                        <img
                            src={logo}
                            alt="SMILUSTER"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                        />
                    </div>
                ) : (
                    <div
                        // className='logo'
                        style={{
                            visibility: `${shape ? "hidden" : "visible"}`,
                            opacity: `${shape ? 0 : 1}`,
                            width: "85%",
                            maxWidth: "60px",
                            height: "fit-content",
                            padding: "0 8px 8px 8px",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            marginTop: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        {/* SMILUSTER */}
                        <img
                            src={toothLogo}
                            alt="SM"
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                        />
                    </div>
                )}
                <div
                    className="arrow"
                    style={{
                        transform: `rotate(${shape ? 0 : 180}deg)`,
                        position: "absolute",
                        left: "calc(100% + 8px)",
                        background: "var(--color-3)",
                        width: "fit-content",
                        height: "fit-content",
                        borderRadius: "var(--main-rd)",
                        padding: "5px",
                        cursor: "pointer",
                    }}
                    onClick={toggleShape}
                >
                    <LeftArrowSVG color={"var(--color-1)"} />
                </div>
            </div>
            <div className="tabs">
                {links.map(({ url, type, name }, id) => (
                    <NavLink key={id} to={url}>
                        <div className="nav-box">
                            <SVGIcon
                                type={type}
                                color={"white"}
                                height={32}
                                width={32}
                            />
                            <div
                                className={`element-to-hide ${
                                    shape ? "" : "hidden"
                                }`}
                            >
                                {name}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div
                style={{
                    color: "white",
                    marginTop: "auto",
                    padding: "var(--pd-2) 0",
                    fontWeight: "bold",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--gap-2)",
                }}
            >
                <div
                    className="center"
                    style={{
                        color: "var(--warning-color)",
                    }}
                >
                    <SVGIcon
                        type="help"
                        color="var(--warning-color)"
                        // style={{ fill: "white" }}
                        onClick={navigateToHelpPage}
                    />
                    <span
                        style={{
                            marginLeft: "5px",
                            cursor: "pointer",
                        }}
                        onClick={navigateToHelpPage}
                    >
                        {shape ? "Aide" : ""}
                    </span>
                </div>
                <div className="center">
                    <span
                        style={{
                            fontWeight: "normal",
                            fontSize: "14px",
                        }}
                    >
                        {shape ? "Version" : "V"}
                    </span>{" "}
                    1.0.0
                </div>
            </div>
        </div>
    );
}

interface SidebarProps {
    shape: number;
    toggleShape: () => void;
}

Sidebar.defaultProps = {
    shape: 0,
    toggleShape: () => {},
};
