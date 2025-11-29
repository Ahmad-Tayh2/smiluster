import { Facture } from "../../models";
import { modifyFacture } from "./updateFacture";

export async function createNewFacture(newFactureData: FactureAttributes){
    try{
        let facture = await Facture.create({...newFactureData});
        const date = new Date();
        const factureRef = `FACT-${date.getFullYear()}-${facture.factureID.toString().padStart(6, '0')}`;
        facture.factureRef = factureRef;
        const fact = await modifyFacture(facture.dataValues);
        return fact;

    } catch (err: any){
        throw new Error(err);
    }
    
}

interface FactureAttributes {
    licenseID: number,
    factureID?: number;
    totalAmount?: number;
}
