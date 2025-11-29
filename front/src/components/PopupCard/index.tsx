import React from "react";
import "./style.css";
import { ReactComponent as CloseSVG } from "../../icons/close.svg";

export default function PopupCard(props: PopupCardProps) {
    const {
        display,
        children,
        title,
        activatedFooter,
        activatedHeader,
        onClose,
        buttons,
        style,
    } = props;
    const [showPopup, setshowPopup] = React.useState(true);
    React.useEffect(() => {
        setshowPopup(display ?? true);
    }, [display]);
    const handleClose = () => {
        if (display !== null) {
            setshowPopup(false);
        }
        onClose && onClose();
    };

    if (showPopup)
        return (
            <div className='popup-card-container'>
                {activatedHeader && (
                    <div className='head'>
                        <div className='title'>{title}</div>
                        <div className='close-ion' onClick={handleClose}>
                            <CloseSVG
                                color='var(--color-1)'
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                )}
                <div className='content' style={{ ...style }}>
                    {children}
                </div>
                {activatedFooter && (
                    <div className='foot'>
                        {buttons?.map((btn, key) => (
                            <button
                                key={key}
                                className='btn-1'
                                onClick={btn.onClick}
                                style={btn.style}
                                disabled={btn.disabled || false}
                            >
                                {btn.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    else return null;
}

interface PopupCardProps {
    display?: boolean;
    children?: React.ReactNode;
    title?: any;
    activatedFooter?: boolean;
    activatedHeader?: boolean;
    onClose?: () => void;
    buttons?: {
        text: any;
        style?: React.CSSProperties;
        disabled?: boolean;
        onClick?: () => void;
    }[];
    style?: React.CSSProperties;
}

PopupCard.defaultProps = {
    activatedFooter: false,
    activatedHeader: true,
    display: false,
};
