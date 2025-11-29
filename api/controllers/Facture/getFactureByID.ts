import { retrieveFacture } from "../../services/Facture/getFactureByID";

export async function getFactureByID(req: any, res: any) {
    try{
        const licenseID = req.license.licenseID;
        const facture = await retrieveFacture(req.params.factureID, licenseID);
        if(!facture){
            return res.status(404).json({ error: 'Facture not found' });
        }
        res.status(200).json(facture);
    } catch (err: any){
        res.status(500).json({ error: err.message });
    }
}