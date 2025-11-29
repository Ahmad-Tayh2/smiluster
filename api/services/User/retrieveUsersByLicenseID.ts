import { User } from "../../models";

export async function retrieveUsersByLicenseID(licenseID: string) {
    try {
        const users = await User.findOne({ where: { licenseID } });

        if (!users) {
            throw new Error("User not found");
        }

        return users;
    } catch (error: any) {
        throw new Error(error);
    }
}
