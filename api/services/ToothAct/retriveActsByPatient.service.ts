import { Act, Appointment, Patient, Tooth, ToothAct } from "../../models";

export async function retriveActsByPatient(patientID: number, licenseID: number){
    try{

        const patientExist = await Patient.findOne({ where: { patientID, licenseID }});
        if(!patientExist){
            throw new Error('the Patient Does not exist!!');
        }

        let result: any[]=[];
        const teethList = await Tooth.findAll({ where: { patientID, licenseID }});
        for(const tooth of teethList){

            const actsList = await ToothAct.findAll({
                where: { toothID: tooth.toothID, licenseID },
                include: [
                    {
                        model: Tooth,
                        as: "Tooth"
                    },
                    {
                        model: Act,
                        as: "Act"
                    },
                    {
                        model: Appointment,
                        as: "Appointment",
                    }
                ]
            });

            result = [...result, ...actsList];
        }
        
        return result;

    } catch(err: any){
        console.error(err);
        throw new Error(err);
    }
}