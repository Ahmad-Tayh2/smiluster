import { License } from "../../models";

export async function modifyLicense(updatedLicense: LicenseAttributes) {

    const exists = await License.findOne({ where: { licenseID:  updatedLicense.licenseID} });

    if (!exists) {
        throw new Error('License Key does not exists');
    }

    const nbLicenses = await License.update(updatedLicense, {
        where: { licenseID: updatedLicense.licenseID }
    });

    return await License.findOne({ where: { licenseID:  updatedLicense.licenseID} });
    //return exists;
}

interface LicenseAttributes {
    licenseID: number;
    expirationDate: Date,
    licenseKey: string,
}