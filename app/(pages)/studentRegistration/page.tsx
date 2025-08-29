'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRegisterStudent } from '../../hooks/useRegisterStudent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentRegistration() {
  const [studentFormOpen, setStudentFormOpen] = useState(true);
  const [parentFormOpen, setParentFormOpen] = useState(false);
  const [medicalFormOpen, setMedicalFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    instituteName: '',
    courseName: '',
    rollNumber: '',
    permanentAddress: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    emergencyContactRelation: '',
    roomNumber: '',
    password: '',
    languagesKnown: [] as string[],
    parent1Name: '',
    parent1Address: '',
    parent1Mobile: '',
    parent1WhatsappOrAlt: '',
    parent1Email: '',
    parent1Password: '',
    parent2Name: '',
    parent2Address: '',
    parent2Mobile: '',
    parent2WhatsappOrAlt: '',
    parent2Email: '',
    localGuardian1Name: '',
    localGuardian1Address: '',
    localGuardian1Mobile: '',
    localGuardian1WhatsappOrAlt: '',
    localGuardian1Email: '',
    localGuardian2Name: '',
    localGuardian2Address: '',
    localGuardian2Mobile: '',
    localGuardian2WhatsappOrAlt: '',
    localGuardian2Email: '',
    additionalInfo: '',
    physicalDisabilityStatus: false,
    bloodGroup: '',
    identificationMarks: '',
    allergicTo: '',
    knownDiseases: '',
    currentMedications: '',
    foodPreference: '',
    foodRestrictions: '',
    specialDietaryRequirements: '',
  });
  const [files, setFiles] = useState<{
    passportPhoto: File | null;
    aadharMasked: File | null;
    formFileUrls: File | null;
  }>({
    passportPhoto: null,
    aadharMasked: null,
    formFileUrls: null,
  });
  const { mutate: register, isPending, error } = useRegisterStudent();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles && inputFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: inputFiles[0] }));
    }
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, languagesKnown: options }));
  };

  const handlePhysicalDisabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, physicalDisabilityStatus: e.target.value === 'yes' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'gender',
      'dateOfBirth',
      'instituteName',
      'courseName',
      'rollNumber',
      'permanentAddress',
      'mobileNumber',
      'email',
      'emergencyContactName',
      'emergencyContactNumber',
      'emergencyContactRelation',
      'parent1Name',
      'parent1Address',
      'parent1Mobile',
    ];
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    if (!files.passportPhoto || !files.aadharMasked) {
      alert('Passport photo and Aadhar image are required');
      return;
    }
    register({ credentials: formData, files });
  };

  const inputClass =
    'w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hostel-secondary';

  return (
    <div className="min-h-screen bg-hostel-warmBg py-10">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error.response?.data?.error || 'An error occurred during registration'}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Student Registration */}
          <Card>
            <CardHeader
              className="bg-gradient-to-r from-hostel-gold to-hostel-secondary text-white cursor-pointer rounded-t-xl"
              onClick={() => setStudentFormOpen(!studentFormOpen)}
            >
              <CardTitle className="flex items-center justify-between">
                Student Registration
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${studentFormOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
            </CardHeader>
            {studentFormOpen && (
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      className={inputClass}
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="middleName" className="text-sm font-medium">
                      Middle Name
                    </label>
                    <input
                      id="middleName"
                      name="middleName"
                      className={inputClass}
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      className={inputClass}
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="gender" className="text-sm font-medium">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className={inputClass}
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={isPending}
                    >
                      <option value="" disabled>
                        -- Select gender --
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                       <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={inputClass}
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="dateOfBirth" className="text-sm font-medium">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      className={inputClass}
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
             
                  <div className="space-y-1">
                    <label htmlFor="passportPhoto" className="text-sm font-medium">
                      Passport Photo (JPEG/PNG, max 200KB) *
                    </label>
                    <input
                      id="passportPhoto"
                      name="passportPhoto"
                      type="file"
                      accept="image/jpeg,image/png"
                      className={inputClass}
                      onChange={handleFileChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="aadharMasked" className="text-sm font-medium">
                      Aadhar (Masked, JPEG/PNG, max 200KB) *
                    </label>
                    <input
                      id="aadharMasked"
                      name="aadharMasked"
                      type="file"
                      accept="image/jpeg,image/png"
                      className={inputClass}
                      onChange={handleFileChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="formFileUrls" className="text-sm font-medium">
                      Form File (PDF, max 2MB)
                    </label>
                    <input
                      id="formFileUrls"
                      name="formFileUrls"
                      type="file"
                      accept="application/pdf"
                      className={inputClass}
                      onChange={handleFileChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="instituteName" className="text-sm font-medium">
                      Institute Name *
                    </label>
                    <input
                      id="instituteName"
                      name="instituteName"
                      className={inputClass}
                      placeholder="Enter institute name"
                      value={formData.instituteName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="courseName" className="text-sm font-medium">
                      Course Name *
                    </label>
                    <input
                      id="courseName"
                      name="courseName"
                      className={inputClass}
                      placeholder="Enter course name"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="rollNumber" className="text-sm font-medium">
                      Roll Number *
                    </label>
                    <input
                      id="rollNumber"
                      name="rollNumber"
                      className={inputClass}
                      placeholder="Enter roll number"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="mobileNumber" className="text-sm font-medium">
                      Mobile Number *
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      className={inputClass}
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="whatsappNumber" className="text-sm font-medium">
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      className={inputClass}
                      placeholder="Enter WhatsApp number"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="permanentAddress" className="text-sm font-medium">
                      Permanent Address *
                    </label>
                    <textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      className={inputClass}
                      placeholder="Enter permanent address"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="emergencyContactName" className="text-sm font-medium">
                      Emergency Contact Name *
                    </label>
                    <input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      className={inputClass}
                      placeholder="Enter contact name"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="emergencyContactNumber" className="text-sm font-medium">
                      Emergency Contact Number *
                    </label>
                    <input
                      id="emergencyContactNumber"
                      name="emergencyContactNumber"
                      className={inputClass}
                      placeholder="Enter contact number"
                      value={formData.emergencyContactNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="emergencyContactRelation" className="text-sm font-medium">
                      Relation *
                    </label>
                    <input
                      id="emergencyContactRelation"
                      name="emergencyContactRelation"
                      className={inputClass}
                      placeholder="Enter relation"
                      value={formData.emergencyContactRelation}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="roomNumber" className="text-sm font-medium">
                      Room Number
                    </label>
                    <input
                      id="roomNumber"
                      name="roomNumber"
                      className={inputClass}
                      placeholder="Enter room number"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={inputClass}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                <div className="space-y-1">
                    <label htmlFor="languagesKnown" className="text-sm font-medium">
                      Languages Known
                    </label>
                    <select
                      id="languagesKnown"
                      name="languagesKnown"
                      multiple
                      className={inputClass}
                      value={formData.languagesKnown}
                      onChange={handleLanguagesChange}
                      disabled={isPending}
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="marathi">Marathi</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Parent & Guardian Registration */}
          <Card>
            <CardHeader
              className="bg-gradient-to-r from-hostel-gold to-hostel-secondary text-white cursor-pointer rounded-t-xl"
              onClick={() => setParentFormOpen(!parentFormOpen)}
            >
              <CardTitle className="flex items-center justify-between">
                Parent & Guardian Registration
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${parentFormOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
            </CardHeader>
            {parentFormOpen && (
              <CardContent className="p-6">
                <p className="text-gray-500">Parent 1 *</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="parent1Name" className="text-sm font-medium">
                      Parent Name *
                    </label>
                    <input
                      id="parent1Name"
                      name="parent1Name"
                      className={inputClass}
                      placeholder="Enter Parent Name"
                      value={formData.parent1Name}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent1Address" className="text-sm font-medium">
                      Parent Address *
                    </label>
                    <input
                      id="parent1Address"
                      name="parent1Address"
                      className={inputClass}
                      placeholder="Enter Parent Address"
                      value={formData.parent1Address}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent1Mobile" className="text-sm font-medium">
                      Parent Mobile *
                    </label>
                    <input
                      id="parent1Mobile"
                      name="parent1Mobile"
                      className={inputClass}
                      placeholder="Enter Parent Mobile"
                      value={formData.parent1Mobile}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent1WhatsappOrAlt" className="text-sm font-medium">
                      Parent WhatsApp/Alt
                    </label>
                    <input
                      id="parent1WhatsappOrAlt"
                      name="parent1WhatsappOrAlt"
                      className={inputClass}
                      placeholder="Enter WhatsApp/Alt"
                      value={formData.parent1WhatsappOrAlt}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent1Email" className="text-sm font-medium">
                      Parent Email
                    </label>
                    <input
                      id="parent1Email"
                      name="parent1Email"
                      type="email"
                      className={inputClass}
                      placeholder="Enter Parent Email"
                      value={formData.parent1Email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent1Password" className="text-sm font-medium">
                      Parent Password
                    </label>
                    <input
                      id="parent1Password"
                      name="parent1Password"
                      type="password"
                      className={inputClass}
                      placeholder="Enter Password"
                      value={formData.parent1Password}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                </div>
                <p className="text-gray-500 mt-4">Parent 2 (optional)</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="parent2Name" className="text-sm font-medium">
                      Parent 2 Name
                    </label>
                    <input
                      id="parent2Name"
                      name="parent2Name"
                      className={inputClass}
                      placeholder="Enter Parent 2 Name"
                      value={formData.parent2Name}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent2Address" className="text-sm font-medium">
                      Parent 2 Address
                    </label>
                    <input
                      id="parent2Address"
                      name="parent2Address"
                      className={inputClass}
                      placeholder="Enter Parent 2 Address"
                      value={formData.parent2Address}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent2Mobile" className="text-sm font-medium">
                      Parent 2 Mobile
                    </label>
                    <input
                      id="parent2Mobile"
                      name="parent2Mobile"
                      className={inputClass}
                      placeholder="Enter Parent 2 Mobile"
                      value={formData.parent2Mobile}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent2WhatsappOrAlt" className="text-sm font-medium">
                      Parent 2 WhatsApp/Alt
                    </label>
                    <input
                      id="parent2WhatsappOrAlt"
                      name="parent2WhatsappOrAlt"
                      className={inputClass}
                      placeholder="Enter WhatsApp/Alt"
                      value={formData.parent2WhatsappOrAlt}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="parent2Email" className="text-sm font-medium">
                      Parent 2 Email
                    </label>
                    <input
                      id="parent2Email"
                      name="parent2Email"
                      type="email"
                      className={inputClass}
                      placeholder="Enter Parent 2 Email"
                      value={formData.parent2Email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                </div>
                <p className="text-gray-500 mt-4">Local Guardian 1 (optional)</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="localGuardian1Name" className="text-sm font-medium">
                      Local Guardian 1 Name
                    </label>
                    <input
                      id="localGuardian1Name"
                      name="localGuardian1Name"
                      className={inputClass}
                      placeholder="Enter Guardian 1 Name"
                      value={formData.localGuardian1Name}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian1Address" className="text-sm font-medium">
                      Local Guardian 1 Address
                    </label>
                    <input
                      id="localGuardian1Address"
                      name="localGuardian1Address"
                      className={inputClass}
                      placeholder="Enter Guardian 1 Address"
                      value={formData.localGuardian1Address}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian1Mobile" className="text-sm font-medium">
                      Local Guardian 1 Mobile
                    </label>
                    <input
                      id="localGuardian1Mobile"
                      name="localGuardian1Mobile"
                      className={inputClass}
                      placeholder="Enter Guardian 1 Mobile"
                      value={formData.localGuardian1Mobile}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian1WhatsappOrAlt" className="text-sm font-medium">
                      Guardian 1 WhatsApp/Alt
                    </label>
                    <input
                      id="localGuardian1WhatsappOrAlt"
                      name="localGuardian1WhatsappOrAlt"
                      className={inputClass}
                      placeholder="Enter WhatsApp/Alt"
                      value={formData.localGuardian1WhatsappOrAlt}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian1Email" className="text-sm font-medium">
                      Guardian 1 Email
                    </label>
                    <input
                      id="localGuardian1Email"
                      name="localGuardian1Email"
                      type="email"
                      className={inputClass}
                      placeholder="Enter Email"
                      value={formData.localGuardian1Email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                </div>
                <p className="text-gray-500 mt-4">Local Guardian 2 (optional)</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="localGuardian2Name" className="text-sm font-medium">
                      Local Guardian 2 Name
                    </label>
                    <input
                      id="localGuardian2Name"
                      name="localGuardian2Name"
                      className={inputClass}
                      placeholder="Enter Guardian 2 Name"
                      value={formData.localGuardian2Name}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian2Address" className="text-sm font-medium">
                      Local Guardian 2 Address
                    </label>
                    <input
                      id="localGuardian2Address"
                      name="localGuardian2Address"
                      className={inputClass}
                      placeholder="Enter Guardian 2 Address"
                      value={formData.localGuardian2Address}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian2Mobile" className="text-sm font-medium">
                      Local Guardian 2 Mobile
                    </label>
                    <input
                      id="localGuardian2Mobile"
                      name="localGuardian2Mobile"
                      className={inputClass}
                      placeholder="Enter Guardian 2 Mobile"
                      value={formData.localGuardian2Mobile}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian2WhatsappOrAlt" className="text-sm font-medium">
                      Guardian 2 WhatsApp/Alt
                    </label>
                    <input
                      id="localGuardian2WhatsappOrAlt"
                      name="localGuardian2WhatsappOrAlt"
                      className={inputClass}
                      placeholder="Enter WhatsApp/Alt"
                      value={formData.localGuardian2WhatsappOrAlt}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="localGuardian2Email" className="text-sm font-medium">
                      Guardian 2 Email
                    </label>
                    <input
                      id="localGuardian2Email"
                      name="localGuardian2Email"
                      type="email"
                      className={inputClass}
                      placeholder="Enter Email"
                      value={formData.localGuardian2Email}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="additionalInfo" className="text-sm font-medium">
                      Additional Info
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      className={inputClass}
                      placeholder="Enter additional info"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Medical History */}
          <Card>
            <CardHeader
              className="bg-gradient-to-r from-hostel-gold to-hostel-secondary text-white cursor-pointer rounded-t-xl"
              onClick={() => setMedicalFormOpen(!medicalFormOpen)}
            >
              <CardTitle className="flex items-center justify-between">
                Medical History
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${medicalFormOpen ? 'rotate-180' : ''}`}
                />
              </CardTitle>
            </CardHeader>
            {medicalFormOpen && (
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Physical Disability Status</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="physicalDisabilityStatus"
                          value="yes"
                          checked={formData.physicalDisabilityStatus === true}
                          onChange={handlePhysicalDisabilityChange}
                          disabled={isPending}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="physicalDisabilityStatus"
                          value="no"
                          checked={formData.physicalDisabilityStatus === false}
                          onChange={handlePhysicalDisabilityChange}
                          disabled={isPending}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="bloodGroup" className="text-sm font-medium">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      className={inputClass}
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      disabled={isPending}
                    >
                      <option value="" disabled>
                        -- Select blood group --
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="identificationMarks" className="text-sm font-medium">
                      Identification Marks
                    </label>
                    <textarea
                      id="identificationMarks"
                      name="identificationMarks"
                      className={inputClass}
                      placeholder="Enter identification marks"
                      value={formData.identificationMarks}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="allergicTo" className="text-sm font-medium">
                      Allergic To
                    </label>
                    <textarea
                      id="allergicTo"
                      name="allergicTo"
                      className={inputClass}
                      placeholder="Enter known allergies"
                      value={formData.allergicTo}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="knownDiseases" className="text-sm font-medium">
                      Known Diseases
                    </label>
                    <textarea
                      id="knownDiseases"
                      name="knownDiseases"
                      className={inputClass}
                      placeholder="Enter known diseases"
                      value={formData.knownDiseases}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="currentMedications" className="text-sm font-medium">
                      Current Medications
                    </label>
                    <textarea
                      id="currentMedications"
                      name="currentMedications"
                      className={inputClass}
                      placeholder="Enter current medications"
                      value={formData.currentMedications}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="foodPreference" className="text-sm font-medium">
                      Food Preferences
                    </label>
                    <textarea
                      id="foodPreference"
                      name="foodPreference"
                      className={inputClass}
                      placeholder="Enter food preferences"
                      value={formData.foodPreference}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="foodRestrictions" className="text-sm font-medium">
                      Food Restrictions
                    </label>
                    <textarea
                      id="foodRestrictions"
                      name="foodRestrictions"
                      className={inputClass}
                      placeholder="Enter restrictions"
                      value={formData.foodRestrictions}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label htmlFor="specialDietaryRequirements" className="text-sm font-medium">
                      Special Dietary Requirements
                    </label>
                    <textarea
                      id="specialDietaryRequirements"
                      name="specialDietaryRequirements"
                      className={inputClass}
                      placeholder="Enter dietary requirements"
                      value={formData.specialDietaryRequirements}
                      onChange={handleInputChange}
                      disabled={isPending}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Submit */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isPending}
              className="bg-hostel-secondary text-white px-8 py-3 rounded-lg shadow hover:bg-hostel-secondary/90 disabled:opacity-50"
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </button>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-hostel-secondary hover:text-hostel-secondary/80 text-sm font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}