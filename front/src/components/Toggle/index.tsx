/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
// import classnames from "classnames";

import "./style.css";

export default function ToggleButton(props: ToggleButtonProps) {
    const { isChecked, onClick, isDisabled } = props;
    const [isCheckedState, setIsCheckedState] = React.useState(isChecked);
    const handleOnClick = (e: any) => {
        setIsCheckedState(!isCheckedState);
        onClick?.(e);
    };
    React.useEffect(() => {
        setIsCheckedState(isChecked);
    }, [isChecked]);

    return (
        <label className='switch'>
            <input
                type='checkbox'
                onChange={handleOnClick}
                checked={isCheckedState}
                disabled={isDisabled}
            />
            <span className='slider round'></span>
        </label>
    );
}

interface ToggleButtonProps {
    isChecked?: boolean;
    isDisabled?: boolean;
    onClick?: React.MouseEventHandler;
}

ToggleButton.defaultProps = {
    isChecked: false,
    isDisabled: false,
    onClick: Function,
};
