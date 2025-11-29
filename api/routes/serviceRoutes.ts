import express from "express";
import { createService,
    getServicesByLicense,
    getServiceById,
    updateService,
    deleteService,
} from "../controllers/Service/service.controller";

const CheckAuth = require('../middlewares/client/check-auth');
const router = express.Router();

router.post("/", CheckAuth, createService);
router.get("/", CheckAuth, getServicesByLicense);
router.get("/:serviceID", CheckAuth, getServiceById);
router.put("/:serviceID", CheckAuth, updateService);
router.delete("/:serviceID", CheckAuth, deleteService);

module.exports = router;
