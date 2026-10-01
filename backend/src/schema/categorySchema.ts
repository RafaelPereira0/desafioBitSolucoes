import z from "zod";

const categorySchema = z.object({
    name: z.string().min(3, "O nome deve ter mais de 3 caracteres")
})

export default categorySchema