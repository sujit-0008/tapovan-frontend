import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPayment } from '../services/paymentService';
import { CreatePaymentRequest, CreatePaymentResponse } from '../types/payment';

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePaymentResponse, Error, CreatePaymentRequest>({
    mutationFn: createPayment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory', variables.studentId] });
    },
    onError: (error) => {
      console.error('Create payment error:', error.message);
    },
  });
};