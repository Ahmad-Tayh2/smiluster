/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function DropDown(props: any /* DropdownProps*/) {
    const { items, itemStyle, iconStyle, labelStyle, id, onBtnClick } = props;

    return (
        <ul className='dropdown-wrapper' onClick={(e) => e.stopPropagation()}>
            {items?.map((item: any, index: number) => (
                <Link to={item.link} key={index}>
                    <li
                        className='dropdown-item'
                        style={itemStyle}
                        onClick={() => {
                            item.onClick && item.onClick(id);
                            onBtnClick?.();
                        }}
                    >
                        {item.icon && (
                            <span className='icon' style={iconStyle}>
                                {item.icon}
                            </span>
                        )}
                        <span className='label' style={labelStyle}>
                            {item.label}
                        </span>
                    </li>
                </Link>
            ))}
        </ul>
    );
}

// interface DropdownItem {
//     label: string;
//     icon?: string;
//     link?: string;
//     onClick?: any;
// }

// interface DropdownProps {
//     items?: any;
//     itemStyle?: React.CSSProperties;
//     iconStyle?: React.CSSProperties;
//     labelStyle?: React.CSSProperties;
//     id?: string;
// }

DropDown.defaultProps = {
    items: [
        {
            label: "option 1 ",
        },
        {
            label: "option 2 ",
        },
    ],
};
