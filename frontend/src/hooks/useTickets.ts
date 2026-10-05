import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicketApi, getTicketsApi, getUserTickets, updateTicketApi } from "../api/tickets.api";
import type { CreateTicket, TicketsType, UpdateTicket } from "../types/tickets";

export function useTickets(options? : {enabled: boolean}) {
    return useQuery<TicketsType[]>({
        queryKey: ["tickets"],
        queryFn: getTicketsApi,
        enabled: options?.enabled ?? true
    })
}

export function createTicket() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateTicket) => createTicketApi(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tickets"]
            })
        }
    })
}

export function useUpdateTicket() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: number,
            data: UpdateTicket
        }) => updateTicketApi(data,id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tickets"]
            })
        }
    })
}

export function useUserTickets(){

    return useQuery<TicketsType[]>({
        queryKey: ["tickets", "me"],
        queryFn: getUserTickets
    })
}