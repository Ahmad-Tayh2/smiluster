import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import SVGIcon from "../SVGIcon";
import "./style.css";
import { useDocuments } from "../../hooks/useDocuments";
export default function AddDocumentCard(props: AddInvoicingCardProps) {
    const { display, onClose, toEdit, setToEdit, appointmentID, patientID } =
        props;
    const {
        documents,
        handleAddDocument,
        handleGetDocuments,
        handlEditDocument,
        resetError,
    } = useDocuments();
    const [newDocument, setNewDocument] = React.useState<any>({
        file: "",
        fileName: "",
        appointmentID: null,
        patientID: null,
    });
    React.useEffect(() => {
        setNewDocument((prev: any) => ({
            ...prev,
            appointmentID,
            patientID,
        }));
    }, [appointmentID, patientID]);
    React.useEffect(() => {
        if (toEdit) {
            setNewDocument({ ...toEdit });
        }
    }, [toEdit]);
    const handleSubmitDocument = async () => {
        if (newDocument) {
            let ok = false;

            if (toEdit) {
                ok = await handlEditDocument(newDocument);
            } else {
                ok = await handleAddDocument(newDocument);
            }
            if (ok) {
                await handleGetDocuments(patientID);
                handleClose();
            }
        }
    };
    const handleChangeFile = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setNewDocument((prev: any) => ({
                ...prev,
                file: e.target.files[0],
            }));
        }
    };
    const handleClose = () => {
        onClose && onClose();
        setNewDocument({
            file: "",
            fileName: "",
            appointmentID,
            patientID,
        });
        setToEdit(null);
        resetError();
    };
    const buttons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: handleClose,
        },
        {
            text: toEdit ? "Modifier" : "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: handleSubmitDocument,
        },
    ];
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={`${toEdit ? "Modifier le" : "Ajouter un"} document`}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={buttons}
            >
                <div className="add-document-card-container">
                    <div className="title">
                        <label htmlFor="">
                            Titre du document
                            <Star />
                        </label>
                        <input
                            type="text"
                            placeholder="Nom du document"
                            value={newDocument.fileName}
                            onChange={(e) =>
                                setNewDocument((prev: any) => ({
                                    ...prev,
                                    fileName: e.target.value,
                                }))
                            }
                        />
                    </div>
                    {!toEdit ? (
                        <div className="document">
                            <label htmlFor="file">
                                <SVGIcon type="upload2" color="inherit" />
                                Importer un fichier
                            </label>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                // value={newDocument.file}
                                onChange={handleChangeFile}
                            />
                        </div>
                    ) : (
                        <div className="document">
                            {toEdit.url.split("/").pop()}
                        </div>
                    )}

                    {documents.create.error /* && !toEdit*/ ? (
                        <div className="form-error">
                            {documents.create.error}
                        </div>
                    ) : (
                        documents.edit.error && (
                            /* toEdit &&*/ <div className="form-error">
                                {documents.edit.error}
                            </div>
                        )
                    )}
                </div>
            </PopupCard>
        </Modal>
    );
}
const Star = () => {
    return (
        <span
            style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "medium",
                padding: "0 2px",
            }}
        >
            *
        </span>
    );
};
interface AddInvoicingCardProps {
    display: boolean;
    onClose?: () => void;
    toEdit?: any;
    setToEdit?: any;
    appointmentID?: any;
    patientID?: any;
}
