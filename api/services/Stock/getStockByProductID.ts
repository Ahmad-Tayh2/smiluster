import { Stock } from "../../models";

export async function retrieveStockByProductID(productID: number, licenseID: number){
    try{
        const stock = await Stock.findOne({where : { productID, licenseID }});

        if(!stock){
            throw new Error("Stock not found");
        }

        return stock;
    } catch(error: any){
        throw new Error(error);
    }
}