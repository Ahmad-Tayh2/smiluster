import { User } from "../../models";

export async function modifyUser(updatedUser: UserAttributes) {
    const exists = await User.findOne({
        where: { userID: updatedUser.userID },
    });

    if (!exists) {
        throw new Error("User does not exist");
    }

    const nbUsers = await User.update(updatedUser, {
        where: { userID: updatedUser.userID },
    });

    return await User.findOne({
        where: { userID: updatedUser.userID },
    });
}

interface UserAttributes {
    userID: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: number;
    role: "Doctor" | "Assistant" | "Secr";
    licenseID?: number;
}
