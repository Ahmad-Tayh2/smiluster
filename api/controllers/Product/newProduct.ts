import { createNewProduct } from "../../services/Product/newProduct";

export async function newProduct(req: any, res: any){
    let newProductData = req.body;
    newProductData.licenseID = req.license.licenseID;
    try {
  
      const product = await createNewProduct(newProductData);
  
      res.status(200).json(product);
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}