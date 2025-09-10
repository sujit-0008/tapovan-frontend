import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory } from '../services/paymentService';
import { PaymentHistoryResponse, PaymentHistoryQueryParams } from '../types/payment';

export const usePaymentHistory = (studentId: string, params: PaymentHistoryQueryParams = { page: 1 }) => {
  return useQuery<PaymentHistoryResponse, Error>({
    queryKey: ['paymentHistory', studentId, params],
    queryFn: () => getPaymentHistory(studentId, params),
    //keepPreviousData: true,
  });
};