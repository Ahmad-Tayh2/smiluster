import { Stock } from "../../models";

export async function modifyStock(updatedStock: StockAttributes) {

    const exists = await Stock.findOne({ where: { stockID:  updatedStock.stockID} });

    if (!exists) {
        throw new Error('Stock does not exist');
    }

    const nbStocks = await Stock.update(updatedStock, {
        where: { stockID: updatedStock.stockID }
    });

    return await Stock.findOne({ where: { stockID:  updatedStock.stockID} });
}

interface StockAttributes {
    stockID: number;
    productID: number;
    quantity: number;
    price: number;
    provider: string;
    note: string;
    expiredDate?: Date;
}
