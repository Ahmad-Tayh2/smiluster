import { User } from "../../models";
import bcrypt from "bcrypt";
import { retrieveUserByID } from "./retrieveUserByID";

export async function resetPassword(userID: any, newPassword: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const nbUsers = await User.update(
        { password: hashedPassword },
        {
            where: { userID },
        }
    );
    if (nbUsers) {
        const newUser = await retrieveUserByID(userID);
        const { password, ...userWithoutPass } = newUser.get();
        return userWithoutPass;
    } else {
        return new Error("something went wrong");
    }
}
