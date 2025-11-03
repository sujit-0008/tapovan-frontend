
import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  CreateStaffRequest,
  CreateStaffResponse,
  EditStaffRequest,
  EditStaffResponse,
  DeleteStaffResponse,
  GetVendorsResponse,
  AllStaffResponse,
  AllStaffQueryParams,
} from '../types/staff';

export const createStaff = async (data: CreateStaffRequest): Promise<CreateStaffResponse> => {
  const response = await api.post<CreateStaffResponse>(API_ROUTES.STAFF.CREATE, data);
  return response.data;
};

export const getAllStaff = async (params: AllStaffQueryParams = {}): Promise<AllStaffResponse> => {
  const response = await api.get<AllStaffResponse>(API_ROUTES.STAFF.ALL, { params });
  return response.data;
};

export const editStaff = async (id: string, data: EditStaffRequest): Promise<EditStaffResponse> => {
  const response = await api.put<EditStaffResponse>(API_ROUTES.STAFF.EDIT.replace(':id', id), data);
  return response.data;
};

export const deleteStaff = async (id: string): Promise<DeleteStaffResponse> => {
  const response = await api.delete<DeleteStaffResponse>(API_ROUTES.STAFF.DELETE.replace(':id', id));
  return response.data;
};

export const getVendors = async (): Promise<GetVendorsResponse> => {
  const response = await api.get<GetVendorsResponse>(API_ROUTES.STAFF.VENDORS);
  return response.data;
};
