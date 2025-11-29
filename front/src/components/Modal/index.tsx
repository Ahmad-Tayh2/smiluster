import React from "react";
import "./style.css";
export default function Modal(props: ModalProps) {
    const { children, modalEnabled } = props;
    const [modalStatus, setModalStatus] = React.useState(modalEnabled);
    const handleClose = () => {
        // setModalStatus(false);
        // onClose && onClose();
    };
    React.useEffect(() => {
        if (modalEnabled !== null && modalEnabled !== undefined) {
            setModalStatus(modalEnabled);
        }
    }, [modalEnabled]);
    if (modalStatus === true) {
        return (
            <div
                className='modal-container'
                style={{
                    display: modalStatus ? "flex" : "none",
                }}
                onClick={handleClose}
            >
                <div
                    className='modal-content'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {children}
                </div>
            </div>
        );
    } else return null;
}

interface ModalProps {
    modalEnabled?: boolean;
    children: React.ReactNode;
    onClose?: () => void;
}
