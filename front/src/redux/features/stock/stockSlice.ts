import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    list: {
        paginatedStocks: [],
    },
    pagination: {
        itemsPerPage: undefined,
        currentPageNumber: undefined,
        totalPagesCount: undefined,
        totalItemsCount: undefined,
    },

    products: [
        // { productName: "exp", productID: 1 },
        // { productName: "exp2", productID: 2 },
        // { productName: "exp3", productID: 3 },
    ],
    loading: false,
    error: null,
    productError: null,
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
    filterBy: {
        quantity: undefined,
        search: undefined,
        expiredBefore: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        numberOfRows: undefined,
        pageNumber: undefined,
    },
};
const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
        updateStock: (state, action) => {
            if (action?.payload?.loading !== undefined) {
                state.loading = action.payload.loading;
            }
            if (action?.payload?.error !== undefined) {
                state.error = action.payload.error;
            }
            if (action?.payload?.filter !== undefined) {
                state.filterBy[action.payload.filter.name] =
                    action.payload.filter.value;
            }
        },
        setStockList: (state, action) => {
            state.list.paginatedStocks = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        addStockToList: (state, action) => {
            state.list = [...state.list, action.payload];
        },
        updateCreateStock: (state, action) => {
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
        updateEditStock: (state, action) => {
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
        updateDeleteStock: (state, action) => {
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
        updateProducts: (state, action) => {
            if (action?.payload?.products !== undefined) {
                state.products = action.payload.products;
            }
            if (action?.payload?.error !== undefined) {
                state.productError = action.payload.error;
            }
        },
    },
});

export const {
    updateStock,
    setStockList,
    addStockToList,
    updateCreateStock,
    updateEditStock,
    updateDeleteStock,
    updateProducts,
} = stockSlice.actions;

export default stockSlice.reducer;
