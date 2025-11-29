import { Product } from "../../models";

export async function retrieveProductByID(productID: number, licenseID: number){
    try{
        const product = await Product.findOne({ where : { productID, licenseID }});

        if(!product){
            throw new Error("Product not found");
        }

        return product;
    } catch(error: any){
        throw new Error(error);
    }
}