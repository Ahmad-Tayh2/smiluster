import React from "react";
import Modal from "../Modal";
import PopupCard from "../PopupCard";
import { useStock } from "../../hooks/useStock";

import "./style.css";
export default function AddProductCard(props: any) {
    const { display, onClose } = props;
    const { stock, handleAddProduct, handleGetProducts } = useStock();

    const [newProduct, setNewProduct] = React.useState({
        productName: "",
    });
    const onProductChange = (e: any) => {
        const { name, value } = e.target;
        setNewProduct((prev: any) => ({ ...prev, [name]: value }));
    };
    const handleClose = () => {
        setNewProduct({
            productName: "",
        });
        onClose && onClose();
    };
    const addProduct = async () => {
        let ok = await handleAddProduct(newProduct);
        if (ok) {
            await handleGetProducts();
            handleClose();
        }
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
            text: "Ajouter",
            style: {
                backgroundColor: "var(--color-1)",
                color: "white",
                border: "2px solid var(--color-1)",
                fontWeight: "bold",
            },
            onClick: addProduct,
        },
     
    ];
    const limit = 35;
    return (
        <Modal modalEnabled={display} onClose={handleClose}>
            <PopupCard
                title={"Ajouter un produit"}
                activatedFooter={true}
                onClose={handleClose}
                display={display}
                buttons={buttons}
                style={{
                    width: "350px",
                }}
            >
                <form
                    style={{
                        display: "flex",
                        gap: "var(--main-gap)",
                        flexDirection: "column",
                    }}
                >
                    <div>
                        <label
                            htmlFor='productName'
                            style={{
                                display: "flex",
                            }}
                        >
                            Nom du produit
                            <Star />
                            <span
                                style={{
                                    marginLeft: "auto",
                                }}
                            >
                                <span
                                    style={{
                                        color:
                                            limit -
                                                newProduct.productName.length >
                                            10
                                                ? "var(--success-color)"
                                                : limit -
                                                      newProduct.productName
                                                          .length >
                                                  3
                                                ? "var(--warning-color)"
                                                : "var(--danger-color)",
                                        fontWeight:
                                            limit ===
                                            newProduct.productName.length
                                                ? "bold"
                                                : "",
                                    }}
                                >
                                    {newProduct.productName.length}
                                </span>
                                /{limit}
                            </span>
                        </label>
                        <input
                            type='text'
                            id='productName'
                            name='productName'
                            value={newProduct.productName}
                            onChange={onProductChange}
                            maxLength={limit}
                        />
                    </div>

                    {stock.productError && (
                        <div className='form-error'>{stock.productError}</div>
                    )}
                </form>
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
