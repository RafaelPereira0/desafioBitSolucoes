import { Request, Response } from "express";
import { ticketSchema, updateTicketSchema } from "../schema/ticketSchema.js";
import ticketService from "../services/ticket.service.js";

class TicketController {

    async createTicket(req: Request, res: Response) {
        try {
            const data = ticketSchema.parse(req.body)
            const userId = Number(req.user?.id)

            const newTicket = await ticketService.createTicket(data, userId)

            return res.status(201).json({ message: "Ticket criado com sucesso", newTicket })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findAllTickets(req: Request, res: Response) {
        try {
            const tickets = await ticketService.findAll()

            return res.status(200).json({ result: tickets })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const ticketId = Number(req.params.id)

            const ticket = await ticketService.findById(ticketId)

            return res.status(200).json({ result: ticket })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async findByUser(req: Request, res: Response){
        try {
            const userId = Number(req.user?.id)

            const tickets = await ticketService.findByUser(userId)

            return res.status(200).json({ result: tickets })
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async updateTicket(req: Request, res: Response) {
        try {
            const data = updateTicketSchema.parse(req.body)
            const ticketId = Number(req.params.id)
            
            const updated = await ticketService.updateTicket(data, ticketId)

            return res.status(200).json({message: "Ticket atualizado com sucesso", result: updated})
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }

    async deleteTicket(req: Request, res: Response) {
        try {
            const ticketId = Number(req.params.id)

            const deleted = await ticketService.deleteTicket(ticketId)

            return res.status(200).json({message: "Ticket deletado com sucesso", result: deleted})
        } catch (err: any) {
            return res.status(400).json({ error: err.message })
        }
    }
}

export default new TicketController()