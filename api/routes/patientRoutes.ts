import express from 'express';
import { newPatient } from '../controllers/Patient/newPatient.controller';
import { getPatientByID } from "../controllers/Patient/getPatientByID";
import { getAllPatientsByLicence } from '../controllers/Patient/getAllPatientsByLicense';
import { updatePatient } from '../controllers/Patient/updatePatient';
import { deletePatient } from '../controllers/Patient/deletePatient';
const CheckAuth = require('../middlewares/client/check-auth');

const router = express.Router();

router.post('/', CheckAuth, newPatient);
router.get('/:patientID', CheckAuth, getPatientByID);
router.get('/', CheckAuth, getAllPatientsByLicence);
router.put('/:patientID', CheckAuth, updatePatient);
router.delete('/:patientID', CheckAuth, deletePatient);

module.exports = router;