
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStaff } from '../services/staffService';
import { DeleteStaffResponse } from '../types/staff';

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<DeleteStaffResponse, Error, string>({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
    onError: (error) => {
      console.error('Delete staff error:', error.message);
    },
  });
};
