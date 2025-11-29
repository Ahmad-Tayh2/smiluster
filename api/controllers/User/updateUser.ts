import { modifyUser } from "../../services/User";

export async function updateUser(req: any, res: any) {
    const userID = req.params.userID;
    let newUserData = req.body;
    newUserData.licenseID = req.license.licenseID;
    try {
        const user = await modifyUser({ userID, ...newUserData });
        //TODO: finish reset password
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
