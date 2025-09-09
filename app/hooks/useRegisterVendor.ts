import { useMutation } from '@tanstack/react-query';
import { registerVendor } from '../services/registerVendorService';
import { VendorRegistrationCredentials, VendorRegistrationResponse } from '../types/registerVendor';
import { useRouter } from 'next/navigation';

export const useRegisterVendor = () => {
  const router = useRouter();

  return useMutation<VendorRegistrationResponse, Error, { credentials: VendorRegistrationCredentials; files: { photo: File; formFileUrls?: File; kycBusinessReg?: File; kycTaxId?: File; kycAddressProof?: File } }>({
    mutationFn: ({ credentials, files }) => registerVendor(credentials, files),
    onSuccess: () => {
      router.push('/login?vendorRegistrationSuccess=true');
    },
    onError: (error: any) => {
      console.error('Vendor registration error:', error.response?.data?.error || error.message);
    },
  });
};