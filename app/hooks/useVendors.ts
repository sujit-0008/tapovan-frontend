
import { useQuery } from '@tanstack/react-query';
import { getVendors } from '../services/staffService';
import { GetVendorsResponse } from '../types/staff';

export const useVendors = () => {
  return useQuery<GetVendorsResponse, Error>({
    queryKey: ['vendors'],
    queryFn: getVendors,
  });
};
