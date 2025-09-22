
import { useMutation } from '@tanstack/react-query';
import { createTicket } from '../services/studentFacilityService';
import { CreateTicketRequest, CreateTicketResponse } from '../types/studentFacility';

export const useCreateTicket = () => {
  return useMutation<CreateTicketResponse, Error, { data: CreateTicketRequest; file?: File }>({
    mutationFn: ({ data, file }) => createTicket(data, file),
    onError: (error) => {
      console.error('Create ticket error:', error.message);
    },
  });
};
