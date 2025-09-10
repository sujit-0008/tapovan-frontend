import { Student } from './student';


export interface StudentListItem {
  id: string;
  name: string;
  email: string;
    status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  photo: string | null;
}
export interface AllStudentsResponse {
 students: StudentListItem[];
  total: number;
  page: number;
  pages: number;
}

export interface AllStudentsQueryParams {
  status?: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  search?: string;
  page?: number;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}