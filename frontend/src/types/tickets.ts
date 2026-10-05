export interface TicketsType {
    id: number,
    title: string,
    description: string,
    user: {
        toLowerCase(): unknown,
        id: number,
        name: string
    },
    category: {
        name: string
    }, status: "OPEN" | "IN_PROGRESS" | "COMPLETED",
    createdAt: string
}

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";


export interface TicketFormData{
    title: string;
    description: string;
    status: TicketStatus;
};

export interface CreateTicket{
    title: string,
    description: string,
    categoryId: number
}

export interface UpdateTicket{
    id: number | string;
    title? : string,
    description?: string,
    status?: TicketStatus
}

export interface EditTicketModalProps {
    ticket: TicketsType | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: TicketFormData & { id: number | string }) => void;
};
