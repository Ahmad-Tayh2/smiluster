import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationFormat } from "./type";

const initialState: PaginationFormat = {
    itemsPerPage: 10,
    currentPageNumber: 1,
    totalPagesCount: 1,
    totalItemsCount: 10,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        updatePagination: (state, action: PayloadAction<PaginationFormat>) => {
            const {
                itemsPerPage,
                currentPageNumber,
                totalPagesCount,
                totalItemsCount,
            } = action.payload;

            if (itemsPerPage !== undefined) {
                state.itemsPerPage = itemsPerPage;
            }
            if (currentPageNumber !== undefined) {
                state.currentPageNumber = currentPageNumber;
            }
            if (totalPagesCount !== undefined) {
                state.totalPagesCount = totalPagesCount;
            }
            if (totalItemsCount !== undefined) {
                state.totalItemsCount = totalItemsCount;
            }
        },
    },
});

export const { updatePagination } = paginationSlice.actions;

export default paginationSlice.reducer;
