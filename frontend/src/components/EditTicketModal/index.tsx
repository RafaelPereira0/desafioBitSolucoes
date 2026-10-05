import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import './styles.css';
import type { EditTicketModalProps, TicketFormData, TicketStatus } from "../../types/tickets";
import { useAuth } from "../../hooks/useAuth";

export default function EditTicketModal({
    ticket,
    isOpen,
    onClose,
    onSave,
}: EditTicketModalProps) {
    const { user: currentUser } = useAuth(); 
    const isAdmin = currentUser?.role === "ADMIN"; 

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TicketFormData>();

    useEffect(() => {
        if (ticket) {
            reset({
                title: ticket.title,
                description: ticket.description,
                status: ticket.status as TicketStatus,
            });
        }
    }, [ticket, reset]);

    if (!ticket) return null;

    const onSubmit = (data: TicketFormData) => {
        onSave({
            id: ticket.id,
            ...data,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isAdmin ? `Editar Chamado #${ticket.id}` : `Detalhes do Chamado #${ticket.id}`}
            width="600px"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="ticket-edit-form">
                <div className="ticket-modal-field">
                    <label htmlFor="title">Título</label>
                    <input
                        id="title"
                        type="text"
                        disabled={!isAdmin}
                        {...register("title", {
                            required: "O título é obrigatório",
                        })}
                    />
                    {errors.title && (
                        <span className="error-message">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                <div className="ticket-modal-field">
                    <label htmlFor="description">Descrição</label>
                    <textarea
                        id="description"
                        rows={4}
                        disabled={!isAdmin}
                        {...register("description", {
                            required: "A descrição é obrigatória",
                        })}
                    />
                    {errors.description && (
                        <span className="error-message">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                <div className="ticket-modal-grid">
                    <div className="ticket-modal-field">
                        <label htmlFor="status">Status</label>
                        <select 
                            id="status" 
                            disabled={!isAdmin}
                            {...register("status")}
                        >
                            <option value="OPEN">Aberto</option>
                            <option value="IN_PROGRESS">Em andamento</option>
                            <option value="COMPLETED">Concluído</option>
                        </select>
                    </div>

                    <div className="ticket-modal-field">
                        <span>Categoria</span>
                        <strong>{ticket.category.name}</strong>
                    </div>

                    <div className="ticket-modal-field">
                        <span>Solicitante</span>
                        <strong>{ticket.user.name}</strong>
                    </div>

                    <div className="ticket-modal-field">
                        <span>Criado em</span>
                        <strong>
                            {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                        </strong>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        {isAdmin ? "Cancelar" : "Fechar"}
                    </button>

                    {isAdmin && (
                        <button type="submit" className="btn-primary">
                            Salvar Alterações
                        </button>
                    )}
                </div>
            </form>
        </Modal>
    );
}