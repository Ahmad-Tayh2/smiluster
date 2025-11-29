/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";

import {
    updatePatients,
    updatePatient,
    resetfilter,
} from "../redux/features/patients/patientsSlice";
import { usePagination } from "./usePagination";
export const usePatients = () => {
    const dispatch = useAppDispatch();
    const { setPagination, currentPageNumber, itemsPerPage } = usePagination();
    const patients = useAppSelector((state: any) => state.patients);
    const handleAddPatient = async (patient: any) => {
        try {
            const licenseID = JSON.parse(
                sessionStorage.getItem("user") || ""
            )?.licenseID;
            // TODO: we can add validation here before send to the server
            if (licenseID) {
                await dispatch(updatePatient({ loading: true }));
                const response = await fetch(API.patients.add, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({ licenseId: licenseID, ...patient }),
                });
                const data = await response.json();
                if (response.ok) {
                    await dispatch(updatePatient({ data, message: "" }));
                } else {
                    await dispatch(updatePatient({ error: data.error }));
                }
                await dispatch(updatePatient({ loading: false }));
            } else {
                console.log("please provide a licenseID first");
            }
        } catch (error) {
            await dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleGetPatient = async (patientID: string) => {
        try {
            dispatch(updatePatient({ loading: true }));
            const response = await fetch(API.patients.getById(patientID), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updatePatient({ data, error: null }));
            } else {
                dispatch(updatePatient({ error: data.error }));
            }
            dispatch(updatePatient({ loading: false }));
        } catch (error) {
            dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleDeletePatient = async (patientID: string) => {
        try {
            dispatch(updatePatient({ loading: true }));
            const response = await fetch(API.patients.delete(patientID), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updatePatient({ data, message: "" }));
                return true;
            } else {
                dispatch(updatePatient({ error: data.error }));
            }
            dispatch(updatePatient({ loading: false }));
            return false;
        } catch (error) {
            dispatch(updatePatient({ error, loading: false }));
            return false;
        }
        return false;
    };
    const handleUpdatePatient = async (newData: any) => {
        try {
            dispatch(updatePatient({ loading: true }));
            const response = await fetch(
                API.patients.getById(newData.patientID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify(newData),
                }
            );
            const data = await response.json();
            if (response.ok) {
                dispatch(updatePatient({ data, message: "" }));
            } else {
                dispatch(updatePatient({ error: data.error }));
            }
            dispatch(updatePatient({ loading: false }));
        } catch (error) {
            dispatch(updatePatient({ error, loading: false }));
        }
    };
    const handleGetPatients = async () => {
        let filters = patients.list.filterBy;
        if (patients.list.filterBy.gender) {
            filters = {
                ...patients.list.filterBy,
                gender: patients.list.filterBy.gender?.value,
            };
        }
        if (patients.list.filterBy.sortBy) {
            filters = {
                ...patients.list.filterBy,
                sortBy: patients.list.filterBy.sortBy?.value,
            };
        }
        filters = { ...filters };
        if (currentPageNumber) {
            filters.currentPageNumber = currentPageNumber;
        }
        if (itemsPerPage) {
            filters.itemsPerPage = itemsPerPage;
        }
        const queryString =
            "?" +
            Object.entries(filters)
                .filter(([, value]) => value !== undefined)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
        try {
            dispatch(updatePatients({ loading: true }));
            const response = await fetch(API.patients.get + queryString, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPagination({
                    totalItemsCount: data.paginationMetaData.totalItemsCount,
                    totalPagesCount: data.paginationMetaData.totalPagesCount,
                    // currentPageNumber:
                    //     data.paginationMetaData.currentPageNumber,
                });
                dispatch(updatePatients({ data, message: "" }));
            } else {
                dispatch(updatePatients({ error: data.error }));
            }
            dispatch(updatePatients({ loading: false }));
        } catch (error) {
            dispatch(updatePatients({ error, loading: false }));
        }
    };
    const handleRemovePatientsErrors = () => {
        dispatch(updatePatients({ error: null }));
    };
    const handleSetFilter = (filter: any) => {
        dispatch(updatePatients({ filter }));
    };
    const resetPatientsFilter = () => {
        dispatch(resetfilter());
    };
    const handleResetPatient = () => {
        dispatch(updatePatient({ reset: true }));
    };
    return {
        patients,
        patient: patients.patient,
        handleAddPatient,
        handleGetPatient,
        handleDeletePatient,
        handleUpdatePatient,
        handleGetPatients,
        handleSetFilter,
        handleRemovePatientsErrors,
        resetPatientsFilter,
        handleResetPatient,
    };
};
