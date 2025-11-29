import { Facture } from "../../models";

export async function dropFacture(factureID: number, licenseID: number) {
    try{
        const facture = await Facture.destroy({ where: { factureID, licenseID } });
        return facture;
    } catch(error: any){
        throw new Error(error);
    }
}