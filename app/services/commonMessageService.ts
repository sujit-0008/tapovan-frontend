import api from './api';
import { API_ROUTES } from '../constants/api';
import {
  ActiveCommonMessageResponse,
  CreateCommonMessageRequest,
  CreateCommonMessageResponse,
  DeleteCommonMessageResponse,
  ListCommonMessagesResponse,
  UpdateCommonMessageRequest,
  UpdateCommonMessageResponse,
} from '../types/commonMessage';

export const getActiveCommonMessage = async (): Promise<ActiveCommonMessageResponse> => {
  const res = await api.get<ActiveCommonMessageResponse>(API_ROUTES.COMMON_MESSAGE.ACTIVE);
  return res.data;
};

export const listCommonMessages = async (): Promise<ListCommonMessagesResponse> => {
  const res = await api.get<ListCommonMessagesResponse>(API_ROUTES.COMMON_MESSAGE.LIST);
  return res.data;
};

export const createCommonMessage = async (
  payload: CreateCommonMessageRequest
): Promise<CreateCommonMessageResponse> => {
  const res = await api.post<CreateCommonMessageResponse>(API_ROUTES.COMMON_MESSAGE.CREATE, payload);
  return res.data;
};

export const updateCommonMessage = async (
  id: number,
  payload: UpdateCommonMessageRequest
): Promise<UpdateCommonMessageResponse> => {
  const res = await api.put<UpdateCommonMessageResponse>(
    API_ROUTES.COMMON_MESSAGE.UPDATE.replace(':id', id.toString()),
    payload
  );
  return res.data;
};

export const deleteCommonMessage = async (id: number): Promise<DeleteCommonMessageResponse> => {
  const res = await api.delete<DeleteCommonMessageResponse>(
    API_ROUTES.COMMON_MESSAGE.DELETE.replace(':id', id.toString())
  );
  return res.data;
};
