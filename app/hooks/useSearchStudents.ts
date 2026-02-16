// src/hooks/useSearchStudents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchStudents, getMedicalHistory, addCheckupReport } from '../services/doctorService';

export const useSearchStudents = (query: string) => {
  return useQuery({
    queryKey: ['students-search', query],
    queryFn: () => searchStudents(query),
    enabled: query.length >= 2,
  });
};

// src/hooks/useMedicalHistory.ts
export const useMedicalHistory = (studentId: string) => {
  return useQuery({
    queryKey: ['medical-history', studentId],
    queryFn: () => getMedicalHistory(studentId),
    enabled: !!studentId,
  });
};

// src/hooks/useAddCheckup.ts
export const useAddCheckup = () => {
  const qc = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ studentId, data }: { studentId: string; data: any }) =>
      addCheckupReport(studentId, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['medical-history', variables.studentId] });
    },
  });
};