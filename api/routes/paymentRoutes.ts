import express from 'express';
import { newPayment } from '../controllers/Payment/newPayment';
import { getPaymentByID } from '../controllers/Payment/getPaymentByID';
import { updatePayment } from '../controllers/Payment/updatePayment';
import { deletePayment } from '../controllers/Payment/deletePayment';
const CheckAuth = require('../middlewares/client/check-auth');

const router = express.Router();

router.post('/', CheckAuth, newPayment);
router.get("/:paymentID", CheckAuth, getPaymentByID);
router.put("/:paymentID", CheckAuth, updatePayment);
router.delete("/:paymentID", CheckAuth, deletePayment);

module.exports = router;