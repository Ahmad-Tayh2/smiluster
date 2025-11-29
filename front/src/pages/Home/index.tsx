import * as React from "react";
// import DropDown from "../../components/dropdown";
// import SVGIcon from "../../components/SVGIcon";
import IMG from "./scr.png";
import ComingSoon from "../../components/ComingSoon";
export default function Home() {
    // const { msg } = props;
    return (
        <div>
            <div
                style={{
                    height: "calc(100vh - 100px)",
                    width: "100%",
                    borderRadius: "var(--main-rd)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <ComingSoon />
                <img
                    src={IMG}
                    alt=''
                    style={{
                        height: "110%",
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
}
