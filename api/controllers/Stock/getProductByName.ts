import { retrieveProductByName } from "../../services/Product/getProductByName";

export async function getProductByName(req: any, res: any) {
    const productNameParam = req.params.productName; 
    const licenseID = req.license.licenseID;
    try {
        const product = await retrieveProductByName(productNameParam, licenseID);
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
