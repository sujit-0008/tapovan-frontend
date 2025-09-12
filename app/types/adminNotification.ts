
import { Student } from './registerStudent';
import { Vendor } from './registerVendor';

export interface Notification {
  id: string;
  action: 'STUDENT_REGISTRATION' | 'VENDOR_REGISTRATION';
  resolved: boolean;
  details: string;
  timestamp: string;
  studentId?: string;
  vendorId?: string;
  adminId?: string;
  student?: Student;
  vendor?: Vendor;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface NotificationsQueryParams {
  status?: 'PENDING' | 'RESOLVED';
  search?: string;
}