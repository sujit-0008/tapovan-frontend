import { useMutation } from '@tanstack/react-query';
import { createTicket } from '../services/studentFacilityService';
import { CreateTicketRequest, CreateTicketResponse } from '../types/studentFacility';

export const useCreateTicket = () => {
  return useMutation<CreateTicketResponse, Error, CreateTicketRequest | { data: CreateTicketRequest; file?: File }>({
    mutationFn: (vars) => {
      // support either mutate(ticketForm) OR mutate({ data: ticketForm, file })
      if ((vars as any).data) {
        const { data, file } = vars as { data: CreateTicketRequest; file?: File };
        return createTicket(data, file);
      }
      return createTicket(vars as CreateTicketRequest);
    },
    onError: (error) => {
      console.error('Create ticket error:', error.message);
    },
  });
};
