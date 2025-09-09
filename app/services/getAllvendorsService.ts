import api from './api';
import { API_ROUTES } from '../constants/api';
import {AllVendorsResponse,
  AllVendorsQueryParams,
} from '../types/allVendors';

export const getAllVendors = async (params: AllVendorsQueryParams = {}): Promise<AllVendorsResponse> => {
  const response = await api.get<AllVendorsResponse>(API_ROUTES.VENDOR.ALL, { params });
  return response.data;
};