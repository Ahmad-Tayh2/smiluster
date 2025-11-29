import { Op } from "sequelize";
import { Appointment } from "../../models";

async function checkForOverlappingAppointments(startDateTime: Date, duration: any, licenseID: number, appointmentID?: number) {
    const startOfDay = new Date(startDateTime);
    startOfDay.setHours(0, 0, 0, 0); 
    
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1); 

    const appointments = await Appointment.findAll({
        where: {
            licenseID,
            appointmentDateTime: {
                [Op.between]: [startOfDay, endOfDay],
            },
            appointmentID: {
                [Op.not]: appointmentID || 0
            }
        },
    });
    
    for (const appointment of appointments) {
        const appointmentStart = new Date(appointment.appointmentDateTime);
        const appointmentEnd = new Date(appointmentStart.getTime() + appointment.appointmentDuration * 60000);
    
        const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
    
    
        if (
        (startDateTime >= appointmentStart && startDateTime < appointmentEnd) ||
        (endDateTime > appointmentStart && endDateTime <= appointmentEnd) ||
        (startDateTime <= appointmentStart && endDateTime >= appointmentEnd)
        ) {
    
        return true;
        }
    }
    
    return false;
    }

    export default checkForOverlappingAppointments;