import z from "zod";

export const ticketSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
    categoryId: z.number().int().positive("Categoria inválida"),
})

export const updateTicketSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(3).optional(),
    categoryId: z.number().optional(),
    status: z.enum(["OPEN","IN_PROGRESS","COMPLETED"]).optional()
})
