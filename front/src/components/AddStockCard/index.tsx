import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import AddProductCard from "../AddProductCard";
import Button from "../Button";
import DeleteCard from "../DeleteCard";
import SVGIcon from "../SVGIcon";

import { useStock } from "../../hooks/useStock";
import "./style.css";
export default function AddStockCard(props: AddStockCardProps) {
    const { display, onClose, toEdit } = props;
    const {
        stock,
        handleAddStock,
        handleUpdateStock,
        handleRemoveErrors,
        handleGetProducts,
        handleDeleteProduct,
    } = useStock();
    React.useEffect(() => {
        if (display) {
            handleGetProducts();
        }
    }, [display]);
    const [newStock, setNewStock] = React.useState<any>({
        productID: "",
        quantity: 0,
        price: 0,
        provider: "",
        note: "",
        expiredDate: "",
    });
    const [isExpired, setIsExpired] = React.useState(false);
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setNewStock((prev: any) => ({ ...prev, [name]: value }));
    };
    const productsOptions = stock.products?.map((product: any) => ({
        value: product.productID,
        label: product.productName,
    }));
    const [selectedProductOption, setSelectedProductOption] =
        React.useState<any>(null);
    const onAddStock = async () => {
        let stockToCreate: any = {
            productID: newStock.productID,
            quantity: newStock.quantity,
            price: newStock.price,
            provider: newStock.provider,
            note: newStock.note,
        };
        if (isExpired && newStock.expiredDate !== "") {
            stockToCreate.expiredDate = newStock.expiredDate;
        }
        const ok = await handleAddStock(stockToCreate);
        if (ok) {
            handleClose();
        }
    };
    const onUpdateStock = async () => {
        const ok = await handleUpdateStock(newStock, toEdit.stockID);
        if (ok) {
            handleClose();
        }
    };
    React.useEffect(() => {
        if (toEdit) {
            let editedStock: any = {
                productID: toEdit.productID,
                quantity: toEdit.quantity,
                price: toEdit.price,
                provider: toEdit.provider,
            };
            if (toEdit.note) {
                editedStock.note = toEdit.note;
            }
            if (toEdit.expiredDate) {
                editedStock.expiredDate = new Date(toEdit.expiredDate)
                    .toISOString()
                    .split("T")[0];
                setIsExpired(true);
            }
            setSelectedProductOption({
                label:
                    productsOptions?.find(
                        (option: any) => option.value === toEdit.productID,
                    )?.label || toEdit.productID,
                value: toEdit.productID,
            });
            setNewStock(editedStock);
        }
    }, [toEdit]);
    const handleClose = () => {
        setNewStock({
            productID: "",
            quantity: 0,
            price: 0,
            provider: "",
            note: "",
            expiredDate: "",
        });
        setIsExpired(false);
        setSelectedProductOption(null);
        handleRemoveErrors();
        onClose && onClose();
    };
    const buttons = [
        {
            text: "Annuler",
            style: {
                backgroundColor: "white",
                color: "var(--gray-1)",
                border: "2px solid var(--gray-1)",
                fontWeight: "bold",
            },
            onClick: handleClose,
        },
        {
            text: toEdit ? "Modifier" : "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: toEdit ? onUpdateStock : onAddStock,
        },
    ];

    const colorStyles = {
        control: (styles: any, state: any) => ({
            ...styles,
            width: "225px",
            maxWidth: "100%",
            height: "40px",
            border: "none",
            backgroundColor: state.isFocused ? "white" : "var(--gray-0)",
            transition: " 0.2s ease-in-out",
        }),
        placeholder: (base: any) => ({
            ...base,
            fontSize: "16px",
        }),
        menu: (provided: any) => ({
            ...provided,
            maxHeight: "220px",
            overflowY: "auto",
        }),
        option: (styles: any, { data, isSelected }: any) => {
            return {
                ...styles,
                color: isSelected ? "white" : data.color,
                backgroundColor: isSelected ? "var(--color-1)" : "white",
                fontWeight: "400",
                cursor: "pointer",
            };
        },
    };
    const [openProductCard, setOpenProductCard] =
        React.useState<boolean>(false);
    const [showDeleteCard, setShowDeleteCard] = React.useState(false);
    const [product, setProduct] = React.useState<any>(null);
    const handleOnDeleteProduct = async () => {
        const ok = await handleDeleteProduct(product?.productID || "");
        if (ok) {
            await handleGetProducts();
            setShowDeleteCard(false);
        }
    };
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={`${toEdit ? "Modifier le" : "Ajouter un"} stock`}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={buttons}
            >
                <div className='add-stock-form'>
                    <AddProductCard
                        display={openProductCard}
                        onClose={() => setOpenProductCard(false)}
                    />
                    <DeleteCard
                        display={showDeleteCard}
                        onClose={() => {
                            setShowDeleteCard(false);
                            setProduct(null);
                        }}
                        onDelete={handleOnDeleteProduct}
                        name={`le produit "${product?.productName || ""}"`}
                        additionalText='Attention !! En supprimant ce produit, tous les stocks associés seront également supprimés..'
                        alert={true}
                    />
                    <form
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        <div className='add-stock-infos'>
                            <div className='info-item'>
                                <label htmlFor='productId'>
                                    Choisir un produit
                                    <Star />
                                </label>
                                {/* <input
                                    id='productId'
                                    name='productId'
                                    type='text'
                                    value={stock.productId}
                                    onChange={handleOnChange}
                                /> */}
                                {/* <Select
                                    options={productsOptions}
                                    styles={colorStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: "var(--color-1)",
                                        },
                                    })}
                                    isSearchable={true}
                                    placeholder='Selectionner...'
                                    noOptionsMessage={() => "Aucune option"}
                                    value={selectedProductOption}
                                    onChange={(item) => {
                                        if (item?.value) {
                                            setNewStock((prev: any) => ({
                                                ...prev,
                                                productID: item.value,
                                            }));
                                            setSelectedProductOption({
                                                label: item.label,
                                                value: item.value,
                                            });
                                        }
                                    }}
                                /> */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "var(--s-gap)",
                                        flexWrap: "wrap",
                                        width: "100%",
                                    }}
                                >
                                    {stock.products?.map((product: any) => {
                                        return (
                                            <div
                                                className='center product-container'
                                                style={{
                                                    backgroundColor:
                                                        newStock.productID ===
                                                        product.productID
                                                            ? "var(--color-2)"
                                                            : "var(--color-2)",
                                                    height: "40px",
                                                    minWidth: "45px",
                                                    padding: "var(--pd-1)",
                                                    borderRadius:
                                                        "var(--main-rd)",
                                                    color: "var(--color-1)",
                                                    fontWeight: "bold",
                                                    cursor: "pointer",
                                                    border: "3px solid",
                                                    borderColor:
                                                        newStock.productID ===
                                                        product.productID
                                                            ? "var(--color-1)"
                                                            : "var(--color-2)",
                                                    opacity:
                                                        newStock.productID ===
                                                        product.productID
                                                            ? "1"
                                                            : "0.8",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                }}
                                                onClick={() => {
                                                    setNewStock(
                                                        (prev: any) => ({
                                                            ...prev,
                                                            productID:
                                                                product.productID,
                                                        })
                                                    );
                                                }}
                                            >
                                                <div>{product.productName}</div>
                                                <div
                                                    className='center delete-product-icon'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowDeleteCard(true);
                                                        setProduct(product);
                                                    }}
                                                    style={{
                                                        backgroundColor:
                                                            "var(--danger-color)",
                                                        height: "100%",
                                                        width: "40px",
                                                        position: "absolute",
                                                        borderRadius:
                                                            "var(--main-rd)",
                                                    }}
                                                >
                                                    <SVGIcon
                                                        type='trash'
                                                        color='white'
                                                        // height={30}
                                                        // width={30}
                                                    />
                                                </div>
                                                {/* <div
                                                    style={{
                                                        fontSize: "11px",
                                                        color: "var(--color-3)",
                                                    }}
                                                >
                                                    min: {product.minQuantity}
                                                </div> */}
                                            </div>
                                        );
                                    })}
                                    <div
                                        className='center'
                                        style={{
                                            backgroundColor: "var(--color-3)",
                                            height: "40px",
                                            width: "40px",
                                            padding: "var(--pd-1)",
                                            borderRadius: "var(--main-rd)",
                                            color: "var(--color-1)",
                                            fontWeight: "bold",
                                            fontSize: "x-large",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setOpenProductCard(true)}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                            <div className='info-item'>
                                <label htmlFor='quantity'>
                                    Qantité
                                    <Star />
                                </label>
                                <input
                                    id='quantity'
                                    name='quantity'
                                    type='number'
                                    min={0}
                                    value={newStock.quantity}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor='price'>
                                    Prix
                                    <Star />
                                </label>
                                <input
                                    id='price'
                                    name='price'
                                    type='number'
                                    min={0}
                                    value={newStock.price}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className='info-item'>
                                <label htmlFor=''>
                                    Fournisseur
                                    <Star />
                                </label>
                                <input
                                    name='provider'
                                    type='text'
                                    value={newStock.provider}
                                    onChange={handleOnChange}
                                />
                            </div>
                            {isExpired ? (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            gap: "var(--main-gap)",
                                        }}
                                    >
                                        <div
                                            className='info-item'
                                            style={{
                                                width: "100%",
                                            }}
                                        >
                                            <label htmlFor='expiredDate'>
                                                Date d'expiration
                                            </label>
                                            <input
                                                id='expiredDate'
                                                name='expiredDate'
                                                type='date'
                                                value={newStock.expiredDate}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                        <Button
                                            iconName='remove'
                                            iconWidth={20}
                                            iconHeight={20}
                                            iconColor='var(--danger-color)'
                                            onClick={() => {
                                                setIsExpired(false);
                                                setNewStock((prev: any) => ({
                                                    ...prev,
                                                    expiredDate: "",
                                                }));
                                            }}
                                            style={{
                                                backgroundColor:
                                                    "var(--color-3)",
                                                color: "var(--color-1)",
                                                width: "fit-content",
                                                height: "fit-content",
                                                padding: "5px",
                                                marginTop: "19%",
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <Button
                                    text="Ajouter une date d'expiration"
                                    iconName='add'
                                    iconWidth={20}
                                    iconHeight={20}
                                    iconColor='var(--color-1)'
                                    onClick={() => setIsExpired(true)}
                                    style={{
                                        backgroundColor: "var(--color-3)",
                                        color: "var(--color-1)",
                                        width: "auto",
                                        height: "40px",
                                        gap: "5px",
                                        fontWeight: "600",
                                        marginTop: "auto",
                                    }}
                                />
                            )}
                            <div className='info-item'>
                                <label htmlFor='note'>Note</label>
                                <textarea
                                    id='note'
                                    name='note'
                                    value={newStock.note}
                                    onChange={handleOnChange}
                                ></textarea>
                            </div>
                        </div>
                    </form>
                    {stock.create.error /*&& !toEdit*/ ? (
                        <div className='form-error'>{stock.create.error}</div>
                    ) : (
                        stock.edit.error && (
                            /* toEdit &&*/ <div className='form-error'>
                                {stock.edit.error}
                            </div>
                        )
                    )}
                </div>
            </PopupCard>
        </Modal>
    );
}
const Star = () => {
    return (
        <span
            style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "medium",
                padding: "0 2px",
            }}
        >
            *
        </span>
    );
};
interface AddStockCardProps {
    display: boolean;
    onClose?: () => void;
    toEdit?: any;
}
