/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import FileModel from "../FileModel";
import AddDocumentCard from "../AddDocumentCard";
import { useDocuments } from "../../hooks/useDocuments";
export default function Documents(props: any /*FileModelProps*/) {
    const { appointmentID, patientID } = props;
    const {
        documents,
        handleGetDocuments,
        // handleDeleteDocument,
        handleDownloadDocument,
    } = useDocuments();

    // const [fileToShow, setFileToShow] = React.useState(null);
    // const [openViewCard, setOpenViewCard] = React.useState(false);
    const [openedCard, setOpenedCard] = React.useState(false);
    const [toEdit, setToEdit] = React.useState(null);
    // const toggleOpenCard = () => {
    //     setOpenedCard((prev) => !prev);
    // };
    React.useEffect(() => {
        handleGetDocuments(patientID);
    }, []);
    const handleEditFile = (data: any) => {
        setToEdit(data);
        setOpenedCard(true);
    };

    const handleDownloadFile = (data: any) => {
        handleDownloadDocument(data);
    };
    const handleViewFile = () => {
        // setFileToShow(data);
        // setOpenViewCard(true);
    };
    return (
        <div className='files'>
            <FileModel
                content={"empty"}
                type='document'
                onClick={() => setOpenedCard(true)}
            />
            {documents?.data
                ?.filter((item: any) => {
                    if (appointmentID) {
                        return item.appointmentID === appointmentID;
                    } else return true;
                })
                ?.map((item: any, index: number) => (
                    <FileModel
                        key={index}
                        content={"filled"}
                        type='document'
                        data={item}
                        handleEditFile={handleEditFile}
                        // handleDeleteFile={handleDeleteFile}
                        handleDownloadFile={handleDownloadFile}
                        handleViewFile={handleViewFile}
                    />
                ))}

            <AddDocumentCard
                display={openedCard}
                onClose={() => setOpenedCard(false)}
                toEdit={toEdit}
                setToEdit={setToEdit}
                appointmentID={appointmentID}
                patientID={patientID}
            />

            {/* <ViewDocumentCard
                display={openViewCard}
                onClose={() => setOpenViewCard(false)}
                file={fileToShow}
            /> */}
        </div>
    );
}

// interface FileModelProps {}
