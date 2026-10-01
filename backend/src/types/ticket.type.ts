import { TicketStatus } from "../../generated/prisma/enums.js";

export interface CreateTicketType{
    title: string,
    description: string,
    categoryId: number
}

export interface UpdateTicketType{
    title?: string,
    categoryId?: number,
    description?: string,
    status?: TicketStatus,
}
