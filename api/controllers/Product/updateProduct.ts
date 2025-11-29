import { modifyProduct } from "../../services/Product/updateProduct";


export async function updateProduct(req: any, res: any) {
    const productID = req.params.productID
    let newProductData = req.body;
    newProductData.licenseID = req.license.licenseID;
    try{
        const product = await modifyProduct({productID, ...newProductData});

        res.status(200).json(product);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}