import { validateResetPasswordToken } from "../../helpers/general";
import { resetPassword } from "../../services/User/resetPassword";
import { retrieveUserByEmail } from "../../services/User/retrieveUserByEmail";

export async function resetPasswordUser(req: any, res: any) {
    const { newPassword, token } = req.body;
    
    try {
        const user = await validateResetPasswordToken(token);
        if (user) {
            const reset = await resetPassword(
                user.userID.toString(),
                newPassword
            );
            return res.status(200).json(reset);
        } else {
            res.status(404).json({
                error: true,
                message:
                    "The specified email address or user was not found on the server",
            });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
