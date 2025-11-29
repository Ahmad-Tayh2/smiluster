import { Product, Stock } from "../../models";
import { dropStock } from "../Stock/deleteStock";

export async function dropProduct(productID: number, licenseID: number) {
    try{
        const stocks = await Stock.findAll({where: { productID, licenseID }});
        for(const stock of stocks){
            await dropStock(stock.stockID, licenseID);
        }
        const product = await Product.destroy({ where: { productID, licenseID } });
        
        return product;
    } catch(error: any){
        throw new Error(error);
    }
}