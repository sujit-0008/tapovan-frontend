import { useMutation } from '@tanstack/react-query';
import { registerStudent } from '../services/registerStudentService';
import { StudentRegistrationCredentials, StudentRegistrationResponse } from '../types/registerStudent';
import { useRouter } from 'next/navigation';

export const useRegisterStudent = () => {
  const router = useRouter();

  return useMutation<
    StudentRegistrationResponse,
    Error,
    { credentials: StudentRegistrationCredentials; files: { passportPhoto: File; aadharMasked: File; formFileUrls?: File } }
  >({
    mutationFn: ({ credentials, files }) => registerStudent(credentials, files),
    onSuccess: () => {
      router.push('/login?registrationSuccess=true');
    },
    onError: (error: Error & { response?: { data?: { error?: string } } }) => {
      console.error('Registration error:', error.response?.data?.error || error.message);
    },
  });
};