import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { modifyAppointment } from "../../services/Appointment/modifyAppointment";
import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";
import { retrieveFacture } from "../../services/Facture/getFactureByID";
import { createNewFacture } from '../../services/Facture/newFacture';
import { modifyFacture } from "../../services/Facture/updateFacture";
import { createLog } from "../../services/Logs/createLog";
import { createNewPatient } from '../../services/Patient/newPatient';

export async function updateAppointment(req: any, res: any) {
    const appointmentID = req.params.appointmentID;
    const { user } = req;
    const { userID, licenseID } = user;
    let {
        patientID,
        newPatient,
        factureID,
        appointmentDateTime,
        status,
        diagnostique,
        ordonnance,
        note,
        cost,
        appointmentDuration,
    } = req.body;

    try {


        if(req.body.newPatient){
            try{
                let newPatientData = req.body.newPatient;
                newPatientData.licenseID = licenseID;

                const patient = await createNewPatient(newPatientData);
                patientID=patient.patientID;

            }catch(err:any){
                return res.status(400).json({ error: err.message });
            }
        }

        const { factureAction } = req.query;
        const oldAppointmentData = await retrieveAppointmentByID(appointmentID, licenseID);
        if((!oldAppointmentData.factureID && !factureID) && factureAction==='create'){ 
            const fact = await createNewFacture({licenseID});
            if(!fact){
                throw new Error('Somthing Wrong happened creating the new fact');
            }
            factureID = fact.factureID;
        }

        if(oldAppointmentData.factureID){
            factureID = oldAppointmentData.factureID;
        }
        
        const appointment = await modifyAppointment(appointmentID, {
            userID,
            licenseID,
            patientID,
            factureID,
            appointmentDateTime,
            status,
            diagnostique,
            ordonnance,
            note,
            cost,
            appointmentDuration,
        });

        await createLog({
            licenseID,
            userID,
            action: LogsAction.UPDATE,
            entityID: appointmentID,
            entityType: EntityType.Appointment,
            details: { oldValue: oldAppointmentData, newValue: appointment }
        });
        
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
