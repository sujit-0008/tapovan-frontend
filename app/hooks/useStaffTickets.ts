import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyAssignedTickets, getMyTicketDetails, updateMyTicketStatus } from '../services/ticketService';
import { TicketStatus } from '../types/ticket';

export const useStaffTickets = (status: string = '', page: number = 1) => {
  return useQuery({
    queryKey: ['staff-tickets', status, page],
    queryFn: () => getMyAssignedTickets(status, page),
  });
};

export const useStaffTicketDetails = (id?: string) => {
  return useQuery({
    queryKey: ['staff-ticket', id],
    queryFn: () => getMyTicketDetails(id as string),
    enabled: !!id,
  });
};

export const useUpdateMyTicketStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, note }: { id: string; status: TicketStatus; note?: string }) => updateMyTicketStatus(id, status, note),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['staff-tickets'] });
      qc.invalidateQueries({ queryKey: ['staff-ticket'] });
    },
  });
};

