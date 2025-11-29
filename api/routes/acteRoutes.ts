import express from "express";
import {
    newAct,
    updateAct,
    getAllActs,
    getActByID,
    deleteAct,
} from "../controllers/Act";

const checkAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post("/", checkAuth, newAct);
router.put("/:actID", checkAuth, updateAct);
router.delete("/:actID", checkAuth, deleteAct);
router.get("/", checkAuth, getAllActs);
router.get("/:actID", checkAuth, getActByID);




module.exports = router;
