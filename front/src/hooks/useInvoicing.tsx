/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API } from "../constants/env";
import {
    setAllInvoices,
    setSelectedInvoice,
    updateFilter,
    resetFilters,
    setPatientInvoices,
    setPatientFiltersInvoices,
    setInvoiceDetails,
} from "../redux/features/invoicing/invoicingSlice";
import { FiltersBy } from "../redux/features/invoicing/type";
import { usePagination } from "./usePagination";
import { setLogin } from "../redux/features/auth/authSlice";

export const useInvoicing = () => {
    const dispatch = useAppDispatch();
    const { setPagination, currentPageNumber, itemsPerPage } = usePagination();
    const invoicing = useAppSelector((state: any) => state.invoicing);

    const getAllInvoices = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const filters = { ...invoicing.filtersBy };
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
                dispatch(setAllInvoices({ loading: true }));
                const response = await fetch(
                    API.invoices.getAll + queryString,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();
                if (response.ok) {
                    setPagination({
                        totalItemsCount:
                            data.paginationMetaData.totalItemsCount,
                        totalPagesCount:
                            data.paginationMetaData.totalPagesCount,
                        // currentPageNumber:
                        //     data.paginationMetaData.currentPageNumber,
                    });
                    dispatch(setAllInvoices({ data }));
                } else {
                    console.log("Error", response);
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
        dispatch(setAllInvoices({ loading: false }));
    };
    const getInvoiceByID = async (invoiceID: string) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch(
                    API.invoices.getInvoiceByID(invoiceID),
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                    },
                ).then((res) => res.json());
                if (response.error) {
                    throw new Error(response.error);
                }
                dispatch(setInvoiceDetails({ invoice: response }));
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    const getPatientInvoices = async (patientID: any) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch(
                    API.invoices.getAll + `?patientID=${patientID}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();
                if (response.ok) {
                    dispatch(setPatientInvoices({ data }));
                } else {
                    console.log("Error", response);
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
        dispatch(setAllInvoices({ loading: false }));
    };
    const setFilter = (filter: FiltersBy) => {
        dispatch(updateFilter(filter));
    };
    const setPatientsBillFilter = (filter: FiltersBy) => {
        dispatch(setPatientFiltersInvoices(filter));
    };

    const selectInvoice = (invoiceID: string) => {
        dispatch(setSelectedInvoice({ invoiceID }));
    };
    const createNewPayment = async (paymentAmount: string) => {
        const token = localStorage.getItem("token");
        if (
            token &&
            invoicing?.invoice?.id &&
            parseInt(paymentAmount, 10) > 0
        ) {
            const payload = {
                factureID: invoicing?.invoice?.id,
                paymentAmount,
            };
            const response = await fetch(API.payment.createPayment, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("");
            } else {
                alert("error");
                dispatch(setLogin({ error: data.error }));
            }
        }
    };
    const handleAddNewPayment = async ({
        factureID,
        payed,
        paymentDate,
        appointmentID = null,
    }: any) => {
        try {
            const response = await fetch(API.invoices.addPayment, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    factureID,
                    appointmentID,
                    paymentAmount: payed,
                    paymentDate,
                }),
            });
            // const data = await response.json();
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const handleUpdatePayment = async (data: any, paymentID: any) => {
        try {
            const response = await fetch(API.payment.updatePayment(paymentID), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });
            // const data = await response.json();
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const resetInvoicingFilters = () => {
        dispatch(resetFilters());
    };
    const updateInvoiceCostAppointment = async (
        appointmentID: any,
        cost: any,
    ) => {
        try {
            const response = await fetch(
                API.appointments.update(appointmentID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ cost }),
                },
            ).then((res) => res.json());
            console.log("response>>", response);
            if (response) {
                await getInvoiceByID(invoicing.invoice.id);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const updateInvoiceToothActCostAppointment = async (
        toothActID: any,
        customCost: any,
    ) => {
        try {
            const response = await fetch(
                API.chart.toothAct.update(toothActID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ customCost }),
                },
            ).then((res) => res.json());
            console.log("response>>", response);
            if (response) {
                await getInvoiceByID(invoicing.invoice.id);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const updateInvoiceServiceCostAppointment = async (
        appserviceID: any,
        cost: any,
    ) => {
        try {
            const response = await fetch(
                API.service.updateAppointmentService(appserviceID),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ customCost: cost }),
                },
            ).then((res) => res.json());
            console.log("response>>", response);
            if (response) {
                await getInvoiceByID(invoicing.invoice.id);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    const updateInvoicePayment = async (paymentID: any, paymentAmount: any) => {
        try {
            const response = await fetch(API.payment.updatePayment(paymentID), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    paymentAmount,
                    factureID: invoicing.invoice.id,
                }),
            }).then((res) => res.json());
            console.log("response>>", response);
            if (response) {
                await getInvoiceByID(invoicing.invoice.id);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };
    return {
        invoicing,
        getAllInvoices,
        setFilter,
        handleAddNewPayment,
        handleUpdatePayment,
        createNewPayment,
        getInvoiceByID,
        selectInvoice,
        resetInvoicingFilters,
        setPatientsBillFilter,
        getPatientInvoices,

        updateInvoiceCostAppointment,
        updateInvoiceToothActCostAppointment,
        updateInvoiceServiceCostAppointment,
        updateInvoicePayment,
    };
};
