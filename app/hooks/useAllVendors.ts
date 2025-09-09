import { useQuery } from '@tanstack/react-query';
import { getAllVendors } from '../services/getAllvendorsService';
import { AllVendorsQueryParams, AllVendorsResponse } from '../types/allVendors';

export const useVendors = (params: AllVendorsQueryParams = { status: 'PENDING', page: 1 }) => {
  return useQuery<AllVendorsResponse, Error>({
    queryKey: ['vendors', params],
    queryFn: () => getAllVendors(params),
    //keepPreviousData: true,
  });
};