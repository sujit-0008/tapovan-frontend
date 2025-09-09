import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveStudent } from '../services/studentDetailsService';
import { ApproveStudentRequest, ApproveStudentResponse } from '../types/student';
import { useRouter } from 'next/navigation';

export const useApproveStudent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApproveStudentResponse, Error, { id: string; data: ApproveStudentRequest }>({
    mutationFn: ({ id, data }) => approveStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      router.push('/admin-dashboard');
    },
    onError: (error) => {
      console.error('Approval error:', error.message);
    },
  });
};