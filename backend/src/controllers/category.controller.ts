import { Request, Response } from "express";
import categorySchema from "../schema/categorySchema.js";
import categoryService from "../services/category.service.js";

class CategoryController{

    async createCategory(req: Request, res: Response){
        try{
            const data = categorySchema.parse(req.body)
            const newCategory = await categoryService.createCategory(data)

            return res.status(201).json({message: "Categoria criada com sucesso", result: newCategory})
        }catch(err:any){
            return res.status(400).json({error: err.message})
        }
    }

    async findAllCategories(req: Request, res: Response){
        try{
            const data = await categoryService.findAll()

            return res.status(200).json({message: "Categorias encontradas", result: data})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async findById(req: Request, res: Response){
        try{
            const categoryId = Number(req.params.id)
            const category = await categoryService.findById(categoryId)

            return res.status(200).json({message: "Categoria encontrada", result: category})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async updateCategory(req: Request, res: Response){
        try{
            const categoryId = Number(req.params.id)
            const data = req.body

            const updated = await categoryService.updateCategory(categoryId, data)

            return res.status(200).json({message: "Categoria atualizada", result: updated})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }

    async deleteCategory(req: Request, res: Response){
        try{
            const categoryId = Number(req.params.id)

            const deleted = await categoryService.deleteCategory(categoryId)

            return res.status(200).json({message: "Categoria deletada", result: deleted})
        }catch(err: any){
            return res.status(400).json({error: err.message})
        }
    }
}

export default new CategoryController()