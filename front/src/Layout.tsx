import * as React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./Layout.css";
import { useAuth } from "./hooks/useAuth";
import { PulseLoader } from "react-spinners";

export default function Layout({ children }: LayoutProps) {
    const [shape, setShape] = React.useState(
        localStorage.getItem("shape") || "1",
    );
    React.useEffect(() => {
        localStorage.setItem("shape", shape);
    }, [shape]);
    const { auth } = useAuth();
    const toggleShape = () => {
        setShape((prevShape) => (prevShape === "1" ? "0" : "1"));
    };
    const [load, setLoad] = React.useState<boolean>(true);
    React.useEffect(() => {
        setLoad(true);
        const timeout = setTimeout(() => {
            setLoad(false);
        }, 1500);
        return () => clearTimeout(timeout);
    }, []);
    if (auth.login.loading || load)
        return (
            <div
                className="center"
                style={{
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "var(--color-1)",
                    flexDirection: "column",
                    gap: "50px",
                }}
            >
                {/* <img
                    src={logo}
                    alt='SMILUSTER'
                    style={{
                        width: "250px",
                        marginTop: "20px",
                    }}
                /> */}
                {/* <img
                    src={toothLogo}
                    alt='SM'
                    style={{
                        width: "100px",

                        marginTop: "20px",
                    }}
                /> */}
                <PulseLoader
                    color={"white"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    // const FullscreenButton = () => {
    // const elementRef = React.useRef<any>(null);

    // const toggleFullscreen = () => {
    //     if (document.fullscreenElement) {
    //         document.exitFullscreen();
    //     } else if (elementRef?.current) {
    //         elementRef?.current?.requestFullscreen();
    //     }
    // };

    //     return (
    //         <button ref={elementRef} onClick={toggleFullscreen}>
    //             Fullscreen
    //         </button>
    //     );
    // };
    return (
        <div className="layout">
            <Sidebar shape={Number(shape)} toggleShape={toggleShape} />
            <div className="layout-content">
                <Header />
                <main className="container">{children}</main>
            </div>
        </div>
    );
}
interface LayoutProps {
    children: React.ReactNode;
}
