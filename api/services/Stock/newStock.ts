import { Stock } from "../../models";

export async function createNewStock(newStockData: StockAttributes){

    try{
        const stock = await Stock.create({...newStockData});
        return stock;
    }catch(err:any){
        throw new Error("Failed to create new stock");
    }
    
}

interface StockAttributes {
    stockID: number;
    productID: number;
    quantity: number;
    price: number;
    provider: string;
    note?: string;
    expiredDate?: Date;
}
