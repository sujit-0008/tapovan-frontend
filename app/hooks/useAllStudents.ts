import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../services/getAllStudentsService';
import { AllStudentsQueryParams } from '../types/allStudents';

export const useStudents = (params: AllStudentsQueryParams = { status: 'PENDING', page: 1 }) => {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => getAllStudents(params),
    placeholderData: (previousData) => previousData,
  });
};