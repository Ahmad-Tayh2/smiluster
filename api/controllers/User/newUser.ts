import { createNewUser } from "../../services/User";

export async function newUser(req: any, res: any) {
    let newUserData = req.body;
    newUserData.licenseID = req.license?.licenseID;
    try {
        const user = await createNewUser(newUserData);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
