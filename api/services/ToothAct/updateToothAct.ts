import calculeTotalNeededAmount from "../../helpers/Facture/calculeTotalNeededAmount";
import { Act, Appointment, Tooth, ToothAct } from "../../models";
import { retrieveAppointmentByID } from "../Appointment/retrieveAppointmentByID";

export async function modifyToothAct(toothActID: number, newData: any) {
    try{
        let {
            toothID,
            actID,
            appointmentID,
            licenseID
        } = newData;
        const exist = await ToothAct.findOne({where: { toothActID, licenseID }});
        if(!exist){
            throw new Error('This element does not exist');
        }

        if(!toothID){
            toothID = exist.toothID;   
        }

        const toothExist = await Tooth.findOne({where: { toothID, licenseID }});
        if(!toothExist){
            throw new Error('The tooth id you provide does not exist');
        }
        
        if(!actID){
            actID = exist.actID;
        }

        const actExist = await Act.findOne({where: { actID, licenseID }});
        if(!actExist){
            throw new Error('The act id you provide does not exist');
        }
        
        if(!appointmentID){
            appointmentID = exist.appointmentID;
        }
        if(appointmentID){
            const appointmentExist = await Appointment.findOne({ where: { appointmentID, licenseID }});
            if(!appointmentExist){
                throw new Error('The appointment id you provide does not exist');
            }
        }
        

        await ToothAct.update(newData, { where: { toothActID }});
        
        if(appointmentID){
            const factureID = (await retrieveAppointmentByID(appointmentID, licenseID)).factureID;
            if(factureID){
                await calculeTotalNeededAmount(appointmentID, licenseID);
            }
    
        }
        
        return await ToothAct.findOne({where: { toothActID, licenseID }});
    } catch(err: any){
        throw new Error(err);
    }
}