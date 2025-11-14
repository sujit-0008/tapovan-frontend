
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTickets } from '../services/ticketService';
import { TicketStatus } from '../types/ticket';

export const useTickets = (status: TicketStatus = 'PENDING', page: number = 1) => {
  return useQuery({
    queryKey: ['tickets', status, page],
    queryFn: () => getTickets(status, page),
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      import('../services/ticketService').then(m => m.updateTicket(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useAssignTicketBySkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ticketId: string) =>
      import('../services/ticketService').then(m => m.assignTicketBySkills(ticketId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

export const useStaffBySkills = (skills?: string) => {
  return useQuery({
    queryKey: ['staff-by-skills', skills],
    queryFn: () => import('../services/ticketService').then(m => m.getStaffBySkills(skills)),
    enabled: !!skills,
  });
};

export const useSkillsForCategory = () => {
  return useQuery({
    queryKey: ['skills-for-category'],
    queryFn: () => import('../services/ticketService').then(m => m.getSkillsForCategory),
  });
};
