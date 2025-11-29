/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";
import { usePagination } from "./usePagination";
import {
    updateAppointments,
    updateAppointmentsFilters,
    updateCreateAppointment,
    updateEditAppointment,
    updateDeleteAppointment,
    resetFilters,
    updateCalendar,
    updatePatientAppointments,
    resetPatientAppointments,
    updateFactOfApp,
    updateService,
} from "../redux/features/appointments/appointmentsSlice";
export const useAppointments = () => {
    const dispatch = useAppDispatch();
    const appointments = useAppSelector((state: any) => state.appointments);
    const { setPagination, currentPageNumber, itemsPerPage } = usePagination();

    const handleAddAppointment = async (appointment: any) => {
        try {
            updateCreateAppointment({
                loading: true,
            });
            const response = await fetch(API.appointments.add, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(appointment),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateCreateAppointment({
                        error: null,
                        message: "ok",
                        loading: false,
                    }),
                );

                return true;
            } else {
                dispatch(
                    updateCreateAppointment({
                        error: data.error,
                        loading: false,
                    }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateCreateAppointment({ error, loading: false }));
            return false;
        }
    };
    const handleAddService = async (service: any) => {
        try {
            const response = await fetch(API.service.createService, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(service),
            });
            let data = await response.json();
            if (response.ok) {
                dispatch(updateService({ error: null }));

                return data;
            } else {
                dispatch(updateService({ error: " error .." }));
                return false;
            }
        } catch (error) {
            dispatch(updateService({ error }));
            return false;
        }
    };
    const handleAddAppointmentService = async (appointmentService: any) => {
        try {
            const response = await fetch(API.service.createAppointmentService, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(appointmentService),
            });
            let data = await response.json();
            if (response.ok) {
                dispatch(updateService({ error: null }));

                return true;
            } else {
                dispatch(updateService({ error: " error . ." }));
                return false;
            }
        } catch (error) {
            dispatch(updateService({ error }));
            return false;
        }
    };
    const handleGetServices = async () => {
        try {
            const response = await fetch(API.service.getServices, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            let data = await response.json();
            if (response.ok) {
                dispatch(updateService({ data }));

                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleGetAppointmentServices = async (appointmentID: any) => {
        try {
            const response = await fetch(
                API.service.getAppointmentServices(appointmentID),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );
            let data = await response.json();
            if (response.ok) {
                dispatch(updateService({ appServices: data }));

                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleUpdateAppointment = async (
        newData: any,
        appointmentID: string,
        factureAction?: string,
    ) => {
        let url = API.appointments.update(appointmentID);
        if (factureAction) {
            url = url + `?factureAction=${factureAction}`;
        }
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateEditAppointment({
                        error: null,
                        message: "ok",
                        loading: false,
                    }),
                );
                await handleGetAppointment(appointmentID);
                await handleGetAppointments();
                return { data };
            } else {
                dispatch(
                    updateEditAppointment({
                        error: data.error,
                        loading: false,
                    }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateEditAppointment({ error, loading: false }));
            return false;
        }
    };
    const handleDeleteAppointment = async (appointmentID: string) => {
        try {
            const response = await fetch(
                API.appointments.delete(appointmentID),
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem(
                            "token",
                        )}`,
                    },
                },
            );
            const data = await response.json();
            if (response.ok) {
                dispatch(
                    updateDeleteAppointment({
                        error: null,
                        message: "ok",
                        loading: false,
                    }),
                );
                await handleGetAppointments();
                // dispatch(updateAppointments({ addOne: data }));
                return true;
            } else {
                dispatch(
                    updateDeleteAppointment({
                        error: data.error,
                        loading: false,
                    }),
                );
                return false;
            }
        } catch (error) {
            dispatch(updateDeleteAppointment({ error, loading: false }));
            return false;
        }
    };
    const handleGetAppointment = async (appointmentID: string) => {
        try {
            const response = await fetch(
                API.appointments.getById(appointmentID),
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
            const data = await response.json();
            if (response.ok) {
                dispatch(updateAppointments({ appointment: data }));
            }
        } catch (e: any) {
            console.log("error");
        }
    };
    const handleGetFactureOfAppointment = async (factureID: any) => {
        try {
            const response = await fetch(
                API.invoices.getInvoiceByID(factureID),
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
            const data = await response.json();
            if (response.ok) {
                dispatch(updateFactOfApp(data));
            }
        } catch (e: any) {
            console.log("error");
        }
    };

    const handleGetAppointments = async () => {
        let filters = { ...appointments.filterBy };
        if (currentPageNumber) {
            filters.currentPageNumber = currentPageNumber;
        }
        if (itemsPerPage) {
            filters.itemsPerPage = itemsPerPage;
        }
        const paramsString = Object.entries(filters)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => {
                if (key === "status") {
                    return (value as string[])
                        .map((val: string) => `${key}=${val}`)
                        .join("&");
                }
                return `${key}=${value}`;
            })
            .join("&");
        let url = API.appointments.get;
        if (paramsString.length > 0) {
            url += "?" + paramsString;
        }

        try {
            dispatch(updateAppointments({ loading: true }));
            const response = await fetch(url, {
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
                dispatch(updateAppointments({ data, message: "" }));
            } else {
                dispatch(updateAppointments({ error: data.error }));
            }
            dispatch(updateAppointments({ loading: false }));
        } catch (error) {
            dispatch(updateAppointments({ error, loading: false }));
        }
    };
    const handleGetPatientAppointments = async () => {
        const paramsString = Object.entries({
            ...appointments.patientAppointments.filterBy,
        })
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => {
                if (key === "status") {
                    return (value as string[])
                        .map((val: string) => `${key}=${val}`)
                        .join("&");
                }
                return `${key}=${value}`;
            })
            .join("&");
        let url = API.appointments.get;
        if (paramsString.length > 0) {
            url += "?" + paramsString;
        }

        try {
            dispatch(updatePatientAppointments({ loading: true }));
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updatePatientAppointments({ data, message: "" }));
            } else {
                dispatch(updatePatientAppointments({ error: data.error }));
            }
            dispatch(updatePatientAppointments({ loading: false }));
        } catch (error) {
            dispatch(updatePatientAppointments({ error, loading: false }));
        }
    };
    const handleGetCalendarData = async (startDay: string, endDay: string) => {
        let url =
            API.appointments.get + `?startDay=${startDay}&endDay=${endDay}`;
        try {
            dispatch(updateCalendar({ loading: true }));
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateCalendar({ data: data.data }));
            } else {
                // dispatch(updateAppointments({ error: data.error }));
            }
            dispatch(updateCalendar({ loading: false }));
        } catch (error) {
            // dispatch(updateAppointments({ error, loading: false }));
        }
        dispatch(updateCalendar({ loading: false }));
    };
    const handleSetCalendarFilter = (filters: any) => {
        dispatch(updateCalendar({ filters }));
    };
    const handleChangeAppointmentsFilters = (filters: any) => {
        dispatch(updateAppointmentsFilters(filters));
    };
    const handleChangePatientAppointmentsFilters = (filters: any) => {
        dispatch(updatePatientAppointments({ filterBy: filters }));
    };
    const resetErrors = () => {
        dispatch(updateAppointments({ error: null }));
        dispatch(updateCreateAppointment({ error: null }));
        dispatch(updateEditAppointment({ error: null }));
        dispatch(updateDeleteAppointment({ error: null }));
    };
    const resetAppointments = () => {
        dispatch(resetFilters());
    };
    const clearPatientAppointments = () => {
        dispatch(resetPatientAppointments());
    };

    const handleUpdateAppointmentService = async (
        newData: any,
        appointmentServiceID: any,
    ) => {
        try {
            const response = await fetch(
                API.service.updateAppointmentService(appointmentServiceID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(newData),
                },
            );
            let data = await response.json();
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleDeleteAppointmentService = async (
        appointmentServiceID: any,
    ) => {
        console.log(" yess delete");
        try {
            const response = await fetch(
                API.service.deleteAppointmentService(appointmentServiceID),
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                },
            );
            let data = await response.json();
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    return {
        appointments,
        appointment: appointments.appointment,
        patientAppointments: appointments.patientAppointments,
        facture: appointments.factOfApp,
        services: appointments.services.data,
        appServices: appointments.services.appServices,
        handleAddAppointment,
        handleUpdateAppointment,
        handleDeleteAppointment,
        handleGetAppointments,
        handleGetPatientAppointments,
        handleGetCalendarData,
        handleGetAppointment,
        handleGetFactureOfAppointment,
        handleChangeAppointmentsFilters,
        handleChangePatientAppointmentsFilters,
        clearPatientAppointments,
        resetErrors,
        resetAppointments,
        handleSetCalendarFilter,
        handleAddService,
        handleAddAppointmentService,
        handleGetAppointmentServices,
        handleGetServices,
        handleUpdateAppointmentService,
        handleDeleteAppointmentService,
    };
};
