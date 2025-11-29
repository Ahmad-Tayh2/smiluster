import { createSlice } from "@reduxjs/toolkit";
// import { AppointmentsState } from "./types";
const initState: any = {
    data: [],
    pagination: {
        itemsPerPage: undefined,
        currentPageNumber: undefined,
        totalPagesCount: undefined,
        totalItemsCount: undefined,
    },
    calendar: {
        data: [],
        filters: {
            startDay: undefined,
            endDay: undefined,
        },
        loading: false,
    },
    patientAppointments: {
        data: [],
        loading: false,
        filterBy: {
            startDay: undefined,
            endDay: undefined,
            patientID: undefined,
            factureID: undefined,
            status: undefined,
            sortBy: undefined,
            search: undefined,
            //for pagination
            numberOfRows: undefined,
            pageNumber: undefined,
        },
    },
    appointment: null,
    factOfApp: null,
    loading: false,
    error: null,
    message: null,
    filterBy: {
        startDay: undefined,
        endDay: undefined,
        patientID: undefined,
        factureID: undefined,
        status: undefined,
        sortBy: undefined,
        search: undefined,
        //for pagination
        numberOfRows: undefined,
        pageNumber: undefined,
    },
    create: {
        loading: false,
        error: null,
        message: null,
    },
    edit: {
        loading: false,
        erro: null,
        message: null,
    },
    delete: {
        loading: false,
        erro: null,
        message: null,
    },
    services: {
        error: null,
        data: [],
        appServices: [],
    },
    statusOptions: [
        { value: "scheduled", label: "Planifié", color: "#2C86EF" },
        { value: "pending", label: "En attente", color: "#F18E19" },
        { value: "completed", label: "Terminé", color: "#1BD788" },
        { value: "canceled", label: "Annulé", color: "#E20202" },
    ],
};
const initialState: any = { ...initState };
const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        resetFilters: (state) => {
            // state.data = [];
            state.filterBy = {};
        },
        resetPatientAppointments: (state) => {
            state.patientAppointments.data = [];
            state.patientAppointments.loading = false;
            state.patientAppointments.filterBy = {};
        },
        updateAppointments: (state, action) => {
            if (action.payload?.data !== undefined) {
                state.data = action.payload?.data.data;
                state.pagination = action.payload?.data.paginationMetaData;
            }
            if (action.payload?.error !== undefined) {
                state.error = action.payload?.error;
            }
            if (action.payload?.loading !== undefined) {
                state.loading = action.payload?.loading;
            }
            if (action.payload?.addOne !== undefined) {
                state.data = [action.payload?.addOne, ...state.data];
            }
            if (action.payload.appointment !== undefined) {
                state.appointment = action.payload.appointment;
            }
        },
        updateAppointmentsFilters: (state, action) => {
            let filterBy: any = { ...state.filterBy };
            for (let filter of action.payload) {
                filterBy[filter.name] = filter.value;
            }
            state.filterBy = filterBy;
        },
        updateCreateAppointment: (state, action) => {
            if (action.payload.error !== undefined) {
                state.create.error = action.payload.error;
            }
            if (action.payload.message !== undefined) {
                state.create.message = action.payload.message;
            }
            if (action.payload.loading !== undefined) {
                state.create.loading = action.payload.loading;
            }
        },
        updateEditAppointment: (state, action) => {
            if (action.payload.error !== undefined) {
                state.edit.error = action.payload.error;
            }
            if (action.payload.message !== undefined) {
                state.edit.message = action.payload.message;
            }
            if (action.payload.loading !== undefined) {
                state.edit.loading = action.payload.loading;
            }
        },
        updateDeleteAppointment: (state, action) => {
            if (action.payload.error !== undefined) {
                state.delete.error = action.payload.error;
            }
            if (action.payload.message !== undefined) {
                state.delete.message = action.payload.message;
            }
            if (action.payload.loading !== undefined) {
                state.delete.loading = action.payload.loading;
            }
        },
        updateCalendar: (state, action) => {
            if (action.payload.data !== undefined) {
                state.calendar.data = [...action.payload.data];
            }
            if (action.payload.loading !== undefined) {
                state.calendar.loading = action.payload.loading;
            }
            if (action.payload.filters !== undefined) {
                state.calendar.filters = action.payload.filters;
            }
        },
        updatePatientAppointments: (state, action) => {
            if (action.payload.data !== undefined) {
                state.patientAppointments.data = action.payload.data.data;
            }
            if (action.payload.loading !== undefined) {
                state.patientAppointments.loading = action.payload.loading;
            }
            if (action.payload.filterBy !== undefined) {
                let filterBy: any = { ...state.filterBy };
                for (let filter of action.payload.filterBy) {
                    filterBy[filter.name] = filter.value;
                }
                state.patientAppointments.filterBy = filterBy;
            }
        },
        updateFactOfApp: (state, action) => {
            state.factOfApp = action.payload;
        },
        updateService: (state, action) => {
            if (action.payload.error) {
                state.services.error = action.payload.error;
            }
            if (action.payload.data) {
                state.services.data = action.payload.data;
            }
            if (action.payload.appServices) {
                state.services.appServices = action.payload.appServices;
            }
        },
    },
});

export const {
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
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
