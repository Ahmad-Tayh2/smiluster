import { retrieveAllUsers } from "../../services/User";

export async function getAllUsers(req: any, res: any) {
    try {
        const users = await retrieveAllUsers();
        if (!users) {
            return res.status(404).json({ error: "There is no User" });
        }
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}
