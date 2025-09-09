import api from './api';
import { API_ROUTES } from '../constants/api';
//import { StudentRegistrationCredentials, StudentRegistrationResponse } from '../types/registerStudent';
import { StudentDetailsResponse, ApproveStudentRequest, ApproveStudentResponse } from '../types/student';

// export const registerStudent = async (
//   credentials: StudentRegistrationCredentials,
//   files: { passportPhoto: File; aadharMasked: File; formFileUrls?: File }
// ): Promise<StudentRegistrationResponse> => {
//   const formData = new FormData();
//   Object.entries(credentials).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       formData.append(key, JSON.stringify(value));
//     } else if (value !== undefined && value !== null) {
//       formData.append(key, value.toString());
//     }
//   });
//   formData.append('passportPhoto', files.passportPhoto);
//   formData.append('aadharMasked', files.aadharMasked);
//   if (files.formFileUrls) {
//     formData.append('formFileUrls', files.formFileUrls);
//   }
//   const response = await api.post<StudentRegistrationResponse>(API_ROUTES.STUDENT.REGISTER, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return response.data;
// };

export const getStudentDetails = async (id: string): Promise<StudentDetailsResponse> => {
  const response = await api.get<StudentDetailsResponse>(API_ROUTES.STUDENT.DETAILS.replace(':id', id));
  return response.data;
};

export const approveStudent = async (id: string, data: ApproveStudentRequest): Promise<ApproveStudentResponse> => {
  const response = await api.post<ApproveStudentResponse>(API_ROUTES.STUDENT.APPROVE.replace(':id', id), data);
  return response.data;
};