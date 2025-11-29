
import { Appointment, AppointmentService } from "../../models";
import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";
import { retrieveFacture } from "../../services/Facture/getFactureByID";
import { modifyFacture } from "../../services/Facture/updateFacture";
import { retriveActsByApp } from "../../services/ToothAct/retriveActsByApp.service";
import totalCostByApp from "./totalCostByApp";


const calculeTotalNeededAmount = async (appointmentID: number, licenseID: number) => {
    try{
        const { factureID } = await retrieveAppointmentByID(appointmentID, licenseID);

        if(!factureID){
            throw new Error('appoitment should have a facture to update values');
        }

        const appointmentList = await Appointment.findAll({ where: { factureID, licenseID } });

        let totalCost = 0;
    
        for (const appointment of appointmentList) {
            totalCost += await totalCostByApp(appointment.appointmentID, licenseID);
        }
    
        await modifyFacture({ factureID, totalNeededAmount: totalCost });

        const { totalNeededAmount, totalPaidAmount } = (await retrieveFacture(factureID, licenseID));
        const restAmount = totalNeededAmount - totalPaidAmount;
        await modifyFacture({ factureID, restAmount });
        
    } catch (err: any){
        throw new Error(err.message);
    }

}

export default calculeTotalNeededAmount;