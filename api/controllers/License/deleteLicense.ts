import { dropLicense } from "../../services/License/deleteLicense"

export async function deleteLicense(req: any, res: any) {
    try {
        
        const license = await dropLicense(req.params.licenseID);
    
        if (license === 1) {
            res.status(200).json({ message: 'License deleted successfully' });
        } else {
            res.status(404).json({ error: 'License not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the license' });
    }
}