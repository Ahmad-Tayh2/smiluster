import { error } from "console";
import EntityType from "../../enums/EntityType";
import LogsAction from "../../enums/LogsAction";
import { dropAppointment } from "../../services/Appointment/dropAppointment";
import { retrieveAppointmentByID } from "../../services/Appointment/retrieveAppointmentByID";
import { createLog } from "../../services/Logs/createLog";

export async function deleteAppointment(req: any, res: any) {
    try {
        const appointmentID = req.params.appointmentID;
        const licenseID = req.license.licenseID;
        const userID = req.user.userID;
        const appointmentData = await retrieveAppointmentByID(appointmentID, licenseID);
        if(!appointmentData){
            throw new Error("Appointment Not found");
        }
        const appointment = await dropAppointment(appointmentID, licenseID);

        if (appointment === 1) {
            await createLog({
                licenseID,
                userID,
                action: LogsAction.DELETE,
                entityID: appointmentData.appointmentID,
                entityType: EntityType.Appointment,
                details: { deletedData: appointmentData }
            });
            res.status(200).json({
                message: "appointment deleted successfully",
            });
        } else {
            res.status(404).json({ error: "appointment not found" });
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while deleting the appointment",
        });
    }
}
