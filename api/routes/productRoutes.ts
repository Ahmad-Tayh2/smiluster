import express from 'express';
import { newProduct } from '../controllers/Product/newProduct';
import { getProductByID } from '../controllers/Product/getProductByID';
import { updateProduct } from '../controllers/Product/updateProduct';
import { deleteProduct } from '../controllers/Product/deleteProdcut';
import { getAllProductsByLicence } from '../controllers/Product/getAllProductsbyLicense';
const CheckAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post('/', CheckAuth, newProduct);
router.get('/:productID', CheckAuth, getProductByID);
router.get('/', CheckAuth, getAllProductsByLicence);
router.put('/:productID', CheckAuth, updateProduct);
router.delete('/:productID', CheckAuth, deleteProduct);

module.exports = router;