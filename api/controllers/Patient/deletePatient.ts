import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { createLog } from "../../services/Logs/createLog";
import { dropPatient } from "../../services/Patient/deletePatient";
import { retrievePatientByID } from "../../services/Patient/getPatientByID";

export async function deletePatient(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const patient = await retrievePatientByID(req.params.patientID);
        const deleted = await dropPatient(req.params.patientID, licenseID);
        if (deleted === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: patient.patientID,
                entityType: EntityType.Patient,
                details: { deletedData: patient }
            });
            res.status(200).json({ message: 'Patient deleted successfully' });
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}