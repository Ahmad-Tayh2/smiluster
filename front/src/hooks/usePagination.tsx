import React from "react";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { PaginationFormat } from "../redux/features/pagination/type";
import { updatePagination } from "../redux/features/pagination/paginationSlice";

export const usePagination = (paginationProps?: PaginationFormat) => {
    const dispatch = useAppDispatch();

    const {
        itemsPerPage,
        currentPageNumber,
        totalPagesCount,
        totalItemsCount,
    } = useAppSelector((state: any) => state.pagination);
    const pagination = useAppSelector((state: any) => state.pagination);

    const setItemsPerPage = (value: number) => {
        dispatch(updatePagination({ itemsPerPage: value }));
    };
    const setCurrentPageNumber = (value: number) => {
        dispatch(updatePagination({ currentPageNumber: value }));
    };
    const setTotalPagesCount = (value: number) => {
        dispatch(updatePagination({ totalPagesCount: value }));
    };
    const setTotalItemsCount = (value: number) => {
        dispatch(updatePagination({ totalItemsCount: value }));
    };

    const setPagination = (value: PaginationFormat) => {
        dispatch(updatePagination(value));
    };

    React.useEffect(() => {
        if (paginationProps) {
            setPagination(paginationProps);
        }
    }, [paginationProps]);

    return {
        pagination,
        setPagination,
        itemsPerPage,
        setItemsPerPage,
        currentPageNumber,
        setCurrentPageNumber,
        totalPagesCount,
        setTotalPagesCount,
        totalItemsCount,
        setTotalItemsCount,
    };
};
