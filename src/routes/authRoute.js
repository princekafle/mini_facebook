import express from "express";
import {login, register, logout, forgotPassword, resetPassword} from '../controllers/authController.js';


const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:userId", resetPassword);

export default router;