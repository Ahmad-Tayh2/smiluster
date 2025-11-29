import { License } from "../../models";

export async function retrieveAllLicenses() {
    try{
        const licenses = await License.findAll();
        return licenses;
    } catch(error: any){
        throw new Error(error);
    }
}