import { User } from "../../models";

export async function createNewUser(newUserData: UserAttributes) {
    if (!newUserData.licenseID) {
        throw new Error("Enter a LicenseID!");
    }
    if (!newUserData.email) {
        throw new Error("Enter a Email!");
    }

    const exists = await User.findOne({
        where: {
            licenseID: newUserData.licenseID,
            email: newUserData.email,
        },
    });

    if (exists) {
        throw new Error("User already exists");
    }
    if (!newUserData.password) {
        throw new Error("Enter a password!");
    }
    
    if (!newUserData.firstName) {
        throw new Error("Enter a firstName!");
    }
    if (!newUserData.lastName) {
        throw new Error("Enter a lastName!");
    }
    if (!newUserData.phone) {
        throw new Error("Enter a phone!");
    }
    if (!newUserData.role) {
        throw new Error("Enter a lastName!");
    }

    

    const newUser = await User.create({ ...newUserData });
    return newUser;
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
