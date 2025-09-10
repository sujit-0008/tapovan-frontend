import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePayment } from '../services/paymentService';
import { UpdatePaymentRequest, UpdatePaymentResponse } from '../types/payment';

export const useUpdatePayment = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation<UpdatePaymentResponse, Error, { id: string; data: UpdatePaymentRequest }>({
    mutationFn: ({ id, data }) => updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentHistory', studentId] });
    },
    onError: (error) => {
      console.error('Update payment error:', error.message);
    },
  });
};