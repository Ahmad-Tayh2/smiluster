import { Appointment, Document, ToothAct } from "../../models";
import { dropDocument } from "../Document/deleteDocument";
import { dropToothAct } from "../ToothAct/deleteToothAct";

export async function dropAppointment(appointmentID: number, licenseID: number) {
    try {
        const docs = await Document.findAll({
            where: { appointmentID, licenseID }
        });

        for(const doc of docs){
            await dropDocument(doc.docID, licenseID);
        }

        const toothActs = await ToothAct.findAll({ where: { appointmentID, licenseID }});
        for(const toothAct of toothActs){
            await dropToothAct(toothAct.toothActID, licenseID);
        }
        const appointment = await Appointment.destroy({
            where: { appointmentID, licenseID },
        });
        return appointment;
    } catch (error: any) {
        throw new Error(error);
    }
}
