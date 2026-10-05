import { ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.css";
import { useCategories } from "../../hooks/useCategories";
import { createTicket } from "../../hooks/useTickets";
import type { CreateTicket } from "../../types/tickets";
import { useToast } from "../../hooks/useToast";


export default function CreateTicket() {
    const navigate = useNavigate();
    const {showToast} = useToast()

    const { data: categories, isLoading, isError } = useCategories()
    const createTickets = createTicket()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTicket>();

    function onSubmit(data: CreateTicket) {

        createTickets.mutate({
            title: data.title, 
            description: data.description,
            categoryId: Number(data.categoryId)
        }, {
            onSuccess: () => {
                
                showToast("Ticket criado com sucesso!", "success")

                navigate('/tickets')
            },

            onError: () => {
                showToast("Erro ao criar ticket", "error")
            }
        })

    }

    return (
        <div className="create-ticket-page">
            <div className="create-ticket-header">
                <button
                    className="back-button"
                    onClick={() => navigate("/tickets")}
                >
                    <ArrowLeft size={18} />
                    Voltar para chamados
                </button>

                <div>
                    <h1>Novo chamado</h1>
                    <p>
                        Preencha as informações abaixo para abrir um novo
                        chamado.
                    </p>
                </div>
            </div>

            <div className="create-ticket-card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-section">
                        <h2>Informações do chamado</h2>
                        <p>
                            Informe o problema ou solicitação que deseja
                            registrar.
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">
                            Título <span>*</span>
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Ex: Problema ao acessar o sistema"
                            {...register("title", {
                                required: "Informe o título do chamado",
                            })}
                        />

                        {errors.title && (
                            <small>{errors.title.message}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryId">
                            Categoria <span>*</span>
                        </label>

                        <select
                            id="categoryId"
                            disabled={isLoading}
                            {...register("categoryId", {
                                required: "Selecione uma categoria",
                            })}
                        >
                            <option value="">
                                {isLoading ? "Carregando..." : "Selecione uma categoria"}
                            </option>

                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.categoryId && (
                            <small>{errors.categoryId.message}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            Descrição <span>*</span>
                        </label>

                        <textarea
                            id="description"
                            rows={7}
                            placeholder="Descreva detalhadamente o problema ou solicitação..."
                            {...register("description", {
                                required: "Informe a descrição do chamado",
                                minLength: {
                                    value: 10,
                                    message:
                                        "A descrição deve ter pelo menos 10 caracteres",
                                },
                            })}
                        />

                        {errors.description && (
                            <small>{errors.description.message}</small>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/tickets")}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="submit-ticket-button"
                        >
                            <Send size={17} />
                            Abrir chamado
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}