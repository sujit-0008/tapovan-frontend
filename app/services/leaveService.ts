import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  StudentLeave,
  CreateLeaveRequest,
  UpdateLeaveRequest,
  UpdateLeaveStatusRequest,
  LeaveListResponse,
  AbsentCountResponse,
  MyLeavesResponse,
} from '../types/leave';

// Student services
export const createLeave = async (data: CreateLeaveRequest): Promise<StudentLeave> => {
  const response = await api.post<StudentLeave>(API_ROUTES.LEAVE.STUDENT.CREATE, data);
  return response.data;
};

export const updateLeave = async (id: string, data: UpdateLeaveRequest): Promise<StudentLeave> => {
  const response = await api.put<StudentLeave>(
    API_ROUTES.LEAVE.STUDENT.UPDATE.replace(':id', id),
    data
  );
  return response.data;
};

export const getMyLeaves = async (): Promise<StudentLeave[]> => {
  const response = await api.get<MyLeavesResponse>(API_ROUTES.LEAVE.STUDENT.MY_LEAVES);
  return response.data.leaves || [];
};

// Admin services
export const getLeaves = async (
  status?: string,
  studentId?: string,
  page: number = 1,
  limit: number = 10
): Promise<LeaveListResponse> => {
  const params: any = { page, limit };
  if (status) params.status = status;
  if (studentId) params.studentId = studentId;

  const response = await api.get<LeaveListResponse>(API_ROUTES.LEAVE.ADMIN.LIST, { params });
  return response.data;
};

export const updateLeaveStatus = async (
  id: string,
  data: UpdateLeaveStatusRequest
): Promise<StudentLeave> => {
  const response = await api.patch<{ message: string; leave: StudentLeave }>(
    API_ROUTES.LEAVE.ADMIN.UPDATE_STATUS.replace(':id', id),
    data
  );
  return response.data.leave;
};

export const getTodayAbsentCount = async (): Promise<AbsentCountResponse> => {
  const response = await api.get<AbsentCountResponse>(API_ROUTES.LEAVE.ADMIN.ABSENT_TODAY);
  return response.data;
};

// Vendor services
export const getTodayAbsentCountVendor = async (): Promise<AbsentCountResponse> => {
  const response = await api.get<AbsentCountResponse>(API_ROUTES.LEAVE.VENDOR.ABSENT_TODAY);
  return response.data;
};