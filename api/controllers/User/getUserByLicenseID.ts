import { retrieveUsersByLicenseID } from "../../services/User";

export async function getUserByLicenseID(req: any, res: any) {
    const licenseID = req.params.licenseID;
    try {
        const users = await retrieveUsersByLicenseID(licenseID);
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
