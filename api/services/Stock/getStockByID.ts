import { Stock } from "../../models";

export async function retrieveStockByID(stockID: number, licenseID: number ){
    try{
        const stock = await Stock.findOne({where : { stockID, licenseID }});

        if(!stock){
            throw new Error("Stock not found");
        }

        return stock;
    } catch(error: any){
        throw new Error(error);
    }
}