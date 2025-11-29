import calculeTotalNeededAmount from "../../helpers/Facture/calculeTotalNeededAmount";
import { Tooth, ToothAct } from "../../models";
import { retrieveActByID } from "../Act";
import { retrieveAppointmentByID } from "../Appointment/retrieveAppointmentByID";

export async function attachActToTooth(newToothAct: any) {
    try{
        const {
            toothID,
            actList,
            appointmentID,
            licenseID,
            datePerformed,
            isPaid,
        } = newToothAct

        const tooth = await Tooth.findOne({ where: { toothID, licenseID } });
        if (!tooth) {
            throw new Error("Enter a correct tooth!");
        }
        
        let result: any[]=[];

        for(const actID of actList){
            let query: any = { toothID, actID, licenseID };
            if (appointmentID !== undefined) {
                query.appointmentID = appointmentID;
            }

            const exist = await ToothAct.findOne({ where: query });
            
            if(exist){
                throw new Error('This tooth Act already exist!');
            }

            const customCost = (await retrieveActByID(actID, licenseID)).cost;

            const toothAct = {
                actID,
                toothID,
                appointmentID,
                licenseID,
                datePerformed,
                customCost,
                isPaid,
            }

            await ToothAct.create( toothAct );
            result.push(toothAct);
        }

        
        if(appointmentID){
            const factureID = (await retrieveAppointmentByID(appointmentID, licenseID)).factureID;
            if(factureID){
                await calculeTotalNeededAmount(appointmentID, licenseID);
            }
        }
        
        

        if (!result) {
            throw new Error("Something went wrong");
        }
        return result;
    } catch(err: any){
        throw new Error(err);
    }
}
