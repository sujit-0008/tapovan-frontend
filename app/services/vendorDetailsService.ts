import api from './api';
import { API_ROUTES } from '../constants/api';
import {

  VendorDetailsResponse,
  ApproveVendorRequest,
  ApproveVendorResponse,
} from '../types/vendor';



export const getVendorDetails = async (id: string): Promise<VendorDetailsResponse> => {
  const response = await api.get<VendorDetailsResponse>(API_ROUTES.VENDOR.DETAILS.replace(':id', id));
  return response.data;
};

export const approveVendor = async (id: string, data: ApproveVendorRequest): Promise<ApproveVendorResponse> => {
  const response = await api.post<ApproveVendorResponse>(API_ROUTES.VENDOR.APPROVE.replace(':id', id), data);
  return response.data;
};