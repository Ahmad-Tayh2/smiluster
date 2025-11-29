import express from "express";
import { getAllTeethByAct } from "../controllers/Act";
import { assignProcedureToTooth, getAllActsByToothID } from "../controllers/Tooth";
import { updateToothAct } from "../controllers/ToothAct/updateToothAct.controller";
import { deleteToothAct } from "../controllers/ToothAct/deleteToothAct.controller";
import { getActsByAppointment } from "../controllers/ToothAct/getActsByApp.controller";
import { getToothActByPatient } from "../controllers/ToothAct/getActsByPatient.controller";

const checkAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.get("/:actID", checkAuth, getAllTeethByAct);
router.post("/", checkAuth, assignProcedureToTooth);
router.get("/acts/:toothID", checkAuth, getAllActsByToothID);
router.put("/:toothActID", checkAuth, updateToothAct);
router.delete("/:toothActID", checkAuth, deleteToothAct);
router.get("/appointment/:appointmentID", checkAuth, getActsByAppointment);
router.get("/patient/:patientID", checkAuth, getToothActByPatient);

module.exports = router;
