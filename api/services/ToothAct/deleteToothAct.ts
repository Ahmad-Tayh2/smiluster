import calculeTotalNeededAmount from "../../helpers/Facture/calculeTotalNeededAmount";
import { ToothAct } from "../../models";
import { retrieveAppointmentByID } from "../Appointment/retrieveAppointmentByID";

export async function dropToothAct(toothActID: number, licenseID: number) {
    try{
        const exist = await ToothAct.findOne({where: { toothActID, licenseID }});
        if(!exist){
            throw new Error('this toothActID Not Exist!');
        }
        const toothAct = await ToothAct.destroy({where: { toothActID, licenseID }});
        if(exist.appointmentID){
            const factureID = (await retrieveAppointmentByID(exist.appointmentID, licenseID)).factureID;
            if(factureID){
                await calculeTotalNeededAmount(exist.appointmentID, licenseID);
            }
            
        }
        
        return toothAct;
    } catch(error: any){
        throw new Error(error);
    }
}