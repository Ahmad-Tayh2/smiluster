import express from "express";
import {
    newTooth,
    updateTooth,
    deleteTooth,
    getToothByID,
    getAllTeethByPatientID,
} from "../controllers/Tooth";
const checkAuth = require("../middlewares/client/check-auth");

const router = express.Router();

router.post("/", checkAuth, newTooth);
router.put("/:toothID", checkAuth, updateTooth);
router.delete("/:toothID", checkAuth, deleteTooth);
router.get("/:toothID", checkAuth, getToothByID);
router.get("/patient/:patientID", checkAuth, getAllTeethByPatientID);



module.exports = router;
