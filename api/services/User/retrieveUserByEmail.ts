import { User } from "../../models";

export async function retrieveUserByEmail(
    email: string,
    withPassword: boolean = false
) {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }
        const { password, ...userWithoutPass } = user.get();
        if (withPassword) {
            return user.get();
        } else {
            return userWithoutPass;
        }
    } catch (error: any) {
        throw new Error(error);
    }
}
