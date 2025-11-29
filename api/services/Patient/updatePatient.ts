import { Patient } from "../../models";

export async function modifyPatient(updatedPatient: PatientAttributes) {
    
    const exists = await Patient.findOne({ where: { patientID:  updatedPatient.patientID} });

    if (!exists) {
        throw new Error('Patient does not exist');
    }

    const nbPatients = await Patient.update(updatedPatient, {
        where: { patientID: updatedPatient.patientID }
    });
    
    return await Patient.findOne({ where: { patientID:  updatedPatient.patientID} });
}

interface PatientAttributes {
    patientID: number;
    licenseID: number;
    dateOfBirth?: Date;
    firstName: string;
    lastName: string;
    gender?: string;
    generalState?: string;
    phoneNumber?: string;
    email?: string;
    profession?: string;
    address?: string;
}
