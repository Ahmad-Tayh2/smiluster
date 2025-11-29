const nodemailer = require("nodemailer");
import { SMILUSRER_EMAIL, SMILUSRER_EMAIL_PASS } from "../../config";

export async function sendConfirmationEmail (token: any, email: string){
    
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
      subject: "Confirm Your Account",
      html: `Click <a href="http://localhost:3000?token=${token}">here</a> to confirm your account.`,
    };
    await transporter.sendMail(mailOptions);
  };