import {
    AlertCircle,
    Clock3,
    CheckCircle2,
    Ticket,
} from "lucide-react";

import "./styles.css";
import { useTickets, useUserTickets } from "../../hooks/useTickets";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.role === "ADMIN";

    const allTicketsQuery = useTickets({ enabled: isAdmin });

    const userTicketsQuery = useUserTickets();

    const tickets = isAdmin ? allTicketsQuery.data : userTicketsQuery.data;
    const isLoading = isAdmin ? allTicketsQuery.isLoading : userTicketsQuery.isLoading;

    const openTickets = tickets?.filter((ticket) => ticket.status === 'OPEN');
    const inProgressTickets = tickets?.filter((ticket) => ticket.status === 'IN_PROGRESS');
    const completedTickets = tickets?.filter((ticket) => ticket.status === 'COMPLETED');

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h1>Olá, {currentUser?.name ?? "usuário"}! 👋</h1>
                    <p>
                        Aqui está um resumo dos chamados do sistema.
                    </p>
                </div>
            </div>

            <section className="ticket-cards">

                <div className="ticket-card open">
                    <div className="ticket-card-icon">
                        <AlertCircle size={24} />
                    </div>

                    <div>
                        <span>Chamados abertos</span>
                        <strong>{isLoading ? "..." : openTickets?.length ?? 0}</strong>
                    </div>
                </div>


                <div className="ticket-card progress">
                    <div className="ticket-card-icon">
                        <Clock3 size={24} />
                    </div>

                    <div>
                        <span>Em andamento</span>
                        <strong>{isLoading ? "..." : inProgressTickets?.length ?? 0}</strong>
                    </div>
                </div>


                <div className="ticket-card completed">
                    <div className="ticket-card-icon">
                        <CheckCircle2 size={24} />
                    </div>

                    <div>
                        <span>Concluídos</span>
                        <strong>{isLoading ? "..." : completedTickets?.length ?? 0}</strong>
                    </div>
                </div>

            </section>


            <section className="recent-tickets">

                <div className="section-header">
                    <div>
                        <h2>Chamados recentes</h2>
                        <p>Últimos chamados registrados no sistema.</p>
                    </div>

                    <a href="/tickets">
                        Ver todos
                    </a>
                </div>


                <div className="tickets-list">
                    {isLoading ? (
                        <p className="loading-tickets">Carregando chamados...</p>
                    ) : tickets?.length === 0 ? (
                        <p className="empty-tickets">Nenhum chamado encontrado.</p>
                    ) : (
                        tickets?.slice(0, 3).map((ticket) => (
                            <div className="ticket-row" key={ticket.id}>
                                <div className="ticket-info">
                                    <div className="ticket-id">
                                        <Ticket size={18} />
                                        <span>#{ticket.id}</span>
                                    </div>

                                    <div>
                                        <strong>
                                            {ticket.title}
                                        </strong>

                                        <span>
                                            Criado em{" "}
                                            {new Date(
                                                ticket.createdAt
                                            ).toLocaleDateString("pt-BR")}
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className={`status ${
                                        ticket.status === "OPEN"
                                            ? "open-status"
                                            : ticket.status === "IN_PROGRESS"
                                                ? "progress-status"
                                                : "completed-status"
                                    }`}
                                >
                                    {ticket.status === "OPEN"
                                        ? "Aberto"
                                        : ticket.status === "IN_PROGRESS"
                                            ? "Em andamento"
                                            : "Concluído"}
                                </span>
                            </div>
                        ))
                    )}
                </div>

            </section>

        </div>
    );
}