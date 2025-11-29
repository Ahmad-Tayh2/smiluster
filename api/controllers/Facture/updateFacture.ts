import { modifyFacture } from "../../services/Facture/updateFacture";


export async function updateFacture(req: any, res: any) { 
    try{
        const factureID = req.params.factureID
        let updatedFactureData = req.body;
        updatedFactureData.licenseID = req.license.licenseID;
        if (!updatedFactureData) {
            return res.status(400).json({ error: 'All fields must be filled' });
        }
        const facture = await modifyFacture({
            factureID, 
            ...updatedFactureData
        });

        res.status(200).json(facture);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}