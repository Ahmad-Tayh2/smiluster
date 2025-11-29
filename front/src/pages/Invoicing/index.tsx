/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import "./style.css";
// import Button from "../../components/Button";
import Table from "../../components/Table";
import SVGIcon from "../../components/SVGIcon";
import { ReactComponent as CartSVG } from "./cart.svg";
// import { ReactComponent as CardSVG } from "./card.svg";
// import AddInvoicingCard from "../../components/AddInvoicingCard";
import { useInvoicing } from "../../hooks/useInvoicing";
import { usePagination } from "../../hooks/usePagination";
import { Link, useParams } from "react-router-dom";
import { ROUTER } from "../../constants/env";
import AddPaymentCard from "../../components/AddPaymentCard";
import { InvoiceDetailsCard } from "../../components/InvoiceCard";

export default function Invoicing() {
    // const [isIncome, setIsIncome] = React.useState<boolean>(true);
    // const [showAddCard, setShowAddCard] = React.useState<boolean>(false);
    const {
        getAllInvoices,
        invoicing,
        setFilter,
        selectInvoice,
        getInvoiceByID,
        createNewPayment,
    } = useInvoicing();
    const { pagination, setCurrentPageNumber, setItemsPerPage, itemsPerPage } =
        usePagination();
    const { idInvoice } = useParams();
    React.useEffect(() => {
        console.log("idInvoice", idInvoice);
        if (idInvoice) {
            handleMoreDetailsOnInvoiceByID(idInvoice);
        }
        setCurrentPageNumber(1);
        if (!(itemsPerPage && itemsPerPage > 0)) {
            setItemsPerPage(10);
        }
    }, []);

    React.useEffect(() => {
        if (
            pagination.currentPageNumber ||
            pagination.itemsPerPage ||
            invoicing?.filtersBy.createdAt ||
            invoicing?.filtersBy.patientID ||
            invoicing?.filtersBy.search ||
            invoicing?.filtersBy.status.length > 0
        ) {
            getAllInvoices();
        }
    }, [
        invoicing?.filtersBy,
        pagination.currentPageNumber,
        pagination.itemsPerPage,
    ]);

    // const handleOpenCard = () => {
    //     setShowAddCard(true);
    // };
    // const handleCloseCard = () => {
    //     setShowAddCard(false);
    // };
    // const toggleInvoicingView = () => {
    //     setIsIncome((prev) => !prev);
    // };

    const handleOnChange = (e: any) => {
        const searchText = e.target.value;
        setFilter({ search: searchText });
    };
    const statusOptions = [
        { value: "payed-status", label: "Soldée", color: "#53BC57" },
        { value: "part-payed", label: "Part-soldée", color: "#F1B519" },
        { value: "impayed", label: "Non soldée", color: "#EC5252" },
    ];
    const StatusButton = (
        status: "payed-status" | "impayed" | "part-payed",
    ) => {
        let colorStyle = "#EC5252";
        let text = "Non soldée";
        switch (status) {
            case "payed-status":
                colorStyle = "#53BC57";
                text = "Soldée";
                break;
            case "part-payed":
                colorStyle = "#F1B519";
                text = "Part-soldée";
                break;
            default:
        }
        return (
            <div
                style={{
                    display: "inline",
                    padding: "5px 15px",
                    borderRadius: 4,
                    backgroundColor: colorStyle,
                    color: "white",
                    fontWeight: 700,
                    minWidth: 100,
                    textAlign: "center",
                    fontSize: 14,
                }}
            >
                {text}
            </div>
        );
    };
    // const statusOptions = [
    //     {
    //         value: "payed",
    //         label: StatusButton("payed"),
    //     },
    //     {
    //         value: "impayed",
    //         label: StatusButton("impayed"),
    //     },
    //     {
    //         value: "part-payed",
    //         label: StatusButton("part-payed"),
    //     },
    // ];
    const tableContent = () => {
        const dataRows = invoicing.list.map((oneRow: any) => {
            const generalInvoiceInfo = [
                {
                    value: (
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: "small",
                            }}
                        >
                            {oneRow.ref}
                        </div>
                    ),
                },
                {
                    value: (
                        <Link to={ROUTER.PATIENT_PROFILE(oneRow.idP)}>
                            {oneRow.firstNameP} {oneRow.lastNameP}
                        </Link>
                    ),
                },
                { value: oneRow.creationDate },
                { value: oneRow.totalAmount },
                { value: oneRow.payedAmount },
                { value: oneRow.restAmount },
                { value: StatusButton(oneRow.status) },
            ];
            // const detailedInvoice = oneRow.details.map((detailInvoiceItem) => {
            //     if (detailInvoiceItem.type === "payment") {
            //         return [
            //             { value: "" },
            //             {
            //                 value: <div>Montant payé</div>,
            //             },
            //             {
            //                 value: `${detailInvoiceItem.date} ${detailInvoiceItem.time}`,
            //             },
            //             {
            //                 value: `${detailInvoiceItem.cost} TND`,
            //             },
            //         ];
            //     } else {
            //         return [
            //             { value: "" },
            //             {
            //                 value: <div>Montant à payer</div>,
            //             },
            //             {
            //                 value: `${detailInvoiceItem.date} ${detailInvoiceItem.time}`,
            //             },
            //             {
            //                 value: `${detailInvoiceItem.cost} TND avec ${detailInvoiceItem.paidAmount} payé`,
            //             },
            //         ];
            //     }
            // });
            // const InvoiceDetailedComponent = () => {
            //     const paymentDuringAppt = (paidAmoint: number) => {
            //         if (paidAmoint > 0) {
            //             return `[${paidAmoint}TND payé]`;
            //         } else {
            //             return "[Aucun paiement]";
            //         }
            //     };
            //     return (
            //         <>
            //             {oneRow.details.map(
            //                 (detailedInvoice: any, index: any) => {
            //                     return (
            //                         <tr
            //                             key={index}
            //                             style={{
            //                                 backgroundColor:
            //                                     index % 2
            //                                         ? "white"
            //                                         : "var(--wh-slate-200)",
            //                             }}
            //                         >
            //                             <td colSpan={9}>
            //                                 <div
            //                                     style={{
            //                                         display: "flex",
            //                                         justifyContent: "center",
            //                                         alignItems: "center",
            //                                         gap: "15%",
            //                                     }}
            //                                 >
            //                                     <div
            //                                         style={{
            //                                             width: "10%",
            //                                             display: "flex",
            //                                             justifyContent:
            //                                                 "center",
            //                                             textAlign: "left",
            //                                         }}
            //                                     >
            //                                         {detailedInvoice.type ==
            //                                         "payment"
            //                                             ? "Montant payé"
            //                                             : "Montant à payer"}
            //                                     </div>
            //                                     <div
            //                                         style={{
            //                                             width: "10%",
            //                                             display: "flex",
            //                                             justifyContent:
            //                                                 "center",
            //                                             textAlign: "left",
            //                                         }}
            //                                     >
            //                                         {`${detailedInvoice.date} ${detailedInvoice.time}`}
            //                                     </div>
            //                                     <div
            //                                         style={{
            //                                             width: "20%",
            //                                             display: "flex",
            //                                             justifyContent:
            //                                                 "center",
            //                                             textAlign: "left",
            //                                         }}
            //                                     >
            //                                         {detailedInvoice.type ==
            //                                         "payment"
            //                                             ? `${detailedInvoice.cost} TND`
            //                                             : `${
            //                                                   detailedInvoice.cost
            //                                               } TND + ${paymentDuringAppt(
            //                                                   detailedInvoice.paidAmount
            //                                               )}`}
            //                                     </div>
            //                                 </div>
            //                             </td>
            //                         </tr>
            //                     );
            //                 }
            //             )}
            //         </>
            //     );
            // };
            return {
                dataRow: generalInvoiceInfo,
                id: oneRow.id,
                style: {},
                onClickRow: () => {
                    handleMoreDetailsOnInvoiceByID(oneRow.id);
                },
                isExtraDataOpen: false,
                extraData: null, //<InvoiceDetailedComponent />,
            };
        });
        return {
            header: {
                dataHead: [
                    { value: "Réf." },
                    { value: "Patient" },
                    { value: "Date de Facturation" },
                    { value: "Montant Total" },
                    { value: "Montant Payé" },
                    { value: "Montant Restant" },
                    { value: "État" },
                ],
                style: {},
                onClickRow: () => {},
            },
            data: dataRows,
        };
    };
    const handleStatus = (data: any) => {
        const filter = data.map((status: any) => status.value);
        setFilter({ status: filter });
    };
    const handleDateFacture = (data: any) => {
        const dateFacturation = data.target.value;
        setFilter({ createdAt: dateFacturation });
    };

    const [isAddPaymentCardOpen, setIsAddPaymentCardOpen] =
        React.useState(false);
    const handleAddNewPayment = (invoiceID: string) => {
        selectInvoice(invoiceID);
        setIsAddPaymentCardOpen(true);
    };
    const handleOnCloseAddPaymentCard = () => {
        setIsAddPaymentCardOpen(false);
    };
    const handleSubmitAddNewPayment = async (paymentAmount: any) => {
        await createNewPayment(paymentAmount);
        await getAllInvoices();
    };

    const [isInvoicePopupDisplayed, setIshowInvoicePopupDisplayed] =
        React.useState(false);
    const handleMoreDetailsOnInvoiceByID = async (invoiceID: string) => {
        try {
            await getInvoiceByID(invoiceID);
            await setIshowInvoicePopupDisplayed(true);
        } catch (e: any) {
            console.log("error from server");
        }
    };
    const handleOnCloseInvoicePopup = () => {
        setIshowInvoicePopupDisplayed(false);
    };

    // const handleAssociateAppointment = () => {};
    return (
        <div className="invoicing-page">
            <div className="page-title">Facturation</div>
            {/*<div className='head main-box'>
                <Button
                    text={`${isIncome ? "Ajouter Revenus" : "Ajouter Dépense"}`}
                    iconName='add'
                    iconWidth={20}
                    iconHeight={20}
                    iconColor='white'
                    onClick={handleOpenCard}
                />
                <AddInvoicingCard
                    display={showAddCard}
                    onClose={handleCloseCard}
                />
                <div className='invoicing-views-tabs'>
                    <Button
                        text='Revenus'
                        onClick={toggleInvoicingView}
                        style={{
                            backgroundColor: `${
                                isIncome ? "var(--color-1)" : "transparent"
                            }`,
                            color: `${!isIncome ? "var(--color-1)" : "white"}`,
                            borderRadius: 0,
                        }}
                    />
                    <Button
                        text='Dépenses'
                        onClick={toggleInvoicingView}
                        style={{
                            backgroundColor: `${
                                !isIncome ? "var(--color-1)" : "transparent"
                            }`,
                            color: `${isIncome ? "var(--color-1)" : "white"}`,
                            borderRadius: 0,
                        }}
                    />
                </div> 
            </div>*/}
            <div className="invoicing-list main-box">
                <form className="filters">
                    <div>
                        <label htmlFor="search">Rechercher </label>
                        <div className="search">
                            <SVGIcon
                                type={"search"}
                                color="var(--color-1)"
                                width={25}
                                height={25}
                            />
                            <input
                                style={{
                                    height: "38px",
                                }}
                                type="text"
                                placeholder="Rechercher"
                                name="search"
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="status">
                        <label htmlFor="">Statut </label>
                        <Select
                            styles={{
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                control: (styles: any) => ({
                                    ...styles,
                                    minWidth: "140px",
                                    width: "fit-content",
                                    height: "40px",
                                    border: "1px solid var(--color-2)",
                                }),
                                placeholder: (base: any) => ({
                                    ...base,
                                    fontSize: "16px",
                                }),
                                option: (
                                    styles: any,
                                    { data, isSelected }: any,
                                ) => {
                                    return {
                                        ...styles,
                                        color: isSelected
                                            ? "white"
                                            : data.color,
                                        backgroundColor: isSelected
                                            ? data.color
                                            : "",
                                        fontWeight: "400",
                                        ":hover": {
                                            backgroundColor: data.color,
                                            color: "white",
                                            cursor: "pointer",
                                        },
                                    };
                                },
                                multiValue: (styles: any, { data }: any) => {
                                    return {
                                        ...styles,
                                        backgroundColor: data.color,
                                        fontWeight: "500",
                                    };
                                },
                                multiValueLabel: (styles: any) => {
                                    return { ...styles, color: "white" };
                                },
                                multiValueRemove: (styles: any) => {
                                    return {
                                        ...styles,
                                        color: "white",
                                        ":hover": {},
                                    };
                                },
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    height: "35px",
                                }),

                                indicatorsContainer: (provided) => ({
                                    ...provided,
                                    height: "35px",
                                }),

                                // control: (provided, state) => ({
                                //     ...provided,
                                //     height: "40px",
                                //     border: "1px solid var(--color-2)",
                                // }),
                                // option: (provided, state) => ({
                                //     ...provided,
                                //     textAlign: "center",
                                //     textWrap: "nowrap",
                                //     padding: "8px 4px",
                                // }),

                                // input: (provided, state) => ({
                                //     ...provided,
                                //     margin: 0,
                                //     padding: 0,
                                // }),
                                // indicatorSeparator: (state) => ({
                                //     display: "none",
                                // }),
                                // indicatorsContainer: (provided, state) => ({
                                //     ...provided,
                                //     height: "38px",
                                // }),
                            }}
                            options={statusOptions}
                            onChange={handleStatus}
                            isMulti
                            // menuIsOpen={true}
                        />
                    </div>
                    <div className="date">
                        <label htmlFor="">Date </label>
                        <input type="date" onChange={handleDateFacture} />
                    </div>
                </form>
                <InvoiceDetailsCard
                    display={isInvoicePopupDisplayed}
                    handleClose={handleOnCloseInvoicePopup}
                    data={invoicing.invoice}
                />
                <div className="list">
                    <Table
                        tableDataStructure={tableContent()}
                        // paginationState={pagination}
                        tableOptions={[
                            {
                                label: "Ajouter Paiement",
                                icon: <CartSVG width={20} height={20} />,
                                link: null,
                                onClick: handleAddNewPayment,
                            },
                            // {
                            //     label: "Associer Rendez-vous",
                            //     icon: <CardSVG />,
                            //     link: null,
                            //     onClick: handleAssociateAppointment,
                            // },
                        ]}
                        loading={invoicing.loading}
                        noDataMessage="Aucune facture trouvée"
                    />
                    <AddPaymentCard
                        display={isAddPaymentCardOpen}
                        onClose={handleOnCloseAddPaymentCard}
                        onCancel={handleOnCloseAddPaymentCard}
                        onSubmit={handleSubmitAddNewPayment}
                    />
                </div>
            </div>
        </div>
    );
}
