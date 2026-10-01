import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRoutes = Router()


userRoutes.post('/create', userController.createUser)


export default userRoutes