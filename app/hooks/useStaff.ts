
import { useQuery } from '@tanstack/react-query';
import { getAllStaff } from '../services/staffService';
import { AllStaffQueryParams, AllStaffResponse } from '../types/staff';

export const useStaff = (params: AllStaffQueryParams = {}) => {
  return useQuery<AllStaffResponse, Error>({
    queryKey: ['staff', params],
    queryFn: () => getAllStaff(params),
  });
};
