import { Appointment, Tooth, ToothRDV } from "../../models";

export async function modifyToothRDV(currentAppointmentID: number, currentToothID: number, newData: any) {
        
        const exist = await ToothRDV.findOne({where: {appointmentID: currentAppointmentID, toothID: currentToothID}});

        if(!exist){
            throw new Error('This element does not exist');
        }

        const toothExist = await Tooth.findOne({where: {toothID: newData.toothID}});
        const appointmentExist = await Appointment.findOne({where: {appointmentID: newData.appointmentID}});

        if(!toothExist){
            throw new Error('The tooth id you provide does not exist');
        }

        if(!appointmentExist){
            throw new Error('The appointment id you provide does not exist');
        }

        const toothRDV = await ToothRDV.update(newData, {where: {appointmentID: newData.appointmentID, toothID: newData.toothID}});
        return await ToothRDV.findOne({where: {toothID: newData.toothID, appointmentID: newData.appointmentID}});
}