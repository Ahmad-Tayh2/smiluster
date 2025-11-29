import { User } from "../../models";

export async function retrieveAllUsers() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}
