import { User } from "../../models";

export async function dropUser(userID: number, licenseID: number) {
    try {
        const user = await User.destroy({ where: { userID, licenseID } });
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}
