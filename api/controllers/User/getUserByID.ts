import { retrieveUserByID } from "../../services/User";

export async function getUserByID(req: any, res: any) {
    const userID = req.params.userID;
    const licenseID = req.license.licenseID;
    try {
        const user = await retrieveUserByID(userID);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
