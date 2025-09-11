
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editStudent } from '../services/editStudentService';
import { EditStudentRequest, EditStudentResponse } from '../types/editStudent';

export const useEditStudent = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    EditStudentResponse,
    Error,
    { data: EditStudentRequest; files: { passportPhoto?: File; aadharMasked?: File; formFileUrls?: File } }
  >({
    mutationFn: ({ data, files }) => editStudent(studentId, data, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error) => {
      console.error('Edit student error:', error.message);
    },
  });
};
