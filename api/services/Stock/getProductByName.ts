import { Product } from "../../models";

export async function retrieveProductByName(productName: any){
    try{
        const product = await Product.findOne({ where: { productName:  productName} });

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    } catch(error: any){
        throw new Error(error);
    }
}