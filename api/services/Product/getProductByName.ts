import { Product } from "../../models";

export async function retrieveProductByName(productName: any, licenseID: number){
    try{
        const product = await Product.findOne({ where: { productName, licenseID } });

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    } catch(error: any){
        throw new Error(error);
    }
}