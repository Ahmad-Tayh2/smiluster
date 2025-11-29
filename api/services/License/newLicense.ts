import { License } from "../../models";

export async function createNewLicense(newLicenseData: LicenseAttributes) {
    const exists = await License.findOne({
        where: { licenseKey: newLicenseData.licenseKey },
    });

    if (exists) {
        throw new Error("License Key already exists");
    }

    const license = await License.create({
        ...newLicenseData,
    });

    return license;
}

interface LicenseAttributes {
    expirationDate: Date;
    licenseKey: string;
}
