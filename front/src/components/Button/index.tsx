import React from "react";
import "./style.css";
import SVGIcon from "../../components/SVGIcon";

export default function Button(props: ButtonProps) {
    const { style, text, iconName, iconWidth, iconHeight, iconColor, onClick } =
        props;
    return (
        <button className='button-component' style={style} onClick={onClick}>
            {iconName && (
                <SVGIcon
                    type={iconName}
                    color={iconColor}
                    width={iconWidth}
                    height={iconHeight}
                />
            )}
            {text && <span>{text}</span>}
        </button>
    );
}
interface ButtonProps {
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    text?: any;
    iconName?: string;
    iconWidth?: number;
    iconHeight?: number;
    iconColor?: string;
}
