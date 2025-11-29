/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./style.css";
import SVGIcon from "../SVGIcon";
// import Button from "../Button";
// import { ReactComponent as DocumentSVG } from "../../icons/document.svg";
import { ReactComponent as LeftArrowSVG } from "../../icons/left-arrow.svg";
import { ReactComponent as DoubleArrowSVG } from "../../icons/double-arrow-right.svg";
import Select from "react-select";
import DropDown from "../dropdown";
import { usePagination } from "../../hooks/usePagination";
import { PaginationFormat } from "../../redux/features/pagination/type";
import { PulseLoader } from "react-spinners";

export default function Table(props: TableProps) {
    const {
        tableDataStructure,
        // paginationState,
        pagination,
        tableOptions,
        // className,
        style,
        loading,
        noDataMessage,
        noDataSize,
    } = props;
    const {
        itemsPerPage,
        setItemsPerPage,
        currentPageNumber,
        setCurrentPageNumber,
        totalPagesCount,
        totalItemsCount,
    } = usePagination();

    // React.useEffect(() => {
    //     if (paginationState?.totalPagesCount) {
    //         setTotalPagesCount(paginationState?.totalPagesCount);
    //     }
    //     if (paginationState?.totalItemsCount) {
    //         setTotalItemsCount(paginationState?.totalItemsCount);
    //     }
    // }, [paginationState]);

    const [checkeddata, setCheckeddata] = React.useState<{
        [key: number]: boolean;
    }>({});
    const [displayOptions, setDisplayOptions] = React.useState<number>(-1);

    const handleCheckboxChange = (rowId: number, checked: boolean) => {
        setCheckeddata((prevCheckeddata) => ({
            ...prevCheckeddata,
            [rowId]: checked,
        }));
    };
    const optionsRef = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target as Node)
            ) {
                setDisplayOptions(-1);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const handleOptionsClick = (index: number, e?: any) => {
        if (e) {
            e.stopPropagation();
        }
        setDisplayOptions((prev) => (index === prev ? -1 : index));
    };
    const statusOptions: any = [
        { value: 10, label: "10" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
        { value: 999, label: "all" },
    ];

    const [visiblePages, setVisiblePages] = React.useState(
        Math.min(4, totalPagesCount),
    );
    const [selectedRowNumber, setSelectedRowNumber] = React.useState(() => {
        const foundOption = statusOptions.find(
            (elem: any) => elem.value == itemsPerPage,
        );
        console.log("foundOption::", foundOption);
        if (foundOption) {
            return foundOption;
        } else if (
            itemsPerPage < statusOptions[statusOptions.length - 2].value
        ) {
            return statusOptions[0];
        } else {
            return statusOptions[statusOptions.length - 1];
        }
        return foundOption
            ? foundOption
            : statusOptions[statusOptions.length - 1];
    });

    React.useEffect(() => {
        if (itemsPerPage) {
            const foundOption = statusOptions.find(
                (elem: any) => elem.value == itemsPerPage,
            );
            if (foundOption) {
                setSelectedRowNumber(foundOption);
            } else if (
                itemsPerPage < statusOptions[statusOptions.length - 2].value
            ) {
                setSelectedRowNumber(statusOptions[0]);
            } else {
                setSelectedRowNumber(statusOptions[statusOptions.length - 1]);
            }
        }
    }, [itemsPerPage]);

    const handleSelectedRowNumber = (data: any) => {
        setSelectedRowNumber(data);
        setCurrentPageNumber(1);
        setItemsPerPage(data.value);
    };

    React.useEffect(() => {
        if (totalPagesCount > 0) {
            setVisiblePages(Math.min(4, totalPagesCount));
        }
    }, [totalPagesCount]);

    const paginationPages = () => {
        const handlePageChange = (direction: number) => {
            if (
                (direction === 1 && currentPageNumber < totalPagesCount) ||
                (direction === -1 && currentPageNumber > 1)
            ) {
                setCurrentPageNumber(currentPageNumber + direction);
            } else {
                setCurrentPageNumber(currentPageNumber);
            }
        };

        const generatePageButtons = () => {
            const buttons: any[] = [];
            // const totalPagesArray = Array.from(
            //     { length: totalPagesCount },
            //     (_, index) => index + 1
            // );

            let start;
            if (visiblePages % 2 === 0) {
                start = Math.max(1, currentPageNumber - visiblePages / 2 + 1);
            } else {
                start = Math.max(
                    1,
                    currentPageNumber - Math.floor(visiblePages / 2),
                );
            }
            const end = Math.min(start + visiblePages - 1, totalPagesCount);
            if (end - start <= visiblePages - 1) {
                start = Math.max(1, end - visiblePages + 1);
            }
            for (let i = start; i <= end; i++) {
                buttons.push(
                    <div
                        key={i}
                        className={`page-number-btn ${
                            currentPageNumber === i ? "selected" : ""
                        }`}
                        onClick={() => setCurrentPageNumber(i)}
                    >
                        {i}
                    </div>,
                );
            }

            if (end - start + 1 < totalPagesCount) {
                if (start > 1) {
                    buttons.unshift(
                        <div className="page-number-dots">...</div>,
                    );
                }
                if (end < totalPagesCount) {
                    buttons.push(<div className="page-number-dots">...</div>);
                }
            }

            return buttons;
        };

        return (
            <div className="page-numbers-container">
                <div
                    className="page-number-arrow"
                    style={{ transform: "rotate(180deg)" }}
                    onClick={() => setCurrentPageNumber(1)}
                >
                    <DoubleArrowSVG />
                </div>
                <div
                    className="page-number-arrow"
                    onClick={() => handlePageChange(-1)}
                >
                    <LeftArrowSVG />
                </div>
                {generatePageButtons()}
                <div
                    className="page-number-arrow"
                    style={{ transform: "rotate(180deg)" }}
                    onClick={() => handlePageChange(1)}
                >
                    <LeftArrowSVG />
                </div>
                <div
                    className="page-number-arrow"
                    onClick={() => setCurrentPageNumber(totalPagesCount)}
                >
                    <DoubleArrowSVG />
                </div>
            </div>
        );
    };

    const PaginationFooterDisplayNumberOfRows = () => {
        if (tableDataStructure.data.length === 0) {
            return <div></div>;
        } else if (selectedRowNumber < totalItemsCount) {
            return null;
        } else {
            return (
                <div>
                    <span>Affichage de </span>
                    <Select
                        options={statusOptions}
                        value={selectedRowNumber}
                        onChange={handleSelectedRowNumber}
                        isSearchable={false}
                        menuPlacement="auto"
                    />
                    <span> sur {totalItemsCount} lignes</span>
                </div>
            );
        }
    };

    const [isOpenList, setIsOpenList] = React.useState(
        tableDataStructure.data.map(() => false),
    );
    const toggleExtra = (index: any) => {
        setIsOpenList((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const extraRowsElement = (extraData: any, isOpen: boolean) => {
        if (isOpen) {
            if (Array.isArray(extraData) && extraData?.length > 0) {
                return extraData.map((extraRow, extraIndex) => {
                    return (
                        <tr key={extraIndex}>
                            {extraRow.map((extraItem: any, i: any) => (
                                <td key={i}>{extraItem.value}</td>
                            ))}
                        </tr>
                    );
                });
            } else if (React.isValidElement(extraData)) {
                return extraData;
            } else {
                return null;
            }
        } else {
            return null;
        }
    };
    const [load, setLoad] = React.useState<boolean>(false);
    React.useEffect(() => {
        let timeout: any;
        if (loading) {
            setLoad(true);
        }
        timeout = setTimeout(() => {
            setLoad(false);
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [loading]);
    if (loading || load) {
        return (
            <div
                className="center"
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "var(--color-3)",
                    borderRadius: "var(--main-rd)",
                }}
            >
                <PulseLoader
                    color={"var(--color-1)"}
                    loading={true}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }
    return (
        <table className="table-component" style={style} id="myTable">
            <thead>
                <tr>
                    <th></th>
                    {tableDataStructure.header.dataHead.map((column, index) => (
                        <th
                            key={index}
                            style={{
                                ...column.style,
                            }}
                        >
                            {column.value}
                        </th>
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {/* {load ? (
                    <tr
                        className='loader'
                        style={{
                            height: "calc(100vh - 270px)",
                        }}
                    >
                        <td
                            colSpan={
                                tableDataStructure.header.dataHead.length + 2
                            }
                            style={{
                                height: "100%",
                                backgroundColor: "var(-color-1) !important",

                                padding: "0",
                            }}
                        >
                            <div
                                className='center list'
                                style={{
                                    width: "100%",
                                    height: "calc(100vh - 270px)",
                                    backgroundColor: "white",
                                    borderLeft: "1px solid var(--color-2)",
                                    borderRight: "1px solid var(--color-2)",
                                    borderBottom: "1px solid var(--color-2)",
                                    borderRadius: "5px !important",
                                }}
                            >
                                <PulseLoader
                                    color={"var(--color-1"}
                                    loading={true}
                                    size={20}
                                    aria-label='Loading Spinner'
                                    data-testid='loader'
                                />
                            </div>
                        </td>
                    </tr>
                ) : ( */}
                {tableDataStructure.data.length === 0 && !loading && (
                    <tr
                        className="no-data"
                        style={{
                            backgroundColor: "white",
                        }}
                    >
                        <td
                            colSpan={
                                tableDataStructure.header.dataHead.length + 2
                            }
                        >
                            <div
                                className="center"
                                style={{
                                    height: `${
                                        noDataSize ? noDataSize : 400
                                    }px`,
                                    width: "100%",
                                    top: "0",
                                    left: "0",
                                    color: "var(--color-1)",
                                    fontWeight: "bold",
                                    fontSize: `${
                                        noDataSize ? noDataSize / 4 : 32
                                    }px`,
                                    backgroundColor: "white",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        gap: "var(--main-gap)",
                                        color: "var(--color-1)",
                                        fontWeight: "bold",
                                        fontSize: "inherit",
                                        backgroundColor: "#ffebd8a0",
                                        padding:
                                            noDataSize && noDataSize <= 100
                                                ? "var(--pd-1)"
                                                : "var(--pd-3)",
                                        borderRadius: "var(--main-rd)",
                                        border: "3px dashed var(--color-1)",
                                    }}
                                >
                                    <SVGIcon
                                        type="not-found"
                                        color="var(--color-1)"
                                        height={
                                            noDataSize ? noDataSize / 3 : 60
                                        }
                                        width={noDataSize ? noDataSize / 3 : 60}
                                    />
                                    {noDataMessage}
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
                {tableDataStructure.data?.map((item, index) => {
                    return (
                        <>
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: checkeddata[index]
                                        ? "var(--color-4)"
                                        : "var(--color-3)",
                                }}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        id={`checkbox-${index}`}
                                        checked={checkeddata[index] || false}
                                        onChange={(e) => {
                                            handleCheckboxChange(
                                                index,
                                                e.target.checked,
                                            );
                                        }}
                                    />
                                    <label
                                        htmlFor={`checkbox-${index}`}
                                        className="checkbox-label"
                                    >
                                        <SVGIcon
                                            type={"check"}
                                            color={"white"}
                                            width={20}
                                            height={20}
                                        />
                                    </label>
                                </td>
                                {item.dataRow.map(({ value }, i) => (
                                    <td
                                        key={i}
                                        onClick={() => {
                                            item.onClickRow?.();
                                            toggleExtra(index);
                                        }}
                                        style={{
                                            cursor: item.onClickRow
                                                ? "pointer"
                                                : "auto",
                                        }}
                                    >
                                        {value}
                                    </td>
                                ))}

                                <td className="dropdown-cell-container">
                                    {tableOptions?.length > 0 && (
                                        <button
                                            ref={optionsRef}
                                            onClick={(e) =>
                                                handleOptionsClick(index, e)
                                            }
                                        >
                                            <SVGIcon
                                                type={"dots"}
                                                color={"var(--color-1)"}
                                                width={20}
                                                height={20}
                                            />
                                            {displayOptions === index && (
                                                <>
                                                    <DropDown
                                                        items={tableOptions}
                                                        id={item?.id || ""}
                                                        onBtnClick={() =>
                                                            setDisplayOptions(
                                                                -1,
                                                            )
                                                        }
                                                        style={{}}
                                                    />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {extraRowsElement(
                                item.extraData,
                                isOpenList[index],
                            )}
                        </>
                    );
                })}
            </tbody>
            {pagination === true && tableDataStructure.data.length > 0 && (
                /*!load &&*/ <tfoot>
                    <tr>
                        <td
                            colSpan={
                                tableDataStructure.header.dataHead.length + 2
                            }
                        >
                            <div className="pagination">
                                <div>{paginationPages()}</div>

                                <PaginationFooterDisplayNumberOfRows />
                            </div>
                        </td>
                    </tr>
                </tfoot>
            )}
        </table>
    );
}

interface ExtraRowData {}
interface TableRow {
    dataRow: {
        value: string | React.ReactNode;
        name?: string;
        onClickCell?: () => void;
    }[];
    id: string;
    onClickRow?: () => void;
    style?: React.CSSProperties;
    isExtraDataOpen?: boolean;
    extraData?: ExtraRowData[] | React.ReactNode;
}
interface TableHead {
    dataHead: {
        value: string | React.ReactNode;
        name?: string;
        onClickCell?: () => void;
        style?: React.CSSProperties;
    }[];
    onClickRow?: () => void;
    style?: React.CSSProperties;
}

interface TableProps {
    tableDataStructure: {
        header: TableHead;
        data: TableRow[];
    };
    tableOptions?: any;
    paginationState: PaginationFormat;
    pagination?: boolean;
    className?: string[];
    style?: React.CSSProperties;
    loading?: boolean;
    noDataMessage?: string;
    noDataSize?: number;
}
Table.defaultProps = {
    tableOptions: [
        {
            label: "option 1 ",
        },
        {
            label: "option 2 ",
        },
    ],
    tableDataStructure: {
        header: {
            dataHead: [
                { value: "colum 1 ", name: "first col" },
                { value: "colum 2 " },
                { value: "colum 3 " },
                { value: "colum 4 " },
                { value: "colum 5 " },
            ],
            style: {},
            onClickRow: () => {},
        },
        data: [
            {
                dataRow: [
                    { value: "one", name: "first one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                ],
                style: {},
                onClickRow: () => {},
            },
            {
                dataRow: [
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                ],
                style: {},
                onClickRow: () => {},
            },
            {
                dataRow: [
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                ],
                style: {},
                onClickRow: () => {},
            },
            {
                dataRow: [
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                    { value: "one" },
                ],
                style: {},
                onClickRow: () => {},
            },
        ],
    },
    // columns: ["one", "two", "three", "four", "five"],
    paginationState: {
        itemsPerPage: 1,
        currentPageNumber: 1,
        totalPagesCount: 1,
        totalItemsCount: 1,
    },
    pagination: true,
    loading: false,
    noDataMessage: "pas de données",
};
