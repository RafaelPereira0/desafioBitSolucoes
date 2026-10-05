import type { CreateTicket, UpdateTicket } from "../types/tickets";
import { api } from "./axios";

export async function getTicketsApi() {
    const response = await api.get("/ticket/all")
    console.log(response)
    return response.data.result
}

export async function createTicketApi(data: CreateTicket) {
    const response = await api.post("/ticket/create", data)

    return response.data.result
}

export async function updateTicketApi(data:UpdateTicket, id: number) {
    const response = await api.put(`/ticket/${id}`, data)

    return response.data.result
}

export async function getUserTickets() {
    const response = await api.get("ticket/your")

    return response.data.result
}