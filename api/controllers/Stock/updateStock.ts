import { modifyStock } from "../../services/Stock/updateStock";


export async function updateStock(req: any, res: any) {
    const stockID = req.params.stockID
    let newStockData = req.body;
    newStockData.licenseID = req.license.licenseID; 
    try{
        const stock = await modifyStock({stockID, ...newStockData});

        res.status(200).json(stock);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}