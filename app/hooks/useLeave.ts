import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLeave,
  updateLeave,
  getMyLeaves,
  getLeaves,
  updateLeaveStatus,
  getTodayAbsentCount,
  getTodayAbsentCountVendor,
} from '../services/leaveService';
import {
  CreateLeaveRequest,
  UpdateLeaveRequest,
  UpdateLeaveStatusRequest,
  StudentLeave,
  LeaveListResponse,
  AbsentCountResponse,
} from '../types/leave';

// Student hooks
export const useCreateLeave = () => {
  const queryClient = useQueryClient();
  return useMutation<StudentLeave, Error, CreateLeaveRequest>({
    mutationFn: createLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-leaves'] });
    },
    onError: (error: any) => {
      console.error('Create leave error:', error.message);
      // Enhanced error handling - the error interceptor already provides better messages
    },
  });
};

export const useUpdateLeave = () => {
  const queryClient = useQueryClient();
  return useMutation<StudentLeave, Error, { id: string; data: UpdateLeaveRequest }>({
    mutationFn: ({ id, data }) => updateLeave(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-leaves'] });
    },
    onError: (error: any) => {
      console.error('Update leave error:', error.message);
    },
  });
};

export const useMyLeaves = () => {
  return useQuery<StudentLeave[], Error>({
    queryKey: ['my-leaves'],
    queryFn: getMyLeaves,
  });
};

// Admin hooks
export const useLeaves = (status?: string, studentId?: string, page: number = 1, limit: number = 10) => {
  return useQuery<LeaveListResponse, Error>({
    queryKey: ['leaves', status, studentId, page, limit],
    queryFn: () => getLeaves(status, studentId, page, limit),
  });
};

export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<StudentLeave, Error, { id: string; data: UpdateLeaveStatusRequest }>({
    mutationFn: ({ id, data }) => updateLeaveStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaves'] });
      queryClient.invalidateQueries({ queryKey: ['absent-count'] });
    },
    onError: (error: any) => {
      console.error('Update leave status error:', error.message);
      // Enhanced error handling - the error interceptor provides detailed backend messages
    },
  });
};

export const useTodayAbsentCount = () => {
  return useQuery<AbsentCountResponse, Error>({
    queryKey: ['absent-count'],
    queryFn: getTodayAbsentCount,
  });
};

// Vendor hooks
export const useTodayAbsentCountVendor = () => {
  return useQuery<AbsentCountResponse, Error>({
    queryKey: ['absent-count-vendor'],
    queryFn: getTodayAbsentCountVendor,
  });
};