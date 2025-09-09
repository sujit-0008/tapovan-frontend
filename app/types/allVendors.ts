import {
  Vendor,
} from '../types/vendor'

export interface AllVendorsResponse {
  vendors: Vendor[];
  total: number;
  page: number;
  pages: number;
}

export interface AllVendorsQueryParams {
  status?: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  search?: string;
  page?: number;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}