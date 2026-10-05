import prisma from "../../lib/prisma.js";
import { CreateTicketType, UpdateTicketType } from "../types/ticket.type.js";

class TicketService {

    async createTicket(data: CreateTicketType, userId: number) {
        const ticket = await prisma.ticket.create({
            data: {
                title: data.title,
                description: data.description,
                userId: userId,
                categoryId: data.categoryId
            }
        })

        return ticket
    }

    async findAll() {
        const tickets = await prisma.ticket.findMany(
            {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    user: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    category: {
                        select: {
                            name: true
                        }
                    },
                    status: true,
                    createdAt: true
                }
            }
        )

        return tickets
    }

    async findById(id: number) {
        const existTicket = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        })

        if (!existTicket) throw new Error("Ticket não encontrado")

        return await prisma.ticket.findUnique({
            where: {
                id: id
            }, select: {
                title: true,
                description: true,
                status: true,
                user: {
                    select: {
                        name: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    async findByUser(id: number){
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: id
            }, select: {
                title: true,
                description: true,
                status: true,
                category: {
                    select: {
                        name: true
                    }
                },
                createdAt: true
            }
        })

        return tickets
    }

    async updateTicket(data: UpdateTicketType, id: number) {
        const existTicket = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        })

        if (!existTicket) throw new Error("Ticker não encontrado")

        return await prisma.ticket.update({
            where: {
                id: id
            }, data: {
                title: data.title,
                description: data.description,
                categoryId: data.categoryId,
                status: data.status
            }
        })
    }

    async deleteTicket(id: number) {
        const existTicket = await prisma.ticket.findUnique({
            where: {
                id: id
            }
        })

        if (!existTicket) throw new Error("Ticker não encontrado")

        return prisma.ticket.delete({
            where: {
                id: id
            }
        })
    }
}

export default new TicketService()