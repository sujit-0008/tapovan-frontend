import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../services/getAllStudentsService';
import { AllStudentsQueryParams, AllStudentsResponse } from '../types/allStudents';

export const useStudents = (params: AllStudentsQueryParams = { status: 'PENDING', page: 1 }) => {
  return useQuery<AllStudentsResponse, Error>({
    queryKey: ['students', params],
    queryFn: () => getAllStudents(params),
    keepPreviousData: true,
  });
};