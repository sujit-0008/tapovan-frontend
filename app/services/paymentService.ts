import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  UpdatePaymentRequest,
  UpdatePaymentResponse,
  PaymentHistoryResponse,
  PaymentHistoryQueryParams,
} from '../types/payment';

export const createPayment = async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
  const response = await api.post<CreatePaymentResponse>(API_ROUTES.PAYMENT.CREATE, data);
  return response.data;
};

export const updatePayment = async (id: string, data: UpdatePaymentRequest): Promise<UpdatePaymentResponse> => {
  const response = await api.post<UpdatePaymentResponse>(API_ROUTES.PAYMENT.UPDATE.replace(':id', id), data);
  return response.data;
};

export const getPaymentHistory = async (
  studentId: string,
  params: PaymentHistoryQueryParams = {}
): Promise<PaymentHistoryResponse> => {
  const response = await api.get<PaymentHistoryResponse>(
    API_ROUTES.PAYMENT.HISTORY.replace(':studentId', studentId),
    { params }
  );
  return response.data;
};