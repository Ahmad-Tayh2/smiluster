import { retrieveStockByProductID } from "../../services/Stock/getStockByProductID";

export async function getStockByProductID(req: any, res: any) {
    const productID =  req.params.productID;
    const licenseID = req.license.licenseID;
    try{
        const stock = await retrieveStockByProductID(productID, licenseID);
        res.status(200).json(stock);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}