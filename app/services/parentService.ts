
import api from './api';
import { API_ROUTES } from '../constants/api';
import { ParentAttendanceResponse } from '../types/parent';

export const getStudentAttendance = async (): Promise<ParentAttendanceResponse> => {
  const response = await api.get<ParentAttendanceResponse>(API_ROUTES.PARENT.GET_ATTENDANCE);
  return response.data;
};
