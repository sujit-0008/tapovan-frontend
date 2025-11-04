
import { useQuery } from '@tanstack/react-query';
import { getStudentAttendance } from '../services/parentService';
import { ParentAttendanceResponse } from '../types/parent';

export const useParentAttendance = () => {
  return useQuery<ParentAttendanceResponse, Error>({
    queryKey: ['parentAttendance'],
    queryFn: getStudentAttendance,
  });
};
