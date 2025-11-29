import { Tooth, ToothRDV, Appointment, models } from "../../models";

export async function attachToothToRDV(appointmentID: number, toothID: number, licenseID: number) {
    
        const exist = await ToothRDV.findOne({where: {appointmentID, toothID}});
        if(exist){
            throw new Error('this data aleardy exist in toothRDV');
        }
        const appointment = await Appointment.findOne({
            where: {
                appointmentID,
            },
        });

        if (!appointment) {
            throw new Error("Enter a correct appointment!");
        }

        const tooth = await Tooth.findOne({ where: { toothID } });
        if (!tooth) {
            throw new Error("Enter a correct appointment!");
        }

        const toothRDV = new ToothRDV();
        toothRDV.appointmentID = appointment.appointmentID;
        toothRDV.toothID = tooth.toothID;
        toothRDV.licenseID = licenseID;

        const result = await toothRDV.save();
        if (!result) {
            throw new Error("Something went wrong");
        }
        return result;
    
}
