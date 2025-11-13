import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vacateStudentFromRoom } from '../services/roomService';
import { VacateStudentFromRoomResponse } from '../types/room';

export const useVacateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation<VacateStudentFromRoomResponse, Error, number>({
    mutationFn: (assignmentId) => vacateStudentFromRoom(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['availableRooms'] });
    },
  });
};
