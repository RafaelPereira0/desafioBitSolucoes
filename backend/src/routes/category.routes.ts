import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";

const categoryRoutes = Router()

categoryRoutes.use(authMiddleware)

categoryRoutes.post('/create',roleMiddleware(UserRole.ADMIN) ,categoryController.createCategory)
categoryRoutes.get('/all', categoryController.findAllCategories)
categoryRoutes.delete('/:id', roleMiddleware(UserRole.ADMIN), categoryController.deleteCategory)
categoryRoutes.put('/:id', roleMiddleware(UserRole.ADMIN), categoryController.updateCategory)
categoryRoutes.post('/:id', categoryController.findById)

export default categoryRoutes