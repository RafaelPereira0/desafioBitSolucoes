import { useState } from "react";
import {
    Search,
    Clock,
    CheckCircle2,
    AlertCircle,
    Pencil,
} from "lucide-react";

import EditTicketModal from "../../components/EditTicketModal";
import { useTickets, useUpdateTicket, useUserTickets } from "../../hooks/useTickets";
import { useAuth } from "../../hooks/useAuth"; // 1. Importar o hook do utilizador autenticado
import type { TicketsType, UpdateTicket } from "../../types/tickets";

import "./styles.css";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

export default function Tickets() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("TODOS");

    const { user: currentUser } = useAuth();
    const updateTicket = useUpdateTicket();
    const { showToast } = useToast();

    const isAdmin = currentUser?.role === "ADMIN";


    const allTicketsQuery = useTickets({ enabled: isAdmin });

    const userTicketsQuery = useUserTickets();

    const tickets = isAdmin ? allTicketsQuery.data : userTicketsQuery.data;
    const isLoading = isAdmin ? allTicketsQuery.isLoading : userTicketsQuery.isLoading;

    const [selectedTicket, setSelectedTicket] = useState<TicketsType | null>(null);

    const filteredTickets = tickets?.filter((ticket: TicketsType) => {
        const matchesSearch =
            ticket.title.toLowerCase().includes(search.toLowerCase()) ||
            ticket.user.name.toLowerCase().includes(search.toLowerCase()) ||
            ticket.category.name.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "TODOS" || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    function getStatusLabel(status: TicketStatus) {
        switch (status) {
            case "OPEN":
                return "Aberto";
            case "IN_PROGRESS":
                return "Em andamento";
            case "COMPLETED":
                return "Concluído";
        }
    }

    function getStatusIcon(status: TicketStatus) {
        switch (status) {
            case "OPEN":
                return <AlertCircle size={16} />;
            case "IN_PROGRESS":
                return <Clock size={16} />;
            case "COMPLETED":
                return <CheckCircle2 size={16} />;
        }
    }

    function handleSaveTicket(updatedTicketData: UpdateTicket) {
        updateTicket.mutate(
            {
                id: Number(updatedTicketData.id),
                data: updatedTicketData,
            },
            {
                onSuccess: () => {
                    showToast("Ticket atualizado com sucesso", "success");
                    setSelectedTicket(null);
                },
                onError: () => {
                    showToast("Erro ao atualizar ticket", "error");
                },
            }
        );
    }

    return (
        <div className="tickets-page">
            <div className="tickets-header">
                <div>
                    {isAdmin ? (
                        <>
                            <h1>Chamados</h1>
                            <p>Gerencie e acompanhe os chamados do sistema.</p>
                        </>
                    ) : <>
                        <h1>Seus Chamados</h1>
                    </>}
                </div>
            </div>

            <div className="tickets-content">
                <div className="tickets-filters">
                    <div className="search-box">
                        <Search size={19} />
                        <input
                            type="text"
                            placeholder="Buscar chamado..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="TODOS">Todos os status</option>
                        <option value="OPEN">Aberto</option>
                        <option value="IN_PROGRESS">Em andamento</option>
                        <option value="COMPLETED">Concluído</option>
                    </select>
                </div>

                <div className="tickets-table">
                    <div className="tickets-table-header">
                        <span>Chamado</span>
                        <span>Categoria</span>
                        <span>Solicitante</span>
                        <span>Status</span>
                        <span>Data</span>
                        <span></span>
                    </div>

                    {filteredTickets?.length === 0 ? (
                        <div className="empty-tickets">
                            <p>Nenhum chamado encontrado.</p>
                        </div>
                    ) : (
                        filteredTickets?.map((ticket) => (
                            <div className="ticket-row" key={ticket.id}>
                                <div className="ticket-info">
                                    <strong>
                                        #{ticket.id} - {ticket.title}
                                    </strong>
                                </div>

                                <span className="ticket-category">
                                    {ticket.category.name}
                                </span>

                                <span className="ticket-user">
                                    {isAdmin ? ticket.user.name : currentUser?.name}
                                </span>

                                <span
                                    className={`ticket-status ${ticket.status.toLowerCase()}`}
                                >
                                    {getStatusIcon(ticket.status as TicketStatus)}
                                    {getStatusLabel(ticket.status as TicketStatus)}
                                </span>

                                <span className="ticket-date">
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString("pt-BR")}
                                </span>

                                {isAdmin && (
                                    <button
                                    className="view-ticket-button"
                                    title="Editar chamado"
                                    onClick={() => setSelectedTicket(ticket)}
                                >
                                    <Pencil size={18} />
                                </button>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <EditTicketModal
                    isOpen={selectedTicket !== null}
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    onSave={handleSaveTicket}
                />
            </div>
        </div>
    );
}