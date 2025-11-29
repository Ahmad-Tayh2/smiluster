import { createNewLicense } from "../../services/License/newLicense";

export async function newLicense(req: any, res: any) {
    const {expirationDate, licenseKey} = req.body;
    try{
        if (!expirationDate || !licenseKey) {
            return res.status(400).json({ error: 'All fields must be filled' });
        }
        const license = await createNewLicense({expirationDate, licenseKey});

        res.status(200).json({ expirationDate, licenseKey });
    }catch (error: any){
        res.status(400).json({ error: error.message });
    }
}