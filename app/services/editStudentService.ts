import api from './api';
import { API_ROUTES } from '../constants/api';
import { EditStudentResponse, EditStudentRequest } from '../types/editStudent';

export const editStudent = async (
  id: string,
  data: EditStudentRequest,
  files: { passportPhoto?: File; aadharMasked?: File; formFileUrls?: File }
): Promise<EditStudentResponse> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  if (files.passportPhoto) formData.append('passportPhoto', files.passportPhoto);
  if (files.aadharMasked) formData.append('aadharMasked', files.aadharMasked);
  if (files.formFileUrls) formData.append('formFileUrls', files.formFileUrls);
  const response = await api.put<EditStudentResponse>(API_ROUTES.STUDENT.EDIT.replace(':id', id), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};