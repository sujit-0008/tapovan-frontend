export interface Payment {
  id: number;
  studentId: string;
  month: string;
  totalAnnualFees: number;
  totalRemainingFees: number;
  monthlyAmount: number;
  paidAmount: number;
  paid: boolean;
  paymentDate?: string | null;
  remarks?: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  studentId: string;
  month: string;
  totalAnnualFees: number;
  totalRemainingFees: number;
  monthlyAmount: number;
  paidAmount?: number;
  paid?: boolean;
  paymentDate?: string;
  remarks?: string;
}

export interface CreatePaymentResponse {
  message: string;
  payment: Payment;
}

export interface UpdatePaymentRequest {
  totalAnnualFees?: number;
  totalRemainingFees?: number;
  monthlyAmount?: number;
  paidAmount?: number;
  paid?: boolean;
  paymentDate?: string | null;
  remarks?: string | null;
}

export interface UpdatePaymentResponse {
  message: string;
  payment: Payment;
}

export interface PaymentHistoryResponse {
  payments: Payment[];
  total: number;
  page: number;
  pages: number;
}

export interface PaymentHistoryQueryParams {
  year?: string;
  page?: number;
}

export interface PaymentStats {
  totalStudents: number;
  paidStudents: number;
  pendingStudents: number;
}

export interface PaymentStatsResponse {
  month: string;
  stats: PaymentStats;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}