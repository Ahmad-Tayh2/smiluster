import { Product } from "../../models";

export async function modifyProduct(updatedProduct: ProductAttributes) {
    const { productID, licenseID } = updatedProduct;
    const exists = await Product.findOne({ where: { productID, licenseID} });

    if (!exists) {
        throw new Error('Product does not exist');
    }

    const nbProducts = await Product.update(updatedProduct, {
        where: { productID }
    });

    return await Product.findOne({ where: { productID } });
}

interface ProductAttributes {
    productID: number;
    productName: string;
    minQuantity: number;
    licenseID: number;
}