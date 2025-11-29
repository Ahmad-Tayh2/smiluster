import express from 'express';
import upload from '../helpers/Documents/uploadDoc';
import { newDocuments } from '../controllers/Document/newDocuments';
import { getDocumentByID } from '../controllers/Document/getDocumentByID';
import { getDocumentByPatient } from '../controllers/Document/getDocumentByPatient';
import { getDocumentByAppointment } from '../controllers/Document/getDocumentByAppointment';
import { deleteDocument } from '../controllers/Document/deleteDocument';
import { downloadFile } from '../controllers/Document/downloadFile';
import { updateDocument } from '../controllers/Document/updateDocument';
const CheckAuth = require('../middlewares/client/check-auth');

const router = express.Router();


router.post('/', CheckAuth ,upload.array('files', 1), newDocuments);
router.get('/:docID', CheckAuth, getDocumentByID);
router.put('/:docID', CheckAuth, updateDocument);
router.get('/patient/:patientID', CheckAuth, getDocumentByPatient);
router.get('/appointment/:appointmentID', CheckAuth, getDocumentByAppointment);
router.delete('/:docID', CheckAuth, deleteDocument);
router.get('/download/:filename', downloadFile);

module.exports = router;
