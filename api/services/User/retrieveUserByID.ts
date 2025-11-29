import { User } from "../../models";

export async function retrieveUserByID(userID: number) {
    try {
        const user = await User.findOne({ where: { userID } });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}
