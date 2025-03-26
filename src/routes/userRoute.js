import express from "express";
import {createUser, getallusers, deleteUser, uploadProfileImage} from '../controllers/userController.js';
import roleBasedAuth from "../middleware/rolebasedAuth.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/create", auth, roleBasedAuth(ROLE_ADMIN),  createUser);
router.delete("/delete/:id", auth, roleBasedAuth(ROLE_ADMIN),  deleteUser);
router.get("/getall", auth, roleBasedAuth(ROLE_ADMIN),  getallusers);

router.put("profile/upload", auth, uploadProfileImage );
export default router;