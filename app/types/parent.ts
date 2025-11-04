
export interface StudentAttendance {
  id: string;
  studentId: string;
  inTime: string;
  outTime?: string | null;
  remarks?: string | null;
  createdAt: string;
}

export interface MealAttendance {
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
  date: string;
  present: boolean;
}

export interface CheckupReport {
  date: string;
  report: string;
  prescription: string;
  notes: string;
  vendor: {
    name: string;
    category: string;
  };
}

export interface studentInformation {

  id: string,
  firstName: string,
  lastName: string,
  rollNumber: string,
  email: string,
  mobileNumber: string
}




export interface ParentAttendanceResponse {
  studentInfo: studentInformation
  attendance: StudentAttendance[];
  mealAttendance: MealAttendance[];
  checkupReports: CheckupReport[];
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}
