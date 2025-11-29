import { retrieveProductByID } from "../../services/Product/getProductByID";

export async function getProductByID(req: any, res: any) {
    const productID =  req.params.productID;
    const licenseID = req.license.licenseID;
    try{
        const product = await retrieveProductByID(productID, licenseID);
        res.status(200).json(product);
    } catch(error: any){
        res.status(500).json({error: error.message});
    }
}