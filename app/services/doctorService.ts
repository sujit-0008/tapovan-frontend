import api from './api';
import { API_ROUTES } from '../constants/api';
import { Student, MedicalHistory } from '../types/doctor';

export const searchStudents = async (query: string): Promise<{ students: Student[] }> => {
  const response = await api.get(API_ROUTES.DOCTOR.SEARCH_STUDENTS, { params: { name: query } });
  return response.data;
};

export const getMedicalHistory = async (studentId: string): Promise<{ history: MedicalHistory }> => {
  const response = await api.get(
    API_ROUTES.DOCTOR.MEDICAL_HISTORY.replace(':studentId', studentId)
  );
  return response.data;
};

export const addCheckupReport = async (
  studentId: string,
  data: { report: string; prescription: string; notes?: string }
) => {
  const response = await api.post(
    API_ROUTES.DOCTOR.ADD_CHECKUP.replace(':studentId', studentId),
    data
  );
  return response.data;
};