import { createNewProduct } from "../../services/Product/newProduct";
import { createNewStock } from "../../services/Stock/newStock";

export async function newStock(req: any, res: any){
    let newStockData = req.body;
    newStockData.licenseID = req.license.licenseID;
    try {
      if(!newStockData.productID ){
        try {
            const newProductData = req.body.newProduct;
            newProductData.licenseID = newStockData.licenseID;
            if (!newProductData || !newProductData.licenseID || !newProductData.productName || !newProductData.minQuantity) {
                throw new Error('Fill the fields for the new patient');
            }

            const product = await createNewProduct(newProductData);
            newStockData.productID = product.productID;
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
      if (
        !newStockData.productID ||
        !newStockData.quantity ||
        !newStockData.price ||
        !newStockData.provider
    ){
      throw new Error("Invalid stock data");
    }
      const stock = await createNewStock(newStockData);
  
      res.status(200).json(stock);
  
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
}