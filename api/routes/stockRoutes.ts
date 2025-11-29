import express from 'express';
import { newStock } from '../controllers/Stock/newStock';
import { getStockByID } from '../controllers/Stock/getStockByID';
import { updateStock } from '../controllers/Stock/updateStock';
import { deleteStock } from '../controllers/Stock/deleteStock';
import { getStockByProductID } from '../controllers/Stock/getStockByProductID';
import { getExporedStock } from '../controllers/Stock/getExporedStock';
import { getAllStocksByLicence } from '../controllers/Stock/getAllStocksbyLicense';
const CheckAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post('/', CheckAuth, newStock);
router.get('/:stockID', CheckAuth, getStockByID);
router.get('/products/:productID', CheckAuth, getStockByProductID);
router.get('/', CheckAuth, getAllStocksByLicence);
router.get('/exporedStock', CheckAuth, getExporedStock);
router.put('/:stockID', CheckAuth, updateStock);
router.delete('/:stockID', CheckAuth, deleteStock);

module.exports = router;