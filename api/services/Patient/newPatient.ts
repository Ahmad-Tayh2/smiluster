import { Patient } from "../../models";

export async function createNewPatient(newPatientData: PatientAttributes) {
    const {
        phoneNumber,
        firstName,
        lastName,
        email,
        licenseID,
        ...otherAttributes
    } = newPatientData;

    try {
        if (!phoneNumber) {
            throw new Error('Enter a phone number!');
        }

        if (!firstName || !lastName) {
            throw new Error('Enter the patient name!');
        }

        const emailExists = email
            ? await Patient.findOne({ where: { email, firstName } })
            : null;
        if (emailExists) {
            throw new Error('Patient already exists');
        }

        const phoneExists = await Patient.findOne({ where: { phoneNumber, firstName, licenseID } });
        if (phoneExists) {
            throw new Error('Patient already exists');
        }

        const patient = await Patient.create({ 
            phoneNumber,
            firstName,
            lastName,
            email,
            licenseID,
            ...otherAttributes 
        });
        return patient;

    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unexpected error occurred while creating the patient.');
    }
    }
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
