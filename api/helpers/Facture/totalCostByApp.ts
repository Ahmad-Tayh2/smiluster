
import { AppointmentService } from "../../models";
import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";
import { retriveActsByApp } from "../../services/ToothAct/retriveActsByApp.service";


const totalCostByApp = async (appointmentID: number, licenseID: number) => {
    try{
        const appointment = await retrieveAppointmentByID(appointmentID, licenseID);
        if(!appointment){
            throw new Error("there is no appointment");
        }

        if(appointment.cost !== -1) {
            return appointment.cost;
        }

        let totalCost: number = 0;

        const appointmentActs = await retriveActsByApp(appointment.appointmentID, licenseID);
        for (const act of appointmentActs) {
            totalCost += act.customCost;
        }

        const appServices = await AppointmentService.findAll({ where: { appointmentID: appointment.appointmentID }});
        for(const service of appServices){
            totalCost += service.customCost || 0;
        }
        
        return totalCost;   
    } catch (err: any){
        throw new Error(err.message);
    }
}

export default totalCostByApp;