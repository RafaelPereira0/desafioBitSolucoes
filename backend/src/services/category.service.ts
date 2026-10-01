import prisma from "../../lib/prisma.js";
import { Category, createCategory } from "../types/category.type.js";

class CategoryService{

    async createCategory(data: createCategory){
        const name = data.name

        const alreadyExists = await prisma.category.findFirst({
            where:{
                name: {
                    equals: name,
                    mode: "insensitive"
                }
            }
        })

        if(alreadyExists) throw new Error("Categoria já cadastrada")

        return await prisma.category.create({
            data: {
                name: data.name
            }
        })
    }

    async findAll(){
        const categories: Category[] = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            },orderBy:{
                name: 'asc'
            }
        })

        if(!categories) throw new Error("Nenhuma categoria cadastrada")

        return categories
    }

    async findById(id: number){
        const category = await prisma.category.findUnique({
            where: {
                id: id
            },select: {
                name: true,
                id: true,
                tickets: {
                    select: {
                        id: true,
                        title: true,
                        user: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if(!category) throw new Error("Categoria não encontrada")

        return category
    }

    async updateCategory(id: number, data: Category){
        const categoryExists = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if(!categoryExists) throw new Error("Categoria não encontrada")

        return await prisma.category.update({
            where:{
                id: id
            }, data: data
        })
    }

    async deleteCategory(id: number){
        const categoryExists = await prisma.category.findUnique({
            where: {
                id: id
            }
        })

        if(!categoryExists) throw new Error("Categoria não encontrada")

        const existsInTicket = await prisma.ticket.findFirst({
            where: {
                categoryId: id
            }
        })

        if(existsInTicket) throw new Error("Categoria cadastrada em um ticket")

        return await prisma.category.delete({
            where: {
                id: id
            }
        })
    }
}

export default new CategoryService()