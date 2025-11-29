import { baseURL } from "./envFile";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const SERVER_URL = baseURL + "/api";

export const ROUTER = {
    HOME: "/",
    AUTH: {
        LOGIN: "/login",
        FORGET_PASS: "/forgetPassword",
        RESET_PASS: "/resetPassword",
    },
    PROFILE: "/profile",
    APPOINTMENTS: "/appointment",
    PATIENTS: "/patients",
    STOCK: "/stock",
    INVOICING: "/invoicing",
    HELP: "/help",
    INVOICE_DETAILS: (idInvoice: any) => `/invoicing/${idInvoice}`,
    NOTIFICATIONS: "/notifications",
    SETTINGS: "/settings",
    //sub routes
    PATIENT_PROFILE: (idPatient: any) => `/patients/${idPatient}`,
    // PATIENT_APPOINTMENTS: (idPatient: any) =>
    //     `/patients/${idPatient}/appointments`,
    APPOINTMENT_PAGE: (appointmentId: any) => `/appointment/${appointmentId}`,
    PATIENT_PRESCRIPTIONS: (idPatient: any) =>
        `/patients/${idPatient}/prescriptions`,
    PATIENT_DOCUMENTS: (idPatient: any) => `/patients/${idPatient}/documents`,
    PATIENT_CHART: (idPatient: any) => `/patients/${idPatient}/chart`,
};
export const API = {
    auth: {
        login: `${SERVER_URL}/auth/login`,
        forgotPassword: `${SERVER_URL}/auth/forgot-password`,
        resetPassword: `${SERVER_URL}/auth/reset-password`,
    },
    appointments: {
        add: `${SERVER_URL}/appointment`,
        get: `${SERVER_URL}/appointment`,
        getById: (appointmentID: any) =>
            `${SERVER_URL}/appointment/${appointmentID}`,
        update: (appointmentID: any) =>
            `${SERVER_URL}/appointment/${appointmentID}`,
        delete: (appointmentID: any) =>
            `${SERVER_URL}/appointment/${appointmentID}`,
    },
    patients: {
        add: `${SERVER_URL}/patient`,
        get: `${SERVER_URL}/patient`,
        getById: (patientId: any) => `${SERVER_URL}/patient/${patientId}`,
        update: (patientId: any) => `${SERVER_URL}/patient/${patientId}`,
        delete: (patientId: any) => `${SERVER_URL}/patient/${patientId}`,
    },
    chart: {
        teeth: {
            get: (patientId: any) => `${SERVER_URL}/tooth/patient/${patientId}`,
            getActs: (toothId: any) => `${SERVER_URL}/tooth/${toothId}/actes`,
        },
        toothAct: {
            add: `${SERVER_URL}/toothAct`,
            update: (toothActID: any) => `${SERVER_URL}/toothAct/${toothActID}`,
            getActs: (toothId: any) => `${SERVER_URL}/tooth/${toothId}/actes`,
            getActsByPatient: (patientId: any) =>
                `${SERVER_URL}/toothAct/patient/${patientId}`,
            getTeeth: (actId: any) => `${SERVER_URL}/acte/${actId}/teeth`,
            //-------------
            getToothActsByApp: (appointmentId: any) =>
                `${SERVER_URL}/toothAct/appointment/${appointmentId}`,
            deleteToothAct: (toothActID: any) =>
                `${SERVER_URL}/toothAct/${toothActID}`,
        },
        act: {
            add: `${SERVER_URL}/act`,
            get: `${SERVER_URL}/act`,
            getById: (actId: any) => `${SERVER_URL}/act/${actId}`,
            update: (actId: any) => `${SERVER_URL}/act/${actId}`,
            delete: (actId: any) => `${SERVER_URL}/act/${actId}`,
        },
    },
    stock: {
        add: `${SERVER_URL}/stock`,
        get: `${SERVER_URL}/stock`,
        getById: (patientId: any) => `${SERVER_URL}/stock/${patientId}`,
        update: (patientId: any) => `${SERVER_URL}/stock/${patientId}`,
        delete: (patientId: any) => `${SERVER_URL}/stock/${patientId}`,
    },
    product: {
        get: `${SERVER_URL}/product`,
        add: `${SERVER_URL}/product`,
        delete: (id: any) => `${SERVER_URL}/product/${id}`,
    },
    documents: {
        add: `${SERVER_URL}/document`,
        get: (patientId: any) => `${SERVER_URL}/document/patient/${patientId}`,
        delete: (docId: any) => `${SERVER_URL}/document/${docId}`,
        download: (docname: any) =>
            `${SERVER_URL}/document/download/${docname}`,
        update: (docId: any) => `${SERVER_URL}/document/${docId}`,
        // get: `${SERVER_URL}/appointment`,
        // getById: (appointmentID: any) =>
        //     `${SERVER_URL}/appointment/${appointmentID}`,
        // update: (appointmentID: any) =>
        //     `${SERVER_URL}/appointment/${appointmentID}`,
        // delete: (appointmentID: any) =>
        //     `${SERVER_URL}/appointment/${appointmentID}`,
    },
    notifications: {
        get: (all: boolean) => `${SERVER_URL}/notifications?all=${all}`,
        setClicked: (notifId: string) =>
            `${SERVER_URL}/notifications/set-clicked/${notifId}`,
        setAllSeen: `${SERVER_URL}/notifications/set-all-seen`,
    },
    settings: {
        get: `${SERVER_URL}/settings`,
        create: `${SERVER_URL}/settings`,
        update: (settingID: string) => `${SERVER_URL}/settings/${settingID}`,
    },
    invoices: {
        getAll: `${SERVER_URL}/facture`,
        addPayment: `${SERVER_URL}/payment`,
        getInvoiceByID: (invoiceID: string) =>
            `${SERVER_URL}/facture/${invoiceID}`,
    },
    user: {
        get: (userID: any) => `${SERVER_URL}/user/${userID}`,
        update: (userID: any) => `${SERVER_URL}/user/${userID}`,
    },
    payment: {
        createPayment: `${SERVER_URL}/payment`,
        updatePayment: (paymentID: any) => `${SERVER_URL}/payment/${paymentID}`,
    },
    service: {
        updateService: (serviceID: any) => `${SERVER_URL}/service/${serviceID}`,
        createService: `${SERVER_URL}/service`,
        getServices: `${SERVER_URL}/service`,

        createAppointmentService: `${SERVER_URL}/appointment-service`,
        getAppointmentServices: (appointmentID: any) =>
            `${SERVER_URL}/appointment-service/appointment/${appointmentID}`,
        updateAppointmentService: (appointmentServiceID: any) =>
            `${SERVER_URL}/appointment-service/${appointmentServiceID}`,
        deleteAppointmentService: (appointmentServiceID: any) =>
            `${SERVER_URL}/appointment-service/${appointmentServiceID}`,
    },
};
