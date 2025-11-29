import express from 'express';
const router = express.Router();
import { newLicense } from '../controllers/License/newLicense';
import { getLicenseByID } from '../controllers/License/getLicenseByID';
import { getAllLicenses } from '../controllers/License/getAllLicenses';
import { deleteLicense } from '../controllers/License/deleteLicense';
import { updateLicense } from '../controllers/License/updateLicense';

router.post('/', newLicense);
router.get('/:licenseID', getLicenseByID);
router.get('/', getAllLicenses);
// router.get('/', newLicense);
router.delete('/:licenseID', deleteLicense);
router.put('/:licenseID', updateLicense);

module.exports = router;