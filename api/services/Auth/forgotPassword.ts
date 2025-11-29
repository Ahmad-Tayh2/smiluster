import { User } from "../../models";
const bcrypt = require("bcrypt");
const validator = require("validator");

// forgot password
export async function forgotPassword (email: string, password: string) {
    if (!email) {
      throw Error("Your email must be provided");
    }
  
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
  
    const exists = await User.findOne({ where: { email } });

    if (!exists) {
      throw Error("Your email does not exist !!");
    }
  
    // create salt which added to the end of the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt).toString();
    const user = await User.update({ password: hash }, { where: { email } });
  };