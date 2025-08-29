export interface StudentRegistrationCredentials {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
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
  roomNumber?: string;
  password?: string;
  languagesKnown?: string[];
  parent1Name: string;
  parent1Address: string;
  parent1Mobile: string;
  parent1WhatsappOrAlt?: string;
  parent1Email?: string;
  parent1Password?: string;
  parent2Name?: string;
  parent2Address?: string;
  parent2Mobile?: string;
  parent2WhatsappOrAlt?: string;
  parent2Email?: string;
  localGuardian1Name?: string;
  localGuardian1Address?: string;
  localGuardian1Mobile?: string;
  localGuardian1WhatsappOrAlt?: string;
  localGuardian1Email?: string;
  localGuardian2Name?: string;
  localGuardian2Address?: string;
  localGuardian2Mobile?: string;
  localGuardian2WhatsappOrAlt?: string;
  localGuardian2Email?: string;
  additionalInfo?: string;
  physicalDisabilityStatus?: boolean;
  bloodGroup?: string;
  identificationMarks?: string;
  allergicTo?: string;
  knownDiseases?: string;
  currentMedications?: string;
  foodPreference?: string;
  foodRestrictions?: string;
  specialDietaryRequirements?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export interface StudentRegistrationResponse {
  message: string;
  student: Student;
}

export interface ErrorResponse {
  errors: string[];
}