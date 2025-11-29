import { Product } from "../../models";

export async function retrieveAllProductsByLicence(dynamicQuery: any) {
    try{
        const products = await Product.findAll(dynamicQuery);
        return products;
    } catch(error: any){
        throw new Error(error);
    }
}