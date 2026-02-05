
import { AllStudentsQueryParams, AllStudentsResponse } from "../types/allStudents";
import api from './api';
import { API_ROUTES } from '../constants/api';


export const getAllStudents = async (params: AllStudentsQueryParams = {}): Promise<AllStudentsResponse> => {
  const { status, search, page, yearOfAdmission } = params;
  const response = await api.get<AllStudentsResponse>(API_ROUTES.STUDENT.ALL, {
    params: { status, search, page, yearOfAdmission }
  });
  return response.data;
};