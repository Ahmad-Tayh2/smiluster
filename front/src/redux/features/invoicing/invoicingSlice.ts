/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { AppointmentState, Invoice } from "./type";
import { DateTime } from "luxon";
const initialState: AppointmentState = {
    list: [],
    filtersBy: {
        search: "",
        status: [],
        createdAt: "",
        patientID: undefined,
        itemsPerPage: 10,
        currentPageNumber: 1,
    },
    patientBills: {
        list: [],
        filtersBy: {
            search: "",
            status: [],
            createdAt: "",
            patientID: undefined,
            itemsPerPage: 10,
            currentPageNumber: 1,
        },
    },
    loading: false,
    // pagination: {
    //     itemsPerPage: undefined,
    //     currentPageNumber: undefined,
    //     totalPagesCount: undefined,
    //     totalItemsCount: undefined,
    // },
    invoice: null,
};
const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        setAllInvoices: (state, action) => {
            const { data } = action.payload;

            if (action.payload.loading !== undefined) {
                state.loading = action.payload.loading;
            }

            if (data !== undefined) {
                let list: Invoice[] = data.data.map((invoice: any) => {
                    const {
                        appointments,
                        payments,
                        patient,
                        createdAt,
                        factureID,
                        factureRef,
                        restAmount,
                        totalNeededAmount,
                        totalPaidAmount,
                    } = invoice;

                    let status = "impayed";
                    if (restAmount <= 0) {
                        status = "payed-status";
                    } else if (
                        totalPaidAmount < totalNeededAmount &&
                        totalPaidAmount > 0
                    ) {
                        status = "part-payed";
                    }

                    const appointmentDetails = appointments.map(
                        (appointment: any) => {
                            const {
                                appointmentDateTime,
                                appointmentID,
                                cost,
                                diagnostique,
                                note,
                                ordonnance,
                                status,
                                paidAmount,
                            } = appointment;
                            return {
                                type: "appointment",
                                id: appointmentID,
                                date: DateTime.fromISO(
                                    appointmentDateTime,
                                ).toFormat("dd/LL/yyyy"),
                                time: DateTime.fromISO(
                                    appointmentDateTime,
                                ).toFormat("HH:mm"),
                                status,
                                diagnostic: diagnostique,
                                prescription: ordonnance,
                                note,
                                cost,
                                paidAmount,
                            };
                        },
                    );
                    const paymentDetails = payments.map((payment: any) => {
                        const { paymentID, paymentAmount, paymentDate } =
                            payment;
                        return {
                            type: "payment",
                            id: paymentID,

                            date: DateTime.fromISO(paymentDate).toFormat(
                                "dd/LL/yyyy",
                            ),
                            time: DateTime.fromISO(paymentDate).toFormat(
                                "HH:mm",
                            ),
                            cost: paymentAmount,
                        };
                    });

                    const details = [
                        ...appointmentDetails,
                        ...paymentDetails,
                    ].sort((a, b) => {
                        const dateA = new Date(`${a.date}T${a.time}`);
                        const dateB = new Date(`${b.date}T${b.time}`);

                        if (dateA < dateB) {
                            return -1;
                        } else if (dateA > dateB) {
                            return 1;
                        } else {
                            const timeA = parseInt(a.time.replace(":", ""));
                            const timeB = parseInt(b.time.replace(":", ""));
                            return timeA - timeB;
                        }
                    });

                    return {
                        id: factureID,
                        ref: factureRef,
                        firstNameP: patient.firstName,
                        lastNameP: patient.lastName,
                        idP: patient.patientID,
                        creationDate:
                            DateTime.fromISO(createdAt).toFormat("dd/LL/yyyy"),
                        totalAmount: totalNeededAmount,
                        payedAmount: totalPaidAmount,
                        restAmount: restAmount,
                        status: status,
                        details: details,
                    };
                });
                state.list = list;

                // state.pagination = data.paginationMetaData;
            }
        },
        setPatientInvoices: (state, action) => {
            const { data } = action.payload;
            if (data !== undefined) {
                let list: Invoice[] = data.data.map((invoice: any) => {
                    const {
                        appointments,
                        payments,
                        patient,
                        createdAt,
                        factureID,
                        factureRef,
                        restAmount,
                        totalNeededAmount,
                        totalPaidAmount,
                    } = invoice;

                    // let status = "impayed";
                    // if (restAmount === 0) {
                    //     status = "payed";
                    // } else if (restAmount < totalNeededAmount) {
                    //     status = "part-payed";
                    // }
                    let status = "impayed";
                    if (restAmount <= 0) {
                        status = "payed-status";
                    } else if (
                        totalPaidAmount < totalNeededAmount &&
                        totalPaidAmount > 0
                    ) {
                        status = "part-payed";
                    }

                    const appointmentDetails = appointments.map(
                        (appointment: any) => {
                            const {
                                appointmentDateTime,
                                appointmentID,
                                cost,
                                diagnostique,
                                note,
                                ordonnance,
                                status,
                                paidAmount,
                            } = appointment;
                            return {
                                type: "appointment",
                                id: appointmentID,
                                date: DateTime.fromISO(
                                    appointmentDateTime,
                                ).toFormat("dd/LL/yyyy"),
                                time: DateTime.fromISO(
                                    appointmentDateTime,
                                ).toFormat("HH:mm"),
                                status,
                                diagnostic: diagnostique,
                                prescription: ordonnance,
                                note,
                                cost,
                                paidAmount,
                            };
                        },
                    );
                    const paymentDetails = payments.map((payment: any) => {
                        const { paymentID, paymentAmount, paymentDate } =
                            payment;
                        return {
                            type: "payment",
                            id: paymentID,

                            date: DateTime.fromISO(paymentDate).toFormat(
                                "dd/LL/yyyy",
                            ),
                            time: DateTime.fromISO(paymentDate).toFormat(
                                "HH:mm",
                            ),
                            cost: paymentAmount,
                        };
                    });

                    const details = [
                        ...appointmentDetails,
                        ...paymentDetails,
                    ].sort((a, b) => {
                        const dateA = new Date(`${a.date}T${a.time}`);
                        const dateB = new Date(`${b.date}T${b.time}`);

                        if (dateA < dateB) {
                            return -1;
                        } else if (dateA > dateB) {
                            return 1;
                        } else {
                            const timeA = parseInt(a.time.replace(":", ""));
                            const timeB = parseInt(b.time.replace(":", ""));
                            return timeA - timeB;
                        }
                    });

                    return {
                        id: factureID,
                        ref: factureRef,
                        firstNameP: patient.firstName,
                        lastNameP: patient.lastName,
                        idP: patient.patientID,
                        creationDate:
                            DateTime.fromISO(createdAt).toFormat("dd/LL/yyyy"),
                        totalAmount: totalNeededAmount,
                        payedAmount: totalPaidAmount,
                        restAmount: restAmount,
                        status: status,
                        details: details,
                    };
                });
                state.patientBills.list = list;

                // state.pagination = data.paginationMetaData;
            }
        },
        updateFilter: (state, action) => {
            const {
                search,
                status,
                createdAt,
                patientID,
                itemsPerPage,
                currentPageNumber,
            } = action.payload;
            if (itemsPerPage != undefined) {
                state.filtersBy.itemsPerPage = itemsPerPage;
            }
            if (currentPageNumber != undefined) {
                state.filtersBy.currentPageNumber = currentPageNumber;
            }
            if (search !== undefined) {
                state.filtersBy.search = search;
            }
            if (status !== undefined) {
                state.filtersBy.status = status;
            }
            if (createdAt !== undefined) {
                state.filtersBy.createdAt = createdAt;
            }
            if (patientID !== undefined) {
                state.filtersBy.patientID = patientID;
            }
        },
        setPatientFiltersInvoices: (state, action) => {
            const {
                search,
                status,
                createdAt,
                patientID,
                itemsPerPage,
                currentPageNumber,
            } = action.payload;
            if (search !== undefined) {
                state.patientBills.filtersBy.search = search;
            }
            if (status !== undefined) {
                state.patientBills.filtersBy.status = status;
            }
            if (createdAt !== undefined) {
                state.patientBills.filtersBy.createdAt = createdAt;
            }
            if (patientID !== undefined) {
                state.patientBills.filtersBy.patientID = patientID;
            }
        },
        setSelectedInvoice: (state, action) => {
            const { invoiceID } = action.payload;
            if (state.list && state.list.length > 0) {
                const selectedInvoice = state.list?.find(
                    (invoice) => invoice.id === invoiceID,
                );
                if (selectedInvoice) {
                    state.invoice = selectedInvoice;
                }
            }
        },
        resetFilters: (state) => {
            state.filtersBy = {};
        },
        setInvoiceDetails: (state, action) => {
            const { invoice } = action.payload;
            console.log("INVOICE", invoice);
            const appointmentDetails = invoice.appointments.map(
                (appointment: any) => {
                    console.log("appointment", appointment);
                    return {
                        type: "appointment",
                        id: appointment.appointmentID,
                        date: DateTime.fromISO(
                            appointment.appointmentDateTime,
                        ).toFormat("dd/LL/yyyy"),
                        time: DateTime.fromISO(
                            appointment.appointmentDateTime,
                        ).toFormat("HH:mm"),
                        status: appointment.status,
                        diagnostic: appointment.diagnostique,
                        prescription: appointment.ordonnance ?? "",
                        note: appointment.note,
                        cost: appointment.totalAppointmentCost,
                        payments: invoice.payments
                            .map((payment: any) => {
                                console.log(
                                    "invoice.payments payment",
                                    payment,
                                );
                                if (
                                    payment.appointmentID ===
                                    appointment.appointmentID
                                ) {
                                    return {
                                        type: "payment",
                                        id: payment.paymentID,
                                        factureID: payment.factureID,
                                        appointmentID: payment.appointmentID,
                                        date: DateTime.fromISO(
                                            payment.paymentDate,
                                        ).toFormat("dd/LL/yyyy"),
                                        time: DateTime.fromISO(
                                            payment.paymentDate,
                                        ).toFormat("HH:mm"),
                                        cost: payment.paymentAmount,
                                    };
                                }
                            })
                            .filter((item: any) => item),
                        services: appointment.appointmentServices
                            .map((service: any) => {
                                console.log("service", service);
                                return {
                                    type: "service",
                                    id: service.appointmentServiceID,
                                    cost:
                                        appointment.cost === -1
                                            ? service.customCost
                                            : "",
                                    title: service.service.title,
                                };
                            })
                            .filter((item: any) => item),
                        toothActs: appointment.toothActs
                            .map((toothAct: any) => {
                                return {
                                    type: "toothAct",
                                    id: toothAct.toothActID,
                                    actID: toothAct.actID,
                                    actName: toothAct.act?.title ?? "",
                                    toothNumber:
                                        toothAct.tooth?.toothNumber ?? "",
                                    cost:
                                        appointment.cost === -1
                                            ? toothAct.customCost
                                            : "",
                                };
                            })
                            .filter((item: any) => item),
                    };
                },
            );
            const paymentDetails = invoice.payments
                .map((payment: any) => {
                    if (payment.appointmentID === null) {
                        return {
                            type: "payment",
                            id: payment.paymentID,
                            factureID: payment.factureID,
                            appointmentID: payment.appointmentID,
                            date: DateTime.fromISO(
                                payment.paymentDate,
                            ).toFormat("dd/LL/yyyy"),
                            time: DateTime.fromISO(
                                payment.paymentDate,
                            ).toFormat("HH:mm"),
                            cost: payment.paymentAmount,
                        };
                    } else {
                        return null;
                    }
                })
                .filter((item: any) => item);
            console.log("paymentDetails", paymentDetails);
            console.log("appointmentDetails", appointmentDetails);
            const invoiceDetails = [...appointmentDetails, ...paymentDetails];
            invoiceDetails.sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                if (dateA < dateB) {
                    return -1;
                } else if (dateA > dateB) {
                    return 1;
                } else {
                    const timeA = parseInt(a.time.replace(":", ""));
                    const timeB = parseInt(b.time.replace(":", ""));
                    return timeA - timeB;
                }
            });
            const patient = invoice.appointments[0].patient;

            let status = "impayed";
            if (invoice.restAmount <= 0) {
                status = "payed-status";
            } else if (
                invoice.totalPaidAmount < invoice.totalNeededAmount &&
                invoice.totalPaidAmount > 0
            ) {
                status = "part-payed";
            }
            state.invoice = {
                id: invoice.factureID,
                ref: invoice.factureRef,
                firstNameP: patient.firstName,
                lastNameP: patient.lastName,
                creationDate: DateTime.fromISO(invoice.createdAt).toFormat(
                    "dd/LL/yyyy",
                ),
                totalAmount: invoice.totalNeededAmount,
                payedAmount: invoice.totalPaidAmount,
                restAmount: invoice.restAmount,
                status,
                details: invoiceDetails,
            };
        },
    },
});

export const {
    setAllInvoices,
    setPatientInvoices,
    updateFilter,
    setSelectedInvoice,
    resetFilters,
    setInvoiceDetails,
    setPatientFiltersInvoices,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
