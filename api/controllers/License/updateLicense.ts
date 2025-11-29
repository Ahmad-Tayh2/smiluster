import { modifyLicense } from "../../services/License/updateLicense";


export async function updateLicense(req: any, res: any) {
    const licenseID = req.params.licenseID
    const {expirationDate, licenseKey} = req.body;
    try{
        if (!expirationDate || !licenseKey) {
            return res.status(400).json({ error: 'All fields must be filled' });
        }
        const license = await modifyLicense({licenseID, expirationDate, licenseKey});

        res.status(200).json(license);
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}