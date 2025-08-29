import api from './api';
import { API_ROUTES } from '../constants/api';
import { StudentRegistrationCredentials, StudentRegistrationResponse } from '../types/registerStudent';

export const registerStudent = async (
  credentials: StudentRegistrationCredentials,
  files: {
    passportPhoto: File;
    aadharMasked: File;
    formFileUrls?: File;
  }
): Promise<StudentRegistrationResponse> => {
  const formData = new FormData();
  Object.entries(credentials).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  formData.append('passportPhoto', files.passportPhoto);
  formData.append('aadharMasked', files.aadharMasked);
  if (files.formFileUrls) {
    formData.append('formFileUrls', files.formFileUrls);
  }

  const response = await api.post<StudentRegistrationResponse>(
    API_ROUTES.STUDENT.REGISTER,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};