import { useQuery } from '@tanstack/react-query';
import { getStudentDetails } from '../services/studentDetailsService';
import { StudentDetailsResponse } from '../types/student';

export const useStudentDetails = (id: string) => {
  return useQuery<StudentDetailsResponse, Error>({
    queryKey: ['student', id],
    queryFn: () => getStudentDetails(id),
  });
};