import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";

const ticketRoutes = Router();

ticketRoutes.use(authMiddleware);

ticketRoutes.post('/create', ticketController.createTicket)
ticketRoutes.post('/:id', ticketController.findById)
ticketRoutes.get('/your', ticketController.findByUser)
ticketRoutes.put('/:id', ticketController.updateTicket)
ticketRoutes.delete('/:id', ticketController.deleteTicket)
ticketRoutes.get('/all', roleMiddleware(UserRole.ADMIN), ticketController.findAllTickets)

export default ticketRoutes;