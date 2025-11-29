import { Appointment, Patient, Document, Tooth, ToothAct } from "../../models";
import { dropAppointment } from "../Appointment/dropAppointment";
import { dropDocument } from "../Document/deleteDocument";
import { dropTooth } from "../Tooth/dropTooth";
import { dropToothAct } from "../ToothAct/deleteToothAct";

export async function dropPatient(patientID: number, licenseID: number) {
    try{
        const appointments = await Appointment.findAll({where: { patientID, licenseID }});
        const docs = await Document.findAll({where: { patientID, licenseID }});
        const tooths = await Tooth.findAll({where: { patientID, licenseID }});
        
        for(const appointment of appointments){
            await dropAppointment(appointment.appointmentID, licenseID);
        }

        for(const doc of docs){
            await dropDocument(doc.docID, licenseID);
        }

        for(const tooth of tooths){
            const toothActs = await ToothAct.findAll({ where: {toothID: tooth.toothID, licenseID }});
            for(const toothAct of toothActs){
                await dropToothAct(toothAct.toothActID, licenseID);
            }
            await dropTooth(tooth.toothID, licenseID);
        }
        const patient = await Patient.destroy({ where: { patientID, licenseID } });
        return patient;
    } catch(error: any){
        throw new Error(error);
    }
}