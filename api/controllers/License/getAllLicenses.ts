import { retrieveAllLicenses } from "../../services/License/getAllLicense";

export async function getAllLicenses(req: any, res: any) {
    try{
        const licenses = await retrieveAllLicenses()
        if(!licenses){
            return res.status(404).json({ error: 'There is no Licenes' });
        }
        res.status(200).json(licenses);
    } catch (err: any){
        res.status(500).json({ error: err.message });
    }
}