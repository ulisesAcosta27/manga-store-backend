import { Router } from "express";
import * as userController from '../controllers/user.controller.js'
import { isAdmin, verifyToken, checkRolesExisted } from "../middlewares/index.js";


const router = Router();

router.post("/", [verifyToken, isAdmin, checkRolesExisted], userController.createUser);
router.get("/", [verifyToken, isAdmin, checkRolesExisted], userController.getUsers);

export default router;