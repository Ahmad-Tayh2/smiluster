const { generatePassword } = require("../../helpers/Auth/generatePassword");
import { forgotPassword } from "../../services/Auth/forgotPassword";
import { sendNewPassword } from "../../helpers/Auth/sendNewPassword";
import { retrieveUserByEmail } from "../../services/User/retrieveUserByEmail";
import { generateResetPasswordToken } from "../../helpers/general";

export async function forgotPasswordUser(req: any, res: any) {
    const { email, token } = req.body;
    try {
        const user = await retrieveUserByEmail(email, true);
        const token = await generateResetPasswordToken(user);
        sendNewPassword(email, token);

        res.status(200).json({
            message: "Check your email for the new password!",
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
