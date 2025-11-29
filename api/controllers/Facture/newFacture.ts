import { createNewFacture } from "../../services/Facture/newFacture";

export async function newFacture(req: any, res: any) {
    let newFactureData = req.body;
    newFactureData.licenseID = req.license.licenseID;
    try{
        const facture = await createNewFacture(newFactureData);

        res.status(200).json(facture);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}