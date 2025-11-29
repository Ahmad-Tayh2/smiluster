import { retrieveExporedStock } from "../../services/Stock/getExporedStock";

export async function getExporedStock(req: any, res: any) {
    
    try{
        const licenseID = req.license.licenseID;
        const stock = await retrieveExporedStock(licenseID);
        res.status(200).json(stock);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}