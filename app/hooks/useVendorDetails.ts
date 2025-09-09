import { useQuery } from '@tanstack/react-query';
import { getVendorDetails } from '../services/vendorDetailsService';
import { VendorDetailsResponse } from '../types/vendor';

export const useVendorDetails = (id: string) => {
  return useQuery<VendorDetailsResponse, Error>({
    queryKey: ['vendor', id],
    queryFn: () => getVendorDetails(id),
  });
};