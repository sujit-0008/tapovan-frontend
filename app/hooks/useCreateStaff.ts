
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStaff } from '../services/staffService';
import { CreateStaffRequest, CreateStaffResponse } from '../types/staff';

export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateStaffResponse, Error, CreateStaffRequest>({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
    onError: (error) => {
      console.error('Create staff error:', error.message);
    },
  });
};
