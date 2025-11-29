import express from "express";
import { 
    createAppointmentService,
    getAppointmentServicesByLicense,
    getAppointmentServiceById,
    updateAppointmentService,
    deleteAppointmentService,
    getAppointmentServiceByApp
} from "../controllers/appointmentService/appointmentService";


const CheckAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post("/", CheckAuth, createAppointmentService);
router.get("/", CheckAuth, getAppointmentServicesByLicense);
router.get("/:id", CheckAuth, getAppointmentServiceById);
router.get("/appointment/:appointmentID", CheckAuth, getAppointmentServiceByApp);
router.put("/:id", CheckAuth, updateAppointmentService);
router.delete("/:id", CheckAuth, deleteAppointmentService);

module.exports = router;
