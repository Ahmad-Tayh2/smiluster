import { createSlice } from "@reduxjs/toolkit";
// import { DocumentsState } from "./types";
const initialState: any = {
    data: [],
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
};
const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        updateDocuments: (state, action) => {
            if (action.payload?.data !== undefined) {
                state.data = action.payload?.data;
            }
            if (action.payload?.error !== undefined) {
                state.error = action.payload?.error;
            }
            if (action.payload?.addOne !== undefined) {
                state.data = [action.payload?.addOne, ...state.data];
            }
        },
        updateDocumentsFilters: (state, action) => {
            state.filterBy[action.payload.name] = action.payload.value;
        },
        updateCreateDocument: (state, action) => {
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
        updateEditDocument: (state, action) => {
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
        updateDeleteDocument: (state, action) => {
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
    },
});

export const {
    updateDocuments,
    updateDocumentsFilters,
    updateCreateDocument,
    updateEditDocument,
    updateDeleteDocument,
} = documentsSlice.actions;

export default documentsSlice.reducer;
