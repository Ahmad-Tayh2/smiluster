import { Patient } from "../../models";

export async function retrievePatientByID(patientID: number){
    try{
        const patient = await Patient.findOne({ where : { patientID }});

        if(!patient){
            throw new Error("Patient not found");
        }

        return patient;
    } catch(error: any){
        throw new Error(error);
    }
}