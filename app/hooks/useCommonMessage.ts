import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCommonMessage,
  deleteCommonMessage,
  getActiveCommonMessage,
  listCommonMessages,
  updateCommonMessage,
} from '../services/commonMessageService';
import {
  ActiveCommonMessageResponse,
  CreateCommonMessageRequest,
  CreateCommonMessageResponse,
  DeleteCommonMessageResponse,
  ListCommonMessagesResponse,
  UpdateCommonMessageRequest,
  UpdateCommonMessageResponse,
} from '../types/commonMessage';

export const useActiveCommonMessage = () =>
  useQuery<ActiveCommonMessageResponse>({ queryKey: ['commonMessage', 'active'], queryFn: getActiveCommonMessage });

export const useListCommonMessages = () =>
  useQuery<ListCommonMessagesResponse>({ queryKey: ['commonMessage', 'list'], queryFn: listCommonMessages });

export const useCreateCommonMessage = () => {
  const qc = useQueryClient();
  return useMutation<CreateCommonMessageResponse, Error, CreateCommonMessageRequest>({
    mutationFn: createCommonMessage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['commonMessage'] });
    },
  });
};

export const useUpdateCommonMessage = () => {
  const qc = useQueryClient();
  return useMutation<UpdateCommonMessageResponse, Error, { id: number; payload: UpdateCommonMessageRequest }>({
    mutationFn: ({ id, payload }) => updateCommonMessage(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['commonMessage'] });
    },
  });
};

export const useDeleteCommonMessage = () => {
  const qc = useQueryClient();
  return useMutation<DeleteCommonMessageResponse, Error, { id: number }>({
    mutationFn: ({ id }) => deleteCommonMessage(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['commonMessage'] });
    },
  });
};
