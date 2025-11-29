import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../../models";

export async function signUp(newUserData: UserAttributes) {
    validateUserData(newUserData);

    const exists = await User.findOne({ where: { email: newUserData.email } });

    if (exists) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUserData.password, salt);

    const user = await User.create({
        ...newUserData,
        password: hashedPassword,
    });

    return user;
}

function validateUserData(data: UserAttributes) {
    const { email, password } = data;

    if (!email || !password) {
        throw new Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    // if (!validator.isStrongPassword(password)) {
    //     throw new Error('Password is not strong enough');
    // }
}

interface UserAttributes {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: number;
    role: "Doctor" | "Assistant" | "Secr";
    licenseID?: number;
}
