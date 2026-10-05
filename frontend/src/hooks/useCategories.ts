import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi, getCategoriesApi } from "../api/category.api";
import type { CategoryType, CreateCategory } from "../types/category";

export function useCategories() {
    return useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: getCategoriesApi
    })
}

export function createCategories() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateCategory) => createCategoryApi(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            })
        }
    })
}