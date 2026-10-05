import type { CreateCategory } from "../types/category";
import { api } from "./axios";

export async function getCategoriesApi() {
    const response = await api.get("/category/all")

    return response.data.result
}

export async function createCategoryApi(data: CreateCategory) {
    const response = await api.post("/category/create", data)

    return response.data.result
}