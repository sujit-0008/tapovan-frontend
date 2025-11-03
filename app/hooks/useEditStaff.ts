
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editStaff } from '../services/staffService';
import { EditStaffRequest, EditStaffResponse } from '../types/staff';

export const useEditStaff = () => {
  const queryClient = useQueryClient();
  return useMutation<EditStaffResponse, Error, { id: string; data: EditStaffRequest }>({
    mutationFn: ({ id, data }) => editStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    },
    onError: (error) => {
      console.error('Edit staff error:', error.message);
    },
  });
};
