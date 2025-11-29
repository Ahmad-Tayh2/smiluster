import express from 'express';
import { newFacture } from '../controllers/Facture/newFacture';
import { deleteFacture } from '../controllers/Facture/deleteFacture';
import { getFactureByID } from '../controllers/Facture/getFactureByID';
import { updateFacture } from '../controllers/Facture/updateFacture';
import { getFacturesByLicense } from '../controllers/Facture/getFacturesByLicense.cotroller';
const checkAuth = require('../middlewares/client/check-auth');

const router = express.Router();

router.post('/', checkAuth, newFacture);
router.get("/:factureID", checkAuth, getFactureByID);
router.put("/:factureID", checkAuth, updateFacture);
router.delete("/:factureID", checkAuth, deleteFacture);
router.get('/', checkAuth, getFacturesByLicense);

module.exports = router;