import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveVendor } from '../services/vendorDetailsService';
import { ApproveVendorRequest, ApproveVendorResponse } from '../types/vendor';
import { useRouter } from 'next/navigation';

export const useApproveVendor = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApproveVendorResponse, Error, { id: string; data: ApproveVendorRequest }>({
    mutationFn: ({ id, data }) => approveVendor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      router.push('/admin-dashboard');
    },
    onError: (error) => {
      console.error('Approval error:', error.message);
    },
  });
};