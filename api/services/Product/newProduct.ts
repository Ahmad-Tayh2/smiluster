import { Product } from "../../models";

export async function createNewProduct(newProductData: ProductAttributes){
    const exists = await Product.findOne({ where: { productName: newProductData.productName } });

    if(!newProductData.productName){
        throw new Error('Enter a Product Name!');
    }

    if (exists) {
        throw new Error('Product name already exists');
    }

    const product = await Product.create({...newProductData});
    return product;
}

interface ProductAttributes {
    productID: number;
    productName: string;
    minQuantity: number;
    licenseID: number;
}
