/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";

import {
    updateDocuments,
    updateCreateDocument,
    updateEditDocument,
    updateDeleteDocument,
} from "../redux/features/documents/documentsSlice";
export const useDocuments = () => {
    const dispatch = useAppDispatch();
    const documents = useAppSelector((state: any) => state.documents);
    const patient = useAppSelector((state: any) => state.patients.patient);
    const handleAddDocument = async (newDocumentData: any) => {
        try {
            const formData = new FormData();
            const { file, fileName, patientID, appointmentID } =
                newDocumentData;
            if (patientID || patient.data.patientID) {
                formData.append(
                    "patientID",
                    patientID || patient.data.patientID,
                );
            }
            if (appointmentID) {
                formData.append("appointmentId", appointmentID);
            }
            if (file) {
                formData.append("files", file);
            }
            if (fileName) {
                formData.append("fileName", fileName);
            }
            const response = await fetch(API.documents.add, {
                method: "POST",
                body: formData,
                headers: {
                    // "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateCreateDocument({
                        error: null,
                        message: "ok",
                        loading: false,
                    }),
                );
                // handleGetDocuments(patientID || patient.data.patientID);
                return true;
            } else {
                dispatch(
                    updateCreateDocument({
                        error: data.error,
                        loading: false,
                    }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateCreateDocument({ error, loading: false }));
            return false;
        }
    };
    const handlEditDocument = async (newDocumentData: any) => {
        try {
            const { docID, fileName, patientID } = newDocumentData;
            const response = await fetch(API.documents.update(docID), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ fileName, patientID }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateEditDocument({
                        error: null,
                        message: "ok",
                        loading: false,
                    }),
                );
                return true;
            } else {
                dispatch(
                    updateEditDocument({
                        error: data.error,
                        loading: false,
                    }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateEditDocument({ error, loading: false }));
            return false;
        }
    };
    const handleDeleteDocument = async (docID: any) => {
        try {
            dispatch(updateDeleteDocument({ loading: true }));

            const response = await fetch(API.documents.delete(docID), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateDeleteDocument({ error: null, loading: false }));
                return true;
            } else {
                dispatch(
                    updateDeleteDocument({ error: data.error, loading: false }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateDeleteDocument({ error, loading: false }));
            return false;
        }
    };
    const handleDownloadDocument = async (docData: any) => {
        try {
            // dispatch(updateDeleteDocument({ loading: true }));
            const filename = docData.url.split("/").pop();
            const response: any = await fetch(
                API.documents.download(filename),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            // const data = await response.json();
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                // Open the PDF URL in a new tab
                window.open(url, "_blank");
                // const link = document.createElement("a");

                // link.href = url;
                // link.setAttribute("download", filename);

                // document.body.appendChild(link);
                // link.click();
                // // Cleanup
                // link.parentNode?.removeChild(link);
                // window.URL.revokeObjectURL(url);
                // dispatch(updateDeleteDocument({ error: null, loading: false }));
                return true;
            } else {
                // dispatch(
                //     updateDeleteDocument({ error: data.error, loading: false })
                // );
                return false;
            }
        } catch (error) {
            // dispatch(updateDeleteDocument({ error, loading: false }));
            return false;
        }
    };
    const handleGetDocuments = async (patientID?: any) => {
        // const paramsString = Object.entries({ ...documents.filterBy })
        //     .filter(([key, value]) => value !== undefined)
        //     .map(([key, value]) => {
        //         if (key === "status") {
        //             return (value as string[])
        //                 .map((val: string) => `${key}=${val}`)
        //                 .join("&");
        //         }
        //         return `${key}=${value}`;
        //     })
        //     .join("&");
        const url = API.documents.get(patient?.data?.patientID || patientID);
        // if (paramsString.length > 0) {
        //     url += "?" + paramsString;
        // }
        console.log(" ggooooooooo ");
        try {
            dispatch(updateDocuments({ loading: true }));
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateDocuments({ data, message: "" }));
            } else {
                dispatch(updateDocuments({ error: data.error }));
            }
            dispatch(updateDocuments({ loading: false }));
        } catch (error) {
            dispatch(updateDocuments({ error, loading: false }));
        }
    };
    const resetError = () => {
        dispatch(updateDocuments({ error: null }));
        dispatch(updateCreateDocument({ error: null }));
        dispatch(updateEditDocument({ error: null }));
        dispatch(updateDeleteDocument({ error: null }));
    };
    return {
        documents,
        handleGetDocuments,
        handleAddDocument,
        handlEditDocument,
        handleDownloadDocument,
        handleDeleteDocument,
        resetError,
    };
};
