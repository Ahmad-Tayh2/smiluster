import express from "express";
import { getAllTeethByAppointmentID } from "../controllers/ToothRDV/getAllTeethByAppointmentID";
import { assignToothToRDV } from "../controllers/ToothRDV/assignToothToRDV";
import { getAllAppointmentsByToothID } from "../controllers/ToothRDV/getAllAppointmentsByToothID";
import { updateToothRDV } from "../controllers/ToothRDV/updateToothRDV";
import { deleteToothRDV } from "../controllers/ToothRDV/deleteToothRDV";

const checkAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.get("/:appointmentID/teeth", checkAuth, getAllTeethByAppointmentID);
router.post("/:appointmentID/tooth/:toothID", checkAuth, assignToothToRDV);
router.get("/:toothID/appointments", checkAuth, getAllAppointmentsByToothID);
router.put("/:appointmentID/tooth/:toothID", checkAuth, updateToothRDV);
router.delete("/:appointmentID/tooth/:toothID", checkAuth, deleteToothRDV);


module.exports = router;
