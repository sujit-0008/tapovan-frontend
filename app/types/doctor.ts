export interface Student {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  rollNumber: string;
  roomNumber: string;
  email: string;
  mobileNumber: string;
}

export interface CheckupReport {
  id: number;
  date: string;
  report: string;
  prescription: string;
  notes?: string | null;
  vendor: {
    name: string;
  };
}

export interface MedicalHistory {
  id: string;
  studentId: string;
  physicalDisabilityStatus: boolean;
  bloodGroup?: string;
  identificationMarks?: string;
  allergicTo?: string;
  knownDiseases?: string;
  currentMedications?: string;
  foodPreference?: string;
  foodRestrictions?: string;
  specialDietaryRequirements?: string;
  checkupReports: CheckupReport[];
}