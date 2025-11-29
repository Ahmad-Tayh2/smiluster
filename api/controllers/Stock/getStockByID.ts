import { retrieveStockByID } from "../../services/Stock/getStockByID";

export async function getStockByID(req: any, res: any) {
    const stockID =  req.params.stockID;
    const licenseID = req.license.licenseID;
    try{
        const stock = await retrieveStockByID(stockID, licenseID);
        res.status(200).json(stock);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}