import { TOKEN_SECRET_KEY } from "../config";
import { retrieveUserByID } from "../services/User";

const moment = require("moment");
const jwt = require("jsonwebtoken");
export function generateResetPasswordToken(user: any) {
    const today = moment().format("YYYY-MM-DD");
    const pass = user.password;
    const token = jwt.sign(
        { today, pass, userID: user.userID },
        TOKEN_SECRET_KEY,
        {
            expiresIn: "1d",
        }
    );
    return token;
}

export async function validateResetPasswordToken(token: string) {
    const todayToVerifyWith = moment().format("YYYY-MM-DD");
    const { today, pass, userID } = jwt.verify(token, TOKEN_SECRET_KEY);
    const user = await retrieveUserByID(userID);
    if (todayToVerifyWith === today && pass === user.password) {
        return user;
    } else {
        return null;
    }
}
