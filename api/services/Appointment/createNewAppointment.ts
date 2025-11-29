import { Op } from "sequelize";
import { Appointment, License, Patient, User } from "../../models";
import checkForOverlappingAppointments from "../../helpers/Appointment/checkValidAppoitmentTime";

export async function createNewAppointment(
    newAppointmentData: AppointmentAttributes
) {
    const {
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
        
    } = newAppointmentData;

    if (!licenseID || !userID) {
        throw new Error("Invalid license ID or user ID");
    }

    const appointment = new Appointment();

    const existantLicense = await License.findOne({
        where: { licenseID },
    });
    if (!existantLicense) {
        throw new Error("License not exist");
    } else {
        appointment.licenseID = existantLicense.licenseID;
    }

    const existantUser = await User.findOne({
        where: { userID },
    });
    if (!existantUser) {
        throw new Error("User not exist");
    } else {
        appointment.userID = existantUser.userID;
    }
    let existantPatient=await Patient.findOne({ where: { patientID },});
    if (patientID !== undefined) {
        if (!existantPatient) {
            throw new Error("Patient not exist");
        } else {
            appointment.patientID = existantPatient.patientID;
        }
    } else {
        appointment.patientID = undefined;
    }

    if(!appointmentDuration){
        throw new Error("Give me a Duration !!");
    } else{
        const newAppointmentTime = new Date(appointmentDateTime);
        const reservedTime = await checkForOverlappingAppointments(newAppointmentTime, appointmentDuration, licenseID);

        if(reservedTime){
            throw new Error("This time was reserved !!");
        }else{
            appointment.appointmentDuration = appointmentDuration;
        }
    }
    

    appointment.appointmentDateTime = new Date(appointmentDateTime);
    
    appointment.status = status;
    if (diagnostique) {
        appointment.diagnostique = diagnostique;
    }
    if (ordonnance) {
        appointment.ordonnance = ordonnance;
    }
    if(note){
        appointment.note = note;
    }
    if (cost) {
        appointment.cost = cost;
    }
    if(factureID){
        appointment.factureID = factureID;
    }

    const newAppointment = await appointment.save();
    return {...newAppointment.dataValues, "patient": existantPatient};
}

interface AppointmentAttributes {
    userID: number;
    licenseID: number;
    patientID?: number;
    factureID: number;
    appointmentDateTime: Date;
    status: string;
    diagnostique?: string;
    ordonnance?: string;
    note?: string;
    cost: number;
    appointmentDuration: number;
}





