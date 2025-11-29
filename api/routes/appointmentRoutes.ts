import express from "express";
import { newAppointment } from "../controllers/Appointment/newAppointment";
import { getAllAppointmentsByLicenseID } from "../controllers/Appointment/getAllAppointmentsByLicenseID";
import { getAllAppointmentsByStatus } from "../controllers/Appointment/getAllAppointmentsByStatus";
import { getAllAppointmentsByPatientID } from "../controllers/Appointment/getAllAppointmentsByPatientID";
import { getAppointmentByID } from "../controllers/Appointment/getAppointmentByID";
import { updateAppointment } from "../controllers/Appointment/updateAppointment";
import { deleteAppointment } from "../controllers/Appointment/deleteAppointment";

const checkAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post("/", checkAuth, newAppointment);
router.get("/", checkAuth, getAllAppointmentsByLicenseID);
router.get("/status/:status", checkAuth, getAllAppointmentsByStatus);
router.get("/patient/:patientID", checkAuth, getAllAppointmentsByPatientID);
router.get("/:appointmentID", checkAuth, getAppointmentByID);
router.put("/:appointmentID", checkAuth, updateAppointment);
router.delete("/:appointmentID", checkAuth, deleteAppointment);



module.exports = router;
