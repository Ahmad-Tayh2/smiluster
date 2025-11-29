import { Facture } from "../../models";

export async function modifyFacture(updatedFacture: any) {
    try{
        const {
            factureID,
            closedAt,
            restAmount
        } = updatedFacture
        const exists = await Facture.findOne({ where: { factureID } });

        if (!exists) {
            throw new Error('Facture Key does not exists');
        }

        if(exists.closedAt){
            throw new Error('Can not edit a Facture closed!');
        }
        
        if(closedAt && (restAmount!==0 && restAmount)){
            throw new Error('can not closed a facture with rest more then 0');
        }

        if(closedAt && (exists.restAmount!==0 && restAmount!==0)){
            throw new Error('can not closed a facture with rest more then 0');
        }

        const nbFactures = await Facture.update(updatedFacture, {
            where: { factureID }
        });

        return await Facture.findOne({ where: { factureID } });
    } catch (err: any){
        throw new Error(err);
    }
    
}
