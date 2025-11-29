import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    teeth: [],
    acts: [],
    toothActs: {
        loading: false,
        data: [],
    },
    error: null,
    toothActsByApp: {
        loading: false,
        data: [],
    },
};
const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        updateTeeth: (state, action) => {
            state.teeth = action.payload;
        },
        updateActs: (state, action) => {
            state.acts = action.payload;
        },
        updateToothActs: (state, action) => {
            if (action.payload.loading !== undefined) {
                state.toothActs.loading = action.payload.loading;
            }
            if (action.payload.data !== undefined) {
                state.toothActs.data = action.payload.data;
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateToothActsByApp: (state, action) => {
            if (action.payload.loading !== undefined) {
                state.toothActsByApp.loading = action.payload.loading;
            }
            if (action.payload.data !== undefined) {
                state.toothActsByApp.data = action.payload.data;
            }
        },
    },
});

export const {
    updateTeeth,
    updateActs,
    updateToothActs,
    setError,
    updateToothActsByApp,
} = chartSlice.actions;

export default chartSlice.reducer;
