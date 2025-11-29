import { retrieveLicense } from "../../services/License/getLicenseByID";

export async function getLicenseByID(req: any, res: any) {
    try{
        const license = await retrieveLicense(req.params.licenseID);
        
        if(!license){
            return res.status(404).json({ error: 'License not found' });
        }
        res.status(200).json(license);
    } catch (err: any){
        res.status(500).json({ error: err.message });
    }
}