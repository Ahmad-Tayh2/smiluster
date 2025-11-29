import { Stock } from "../../models";

export async function dropStock(stockID: number, licenseID: number) {
    try{
        const stock = await Stock.destroy({ where: { stockID, licenseID } });
        return stock;
    } catch(error: any){
        throw new Error(error);
    }
}