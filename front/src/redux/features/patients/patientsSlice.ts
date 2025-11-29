import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    list: {
        data: [],
        loading: false,
        error: null,
        message: null,
        filterBy: {
            gender: undefined,
            dateOfBirth: undefined,
            search: undefined,
            //for pagination
            currentPageNumber: 1,
            itemsPerPage: 10,
        },
        // pagination: {
        //     itemsPerPage: 10,
        //     currentPageNumber: undefined,
        //     totalPagesCount: undefined,
        //     totalItemsCount: undefined,
        // },
    },
    patient: {
        loading: false,
        error: null,
        data: null,
    },
    sexeOptions: [
        {
            label: "Homme",
            value: "male",
            color: "#78b4e3",
            iconType: "male",
        },
        {
            label: "Femme",
            value: "female",
            color: "#e75c8b",
            iconType: "female",
        },
    ],
};
const patientsSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        updatePatients: (state, action) => {
            const { data, loading, error, message, filter } = action.payload;
            if (data !== undefined) {
                if (data.data != undefined) {
                    state.list.data = data.data;
                }
                // if (data.paginationMetaData) {
                //     state.list.pagination = data.paginationMetaData;
                // }
            }
            if (loading !== undefined) {
                state.list.loading = loading;
            }
            if (error !== undefined) {
                state.list.error = error;
            }
            if (message !== undefined) {
                state.list.message = message;
            }
            if (filter !== undefined) {
                if (filter.gender != undefined) {
                    state.list.filterBy.gender = filter.gender;
                }
                if (filter.dateOfBirth != undefined) {
                    state.list.filterBy.dateOfBirth = filter.dateOfBirth;
                }
                if (filter.search != undefined) {
                    state.list.filterBy.search = filter.search;
                }
                if (filter.currentPageNumber != undefined) {
                    state.list.filterBy.currentPageNumber =
                        filter.currentPageNumber;
                }
            }
        },
        updatePatient: (state, action) => {
            const { loading, error, data, reset } = action.payload;
            if (loading !== undefined) {
                state.patient.loading = loading;
            }
            if (error !== undefined) {
                state.patient.error = error;
            }
            if (data !== undefined) {
                state.patient.data = data;
            }
            if (reset !== undefined) {
                state.patient.error = null;
                state.patient.loading = false;
                state.patient.data = null;
            }
        },
        resetfilter: (state) => {
            state.list.filterBy = {};
        },
    },
});

export const { updatePatients, updatePatient, resetfilter } =
    patientsSlice.actions;

export default patientsSlice.reducer;
