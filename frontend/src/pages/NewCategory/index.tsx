import {  Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.css";
import { useToast } from "../../hooks/useToast";
import { createCategories } from "../../hooks/useCategories";
import type { CreateCategory } from "../../types/category";


export default function CreateCategories() {
    const navigate = useNavigate();
    const {showToast} = useToast()

    const createCategory = createCategories()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategory>();

    function onSubmit(data: CreateCategory) {

        createCategory.mutate({
            name: data.name
        }, {
            onSuccess: () => {
                
                showToast("Categoria criada com sucesso!", "success")

                navigate('/')
            },

            onError: () => {
                showToast("Erro ao criar categoria", "error")
            }
        })

    }

    return (
        <div className="create-ticket-page">

            <div className="create-ticket-card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-section">
                        <h2>Criar nova categoria</h2>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">
                            Nome da categoria <span>*</span>
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Ex: Infraestrutura"
                            {...register("name", {
                                required: "Informe o nome da categoria",
                            })}
                        />

                        {errors.name && (
                            <small>{errors.name.message}</small>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/")}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="submit-ticket-button"
                        >
                            <Send size={17} />
                            Salvar categoria
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}