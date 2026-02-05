import { useQuery } from '@tanstack/react-query';
import { getPaymentStats } from '../services/paymentService';
import { PaymentStatsResponse } from '../types/payment';

export const usePaymentStats = (month?: number, year?: number) => {
    return useQuery<PaymentStatsResponse, Error>({
        queryKey: ['paymentStats', month, year],
        queryFn: () => getPaymentStats(month, year),
    });
};
