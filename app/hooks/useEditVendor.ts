
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editVendor } from '../services/editVendorService';
import { EditVendorRequest, EditVendorResponse } from '../types/editVendor';

export const useEditVendor = (vendorId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    EditVendorResponse,
    Error,
    { data: EditVendorRequest; files: { photo?: File; kycBusinessReg?: File; kycTaxId?: File; kycAddressProof?: File; formFileUrls?: File } }
  >({
    mutationFn: ({ data, files }) => editVendor(vendorId, data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor', vendorId] });
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
    onError: (error) => {
      console.error('Edit vendor error:', error.message);
    },
  });
};
