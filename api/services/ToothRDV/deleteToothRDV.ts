import { error } from "console";
import { ToothRDV } from "../../models";

export async function dropToothRDV(appointmentID: number, toothID: number) {
    try{
        const exist = await ToothRDV.findOne({where: {appointmentID, toothID}});
        if(!exist){
            throw new Error('Element Does not exist !!')
        }
        const toothRDV = await ToothRDV.destroy({where: {appointmentID, toothID}});
        return toothRDV;
    } catch(error: any){
        throw new Error(error);
    }
}