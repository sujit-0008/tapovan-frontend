
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../services/studentFacilityService';
import { CreateBookingRequest, CreateBookingResponse } from '../types/studentFacility';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateBookingResponse, Error, CreateBookingRequest>({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Create booking error:', error.message);
    },
  });
};
