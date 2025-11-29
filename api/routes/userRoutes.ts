import express from "express";
import {
    newUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserByID,
    getUserByLicenseID,
    resetPasswordUser,
} from "../controllers/User";
const router = express.Router();
const { loginUser } = require("../controllers/Auth/login.controller");
const {
    forgotPasswordUser,
} = require("../controllers/Auth/forgotPassword.controller");
const { signupUser } = require("../controllers/Auth/signup.controller");
const checkAuth = require("../middlewares/client/check-auth");


router.post("/login", loginUser);
router.post("/forgot-password", forgotPasswordUser);
router.post("/signup", signupUser);
router.post("/reset-password", resetPasswordUser);

router.post("/", checkAuth, newUser);
router.put("/:userID", checkAuth, updateUser);
router.delete("/:userID", checkAuth, deleteUser);
router.get("/", checkAuth, getAllUsers); //we should create checkauthby role "Admin"
router.get("/:userID", checkAuth, getUserByID);
router.get("/:licenseID", checkAuth, getUserByLicenseID);

module.exports = router;
