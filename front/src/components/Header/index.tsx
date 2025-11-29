import * as React from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { ReactComponent as NotificationSVG } from "../../icons/notification.svg";
import { ReactComponent as DropDownSVG } from "../../icons/drop-down-arrow.svg";

import DropDown from "../dropdown";
import SVGIcon from "../SVGIcon";
import NotificationCard from "../NotificationCard";
import ProfilePicture from "../ProfilePicture";
import { useAuth } from "../../hooks/useAuth";
import { ROUTER } from "../../constants/env";
// import { useNotifications } from "../../hooks/useNotifications";

export default function Header(props: any) {
    const location = useLocation();
    // const { toggleFullscreen } = props;
    const { auth, handleLogout } = useAuth();
    const items = [
        // {
        //     label: "Profile",
        //     icon: (
        //         <div
        //             style={{
        //                 width: "25px",
        //                 height: "25px",
        //             }}
        //         >
        //             <ProfilePicture
        //                 src={
        //                     "https://www.nicepng.com/png/detail/353-3533165_young-doctor-transpare-young-doctor.png"
        //                 }
        //                 alt={
        //                     auth.user
        //                         ? auth.user.firstName.slice(0, 1) +
        //                           auth.user.lastName.slice(0, 1)
        //                         : ""
        //                 }
        //                 color='white'
        //                 bgColor='var(--color-1)'
        //                 size='70%'
        //             />
        //         </div>
        //     ),
        //     link: ROUTER.PROFILE,
        // },
        {
            label: "Paramètres",
            icon: (
                <SVGIcon
                    type="settings"
                    color="var(--color-1)"
                    width={25}
                    height={25}
                />
            ),
            link: ROUTER.SETTINGS,
        },
        {
            label: "Se déconnecter",
            icon: (
                <SVGIcon
                    type="logout"
                    color="var(--color-1)"
                    width={25}
                    height={25}
                />
            ),
            onClick: handleLogout,
        },
    ];
    const itemStyle = {};
    const iconStyle = {};

    const labelStyle = {
        color: "var(--color-1)",
    };
    // const {
    //     // notifications,
    //     // getNotifications,
    //     // setNotificationClicked,
    //     // setAllNotificationsSeen,
    // } = useNotifications();
    React.useEffect(() => {
        // getNotifications();
    }, []);
    const [isNotifOpen, setIsNotifOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const dropDownRef = React.useRef<HTMLDivElement>(null);
    const notifRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target as Node)
            ) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // function goFullscreen(): void {
    //     const elem = document.documentElement;
    //     if (document.fullscreenElement) {
    //         document.exitFullscreen();
    //     } else if (elem.requestFullscreen) {
    //         elem.requestFullscreen();
    //     }
    // }
    function goFullscreen(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    }
    function isFullscreen(): boolean {
        return !!document.fullscreenElement;
    }
    const [isFullScreen, setIsFullScreen] =
        React.useState<boolean>(isFullscreen());

    // const handleToggleFullscreen = () => {
    //     goFullscreen();
    // };

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(isFullscreen());
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, []);
    // const isFullScreen = isFullscreen();
    return (
        <div className="header">
            <button
                className="notif-icon center"
                onClick={goFullscreen}
                style={{
                    position: "relative",
                }}
            >
                <SVGIcon
                    type={isFullScreen ? "mini" : "maxi"}
                    height={25}
                    width={25}
                    color="white"
                />
                <div
                    style={{
                        position: "absolute",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "x-small",
                        backgroundColor: "var(--warning-color)",
                        padding: "2px",
                        borderRadius: "3px",
                        top: "-5%",
                        left: "-40%",
                    }}
                >
                    New
                </div>
            </button>
            <div
                className="notif-icon center"
                onClick={() =>
                    setIsNotifOpen((prev) => {
                        if (location.pathname === ROUTER.NOTIFICATIONS)
                            return prev;
                        else return !prev;
                    })
                }
                style={{
                    backgroundColor:
                        isNotifOpen ||
                        location.pathname === ROUTER.NOTIFICATIONS
                            ? "rgba(255, 255, 255, 0.2)"
                            : "",
                }}
            >
                <div
                    style={{
                        position: "relative",
                    }}
                    ref={notifRef}
                >
                    {/* <div
                        style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            transform: "translate(30%,-40%)",
                            backgroundColor: "#fa3e3e",
                            padding: "2px 3px",
                            borderRadius: "var(--main-rd)",
                            color: "white",
                        }}
                    >
                        +9
                    </div> */}
                    <NotificationSVG />
                </div>
                {isNotifOpen && location.pathname !== ROUTER.NOTIFICATIONS && (
                    <NotificationCard />
                    //data={notifications.data} />
                )}
            </div>
            <div
                className="user-profile-wrapper center"
                ref={dropDownRef}
                onClick={() => {
                    setIsProfileOpen((prev) => !prev);
                }}
                style={{
                    backgroundColor: isProfileOpen
                        ? "rgba(255, 255, 255, 0.2)"
                        : "",
                }}
            >
                <div className="image center">
                    <ProfilePicture
                        src={
                            "https://www.nicepng.com/png/detail/353-3533165_young-doctor-transpare-young-doctor.png"
                        }
                        alt={
                            auth.user
                                ? auth.user?.firstName?.slice(0, 1) +
                                  auth.user?.lastName?.slice(0, 1)
                                : ""
                        }
                        color="var(--color-1)"
                        bgColor="white"
                        size="90%"
                    />
                </div>
                <div className="username">
                    <span>Bonjour,</span> Dr.
                    {auth.user?.firstName + " " + auth.user?.lastName}
                </div>
                <div className="dropdown-icon center">
                    <DropDownSVG />
                    {isProfileOpen && (
                        <DropDown
                            items={items}
                            itemStyle={itemStyle}
                            iconStyle={iconStyle}
                            labelStyle={labelStyle}
                            onBtnClick={() => setIsProfileOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// interface headerProps {
//     msg: string;
// }

Header.defaultProps = {
    msg: "Header",
};
