/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import SVGIcon from "../SVGIcon";
import "./style.css";
import { Document, Page } from "react-pdf";

// import { useDocuments } from "../../hooks/useDocuments";

export default function ViewDocumentCard(props: any) {
    const { display, onClose, file } = props;
    const [numPages] = React.useState(null);

    // const onDocumentLoadSuccess = ({ numPages }: any) => {
    //     setNumPages(numPages);
    // };
    const buttons = [
        {
            text: (
                <div
                    className='center'
                    style={{
                        gap: "3px",
                    }}
                >
                    <SVGIcon
                        type='download'
                        color='white'
                        height={25}
                        width={25}
                    />
                    Télécharger
                </div>
            ),

            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            // onClick: handleSubmitDocument,
        },
    ];
    const handleClose = () => {
        onClose && onClose();
    };
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={`Document: ${file?.fileName}`}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={buttons}
            >
                <div>
                    <Document
                        file={
                            "./otrok-athran-1708284753679.pdf"
                        } /*onLoadSuccess={onDocumentLoadSuccess}*/
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                            />
                        ))}
                    </Document>
                </div>
            </PopupCard>
        </Modal>
    );
}
// interface AddInvoicingCardProps {
//     display: boolean;
//     onClose?: () => void;
//     toEdit?: any;
//     setToEdit?: any;
// }
