import { Act, Appointment, Tooth, ToothAct } from "../../models";

export async function retriveActsByApp(appointmentID: number, licenseID: number){
    try{

        const appointmentExist = await Appointment.findOne({ where: { appointmentID, licenseID }});
        
        if(!appointmentExist){
            throw new Error('the appointment Does not exist!!');
        }

        const actsList = await ToothAct.findAll({
            where: { appointmentID, licenseID },
            include: [
                {
                    model: Tooth,
                    as: "Tooth"
                },
                {
                    model: Act,
                    as: "Act"
                }
            ]
        })
        return actsList;

    } catch(err: any){
        throw new Error(err);
    }
}