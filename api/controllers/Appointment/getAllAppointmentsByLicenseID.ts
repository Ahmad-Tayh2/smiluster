import { retrieveAllAppointmentsByLicenseID } from "../../services/Appointment/retrieveAllAppointmentsByLicenseID";

export async function getAllAppointmentsByLicenseID(req: any, res: any) {
    try {
        const licenseID = req.license.licenseID;
        const {
            startDay,
            endDay,
            patientID,
            factureID,
            status,
            sortBy,
            search,
            itemsPerPage,
            currentPageNumber,
        } = req.query;

        const appointments = await retrieveAllAppointmentsByLicenseID(
            licenseID,
            {
                startDay,
                endDay,
                patientID,
                factureID,
                status,
                sortBy,
                search,
                itemsPerPage,
                currentPageNumber,
            }
        );

        res.status(200).json(appointments);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
