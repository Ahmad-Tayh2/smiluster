const nodemailer = require("nodemailer");
import { SMILUSRER_EMAIL, SMILUSRER_EMAIL_PASS } from "../../config";

export async function sendNewPassword(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMILUSRER_EMAIL,
            pass: SMILUSRER_EMAIL_PASS,
        },
    });

    // send an email with token as query parameter
    const mailOptions = {
        from: SMILUSRER_EMAIL,
        to: email,
        subject: "Your new password",
        html: htmlTemplate(token, email),
    };
    await transporter.sendMail(mailOptions);
}

const htmlTemplate: any = (token: string, email: string) => `
<h2>Click here to reset password</h2>
<a href="http://localhost:5173/resetPassword?email=${email}&token=${token}">Reset Password</a>
`;
