export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  gender: string;
  dateOfBirth: string;
  passportPhoto: string;
  aadharMasked: string;
  instituteName: string;
  courseName: string;
  rollNumber: string;
  permanentAddress: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
  roomNumber: string;
  password: string;
  languagesKnown: string[];
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED';
  formFileUrls?: string | null;
  rejectionReason?: string | null;
  parentInfoId?: string;
  createdAt: string;
  updatedAt: string;
  createdById?: string | null;
  parentInfo?: ParentInfo;
  medicalHistory?: MedicalHistory;
}

export interface ParentInfo {
  id: string;
  studentId?: string | null;
  parent1Name: string;
  parent1Address: string;
  parent1Mobile: string;
  parent1WhatsappOrAlt?: string | null;
  parent1Email: string;
  parent1Password?: string | null;
  parent2Name?: string | null;
  parent2Address?: string | null;
  parent2Mobile?: string | null;
  parent2WhatsappOrAlt?: string | null;
  parent2Email?: string | null;
  parent2Password?: string | null;
  localGuardian1Name?: string | null;
  localGuardian1Address?: string | null;
  localGuardian1Mobile?: string | null;
  localGuardian1WhatsappOrAlt?: string | null;
  localGuardian1Email?: string | null;
  localGuardian2Name?: string | null;
  localGuardian2Address?: string | null;
  localGuardian2Mobile?: string | null;
  localGuardian2WhatsappOrAlt?: string | null;
  localGuardian2Email?: string | null;
  additionalInfo?: string | null;
  createdAt: string;
  updatedAt: string;
  createdById?: string | null;
}

export interface MedicalHistory {
  id: string;
  studentId: string;
  physicalDisabilityStatus: boolean;
  bloodGroup: string;
  identificationMarks: string;
  allergicTo: string;
  knownDiseases: string;
  currentMedications: string;
  foodPreference: string;
  foodRestrictions: string;
  specialDietaryRequirements: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentDetailsResponse {
  student: Student;
}

export interface ApproveStudentRequest {
  status: 'APPROVED' | 'SUSPENDED';
  rejectionReason?: string;
}

export interface ApproveStudentResponse {
  message: string;
  student: Student;
}

export interface ErrorResponse {
  errors?: string[];
  message?: string;
}