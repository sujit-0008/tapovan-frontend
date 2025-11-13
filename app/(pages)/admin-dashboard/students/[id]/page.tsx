
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { useApproveStudent } from '../../../../hooks/useApproveStudent';
import { Accordion } from '../../../../components/ui/accordion';
import { useStudentDetails } from '../../../../hooks/useStudentDetails';
import { useEditStudent } from '../../../../hooks/useEditStudent';
import{EditStudentRequest} from '../../../../types/editStudent';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import StudentRoomAssignmentModal from '../../../../components/StudentRoomAssignmentModal';

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useStudentDetails(id);
  const { mutate: editStudent, isPending: isEditing } = useEditStudent(id);
  const { mutate: approveStudent, isPending: isApproving } = useApproveStudent();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [isRoomAssignmentModalOpen, setIsRoomAssignmentModalOpen] = useState(false);
  const handleApprove = () => {
    approveStudent({ id, data: { status: 'APPROVED' } })
  };
  const handleSuspend = () => {
    if (!rejectionReason.trim()) {
      alert('Rejection reason is  for suspension');
      return;
    }
    approveStudent({ id, data: { status: 'SUSPENDED', rejectionReason } });
  };


  const [isEditingMode, setIsEditingMode] = useState(false);
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
    parent2Password: '',
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
    passportPhoto?: File;
    aadharMasked?: File;
    formFileUrls?: File;
  }>({});

  // Pre-fill form on load
  useEffect(() => {
    if (data?.student) {
      const { student } = data;
      setFormData({
        firstName: student.firstName || '',
        middleName: student.middleName || '',
        lastName: student.lastName || '',
        gender: student.gender || '',
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
        instituteName: student.instituteName || '',
        courseName: student.courseName || '',
        rollNumber: student.rollNumber || '',
        permanentAddress: student.permanentAddress || '',
        mobileNumber: student.mobileNumber || '',
        whatsappNumber: student.whatsappNumber || '',
        email: student.email || '',
        emergencyContactName: student.emergencyContactName || '',
        emergencyContactNumber: student.emergencyContactNumber || '',
        emergencyContactRelation: student.emergencyContactRelation || '',
        roomNumber: student.roomNumber || '',
        password: '',
        languagesKnown: student.languagesKnown || [],
        parent1Name: student.parentInfo?.parent1Name || '',
        parent1Address: student.parentInfo?.parent1Address || '',
        parent1Mobile: student.parentInfo?.parent1Mobile || '',
        parent1WhatsappOrAlt: student.parentInfo?.parent1WhatsappOrAlt || '',
        parent1Email: student.parentInfo?.parent1Email || '',
        parent1Password: '',
        parent2Name: student.parentInfo?.parent2Name || '',
        parent2Address: student.parentInfo?.parent2Address || '',
        parent2Mobile: student.parentInfo?.parent2Mobile || '',
        parent2WhatsappOrAlt: student.parentInfo?.parent2WhatsappOrAlt || '',
        parent2Email: student.parentInfo?.parent2Email || '',
        parent2Password: '',
        localGuardian1Name: student.parentInfo?.localGuardian1Name || '',
        localGuardian1Address: student.parentInfo?.localGuardian1Address || '',
        localGuardian1Mobile: student.parentInfo?.localGuardian1Mobile || '',
        localGuardian1WhatsappOrAlt: student.parentInfo?.localGuardian1WhatsappOrAlt || '',
        localGuardian1Email: student.parentInfo?.localGuardian1Email || '',
        localGuardian2Name: student.parentInfo?.localGuardian2Name || '',
        localGuardian2Address: student.parentInfo?.localGuardian2Address || '',
        localGuardian2Mobile: student.parentInfo?.localGuardian2Mobile || '',
        localGuardian2WhatsappOrAlt: student.parentInfo?.localGuardian2WhatsappOrAlt || '',
        localGuardian2Email: student.parentInfo?.localGuardian2Email || '',
        additionalInfo: student.parentInfo?.additionalInfo || '',
        physicalDisabilityStatus: student.medicalHistory?.physicalDisabilityStatus || false,
        bloodGroup: student.medicalHistory?.bloodGroup || '',
        identificationMarks: student.medicalHistory?.identificationMarks || '',
        allergicTo: student.medicalHistory?.allergicTo || '',
        knownDiseases: student.medicalHistory?.knownDiseases || '',
        currentMedications: student.medicalHistory?.currentMedications || '',
        foodPreference: student.medicalHistory?.foodPreference || '',
        foodRestrictions: student.medicalHistory?.foodRestrictions || '',
        specialDietaryRequirements: student.medicalHistory?.specialDietaryRequirements || '',
      });
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: EditStudentRequest = {
      ...formData,
      dateOfBirth: formData.dateOfBirth || undefined,
      password: formData.password || undefined,
      parent1Password: formData.parent1Password || undefined,
      parent2Password: formData.parent2Password || undefined,
    };
    editStudent({ data, files }, {
      onSuccess: () => {
        setIsEditingMode(false);
        setFiles({});
      },
    });
  };

  const handleFileChange = (key: 'passportPhoto' | 'aadharMasked' | 'formFileUrls') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (key === 'formFileUrls' && file.type !== 'application/pdf') {
        alert('Only PDF files are allowed for formFileUrls');
        return;
      }
      if (['passportPhoto', 'aadharMasked'].includes(key) && !file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        return;
      }
      if (file.size > (key === 'formFileUrls' ? 2 * 1024 * 1024 : 200 * 1024)) {
        alert(`File size must be less than ${key === 'formFileUrls' ? '2MB' : '200KB'}`);
        return;
      }
      setFiles((prev) => ({ ...prev, [key]: file }));
    }
  };

  if (isLoading) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Loading student details...</p>;
  if (error) return <p className="p-4 sm:p-6 text-red-500 text-sm">Error: {error.message || 'Failed to load student'}</p>;
  if (!data?.student) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Student not found</p>;

  const { student } = data;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {student.firstName} {student.lastName || ''} Details
        </h1>
        <div className="flex gap-4">
          <Link
            href={`/admin-dashboard/students/${id}/payment`}
            className="px-4 sm:px-6 py-2 rounded-xl border border-hostel-gold text-hostel-gold hover:bg-hostel-gold hover:text-white transition text-sm sm:text-base"
          >
            Manage Payment
          </Link>
          <button
            onClick={() => setIsEditingMode(!isEditingMode)}
            className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition text-sm sm:text-base"
          >
            {isEditingMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {isEditingMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Student Profile</CardTitle>
            <p className="text-gray-500 text-sm sm:text-base">
              Update student details. Changes will be set to PENDING for review.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Accordion title="Personal Information" defaultOpen>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
              
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                    <input
                      type="text"
                      value={formData.middleName}
                      onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    >
                      <option value="">Select</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                   
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
            
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Academic Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
            
                    <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                    <input
                      type="text"
                      value={formData.instituteName}
                      onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                    
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    
                    <label className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                      type="text"
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Roll Number *</label>
                    <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <input
                      type="text"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
              
                    <label className="block text-sm font-medium text-gray-700">Room Number</label>
                    <input
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Languages Known (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.languagesKnown.join(',')}
                      onChange={(e) => setFormData({ ...formData, languagesKnown: e.target.value.split(',').map(s => s.trim()) })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Emergency Contact">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
              
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                 
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
                    <input
                      type="tel"
                      value={formData.emergencyContactNumber}
                      onChange={(e) => setFormData({ ...formData, emergencyContactNumber: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
             
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact Relation</label>
                    <input
                      type="text"
                      value={formData.emergencyContactRelation}
                      onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                      
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Parent Information">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Parent 1</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.parent1Name}
                        onChange={(e) => setFormData({ ...formData, parent1Name: e.target.value })}
                        
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                   
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={formData.parent1Address}
                        onChange={(e) => setFormData({ ...formData, parent1Address: e.target.value })}
                        
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                   
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <input
                        type="tel"
                        value={formData.parent1Mobile}
                        onChange={(e) => setFormData({ ...formData, parent1Mobile: e.target.value })}
                        
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp/Alt</label>
                      <input
                        type="tel"
                        value={formData.parent1WhatsappOrAlt}
                        onChange={(e) => setFormData({ ...formData, parent1WhatsappOrAlt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.parent1Email}
                        onChange={(e) => setFormData({ ...formData, parent1Email: e.target.value })}
                        
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        value={formData.parent1Password}
                        onChange={(e) => setFormData({ ...formData, parent1Password: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700">Parent 2</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.parent2Name}
                        onChange={(e) => setFormData({ ...formData, parent2Name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={formData.parent2Address}
                        onChange={(e) => setFormData({ ...formData, parent2Address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <input
                        type="tel"
                        value={formData.parent2Mobile}
                        onChange={(e) => setFormData({ ...formData, parent2Mobile: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp/Alt</label>
                      <input
                        type="tel"
                        value={formData.parent2WhatsappOrAlt}
                        onChange={(e) => setFormData({ ...formData, parent2WhatsappOrAlt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.parent2Email}
                        onChange={(e) => setFormData({ ...formData, parent2Email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        value={formData.parent2Password}
                        onChange={(e) => setFormData({ ...formData, parent2Password: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700">Local Guardian 1</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.localGuardian1Name}
                        onChange={(e) => setFormData({ ...formData, localGuardian1Name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={formData.localGuardian1Address}
                        onChange={(e) => setFormData({ ...formData, localGuardian1Address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <input
                        type="tel"
                        value={formData.localGuardian1Mobile}
                        onChange={(e) => setFormData({ ...formData, localGuardian1Mobile: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp/Alt</label>
                      <input
                        type="tel"
                        value={formData.localGuardian1WhatsappOrAlt}
                        onChange={(e) => setFormData({ ...formData, localGuardian1WhatsappOrAlt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.localGuardian1Email}
                        onChange={(e) => setFormData({ ...formData, localGuardian1Email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700">Local Guardian 2</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={formData.localGuardian2Name}
                        onChange={(e) => setFormData({ ...formData, localGuardian2Name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={formData.localGuardian2Address}
                        onChange={(e) => setFormData({ ...formData, localGuardian2Address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mobile</label>
                      <input
                        type="tel"
                        value={formData.localGuardian2Mobile}
                        onChange={(e) => setFormData({ ...formData, localGuardian2Mobile: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">WhatsApp/Alt</label>
                      <input
                        type="tel"
                        value={formData.localGuardian2WhatsappOrAlt}
                        onChange={(e) => setFormData({ ...formData, localGuardian2WhatsappOrAlt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.localGuardian2Email}
                        onChange={(e) => setFormData({ ...formData, localGuardian2Email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                        disabled={isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Info</label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Medical History">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Physical Disability</label>
                    <input
                      type="checkbox"
                      checked={formData.physicalDisabilityStatus}
                      onChange={(e) => setFormData({ ...formData, physicalDisabilityStatus: e.target.checked })}
                      className="h-5 w-5 rounded text-hostel-gold focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <input
                      type="text"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Identification Marks</label>
                    <input
                      type="text"
                      value={formData.identificationMarks}
                      onChange={(e) => setFormData({ ...formData, identificationMarks: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Allergic To</label>
                    <input
                      type="text"
                      value={formData.allergicTo}
                      onChange={(e) => setFormData({ ...formData, allergicTo: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Known Diseases</label>
                    <input
                      type="text"
                      value={formData.knownDiseases}
                      onChange={(e) => setFormData({ ...formData, knownDiseases: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Medications</label>
                    <input
                      type="text"
                      value={formData.currentMedications}
                      onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Food Preference</label>
                    <input
                      type="text"
                      value={formData.foodPreference}
                      onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Food Restrictions</label>
                    <input
                      type="text"
                      value={formData.foodRestrictions}
                      onChange={(e) => setFormData({ ...formData, foodRestrictions: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Special Dietary Requirements</label>
                    <textarea
                      value={formData.specialDietaryRequirements}
                      onChange={(e) => setFormData({ ...formData, specialDietaryRequirements: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                      disabled={isEditing}
                    />
                  </div>
                </div>
              </Accordion>
              <Accordion title="Documents">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Passport Photo (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('passportPhoto')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {student.passportPhoto && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={student.passportPhoto} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhar Masked (max 200KB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange('aadharMasked')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {student.aadharMasked && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={student.aadharMasked} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Form File URLs (PDF, max 2MB)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange('formFileUrls')}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hostel-gold/10 file:text-hostel-gold hover:file:bg-hostel-gold/20"
                      disabled={isEditing}
                    />
                    {student.formFileUrls && (
                      <p className="text-sm text-gray-500 mt-1">Current: <a href={student.formFileUrls} target="_blank" className="text-hostel-gold">View</a></p>
                    )}
                  </div>
                </div>
              </Accordion>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingMode(false);
                    setFiles({});
                  }}
                  disabled={isEditing}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition disabled:opacity-50 text-sm sm:text-base"
                >
                  {isEditing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm text-gray-500">{student.firstName} {student.middleName} {student.lastName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Gender</p>
                  <p className="text-sm text-gray-500">{student.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Date of Birth</p>
                  <p className="text-sm text-gray-500">{new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Mobile Number</p>
                  <p className="text-sm text-gray-500">{student.mobileNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">WhatsApp Number</p>
                  <p className="text-sm text-gray-500">{student.whatsappNumber || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Academic Information</CardTitle>
                <button
                  onClick={() => setIsRoomAssignmentModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition text-sm"
                >
                  Assign Room
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Institute Name</p>
                  <p className="text-sm text-gray-500">{student.instituteName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Course Name</p>
                  <p className="text-sm text-gray-500">{student.courseName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Roll Number</p>
                  <p className="text-sm text-gray-500">{student.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Room Number</p>
                  <p className="text-sm text-gray-500">{student.roomNumber || 'Not Assigned'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Languages Known</p>
                  <p className="text-sm text-gray-500">{student.languagesKnown.join(', ') || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Name</p>
                  <p className="text-sm text-gray-500">{student.emergencyContactName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Number</p>
                  <p className="text-sm text-gray-500">{student.emergencyContactNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Relation</p>
                  <p className="text-sm text-gray-500">{student.emergencyContactRelation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Parent Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Parent 1</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent1Name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent1Address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mobile</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent1Mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">WhatsApp/Alt</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent1WhatsappOrAlt || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent1Email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Parent 2</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent2Name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent2Address || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mobile</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent2Mobile || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">WhatsApp/Alt</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent2WhatsappOrAlt || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.parent2Email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Local Guardian 1</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian1Name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian1Address || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mobile</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian1Mobile || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">WhatsApp/Alt</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian1WhatsappOrAlt || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian1Email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Local Guardian 2</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Name</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian2Name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian2Address || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Mobile</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian2Mobile || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">WhatsApp/Alt</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian2WhatsappOrAlt || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-500">{student.parentInfo?.localGuardian2Email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Additional Info</p>
                  <p className="text-sm text-gray-500">{student.parentInfo?.additionalInfo || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Physical Disability</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.physicalDisabilityStatus ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Blood Group</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.bloodGroup || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Identification Marks</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.identificationMarks || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Allergic To</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.allergicTo || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Known Diseases</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.knownDiseases || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Current Medications</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.currentMedications || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Food Preference</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.foodPreference || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Food Restrictions</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.foodRestrictions || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Special Dietary Requirements</p>
                  <p className="text-sm text-gray-500">{student.medicalHistory?.specialDietaryRequirements || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Passport Photo</p>
                  <p className="text-sm text-gray-500">
                    {student.passportPhoto ? <a href={student.passportPhoto} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Aadhar Masked</p>
                  <p className="text-sm text-gray-500">
                    {student.aadharMasked ? <a href={student.aadharMasked} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Form File URLs</p>
                  <p className="text-sm text-gray-500">
                    {student.formFileUrls ? <a href={student.formFileUrls} target="_blank" className="text-hostel-gold">View</a> : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!isEditingMode && (
        <div className="text-center m-4 flex  flex-wrap justify-space-between ">
        {data?.student && data.student.status
               === 'PENDING' && (
            <div className="m-6 space-y-4">
          
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleApprove}   
                  disabled={isApproving}
                  className="rounded-md bg-hostel-gold px-4 sm:px-6 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isApproving ? 'Processing...' : 'Approve'}
                </button>
                </div>
              </div>
            )
            }
          {data?.student  && (
            <div className="m-6 space-y-4">
            
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="rounded-md bg-hostel-gold px-4 sm:px-6 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isApproving ? 'Processing...' : 'Approve'}
                </button> */}
                <button
                  onClick={() => setShowRejectionInput(true)}
                  disabled={isApproving || showRejectionInput}
                  className="rounded-md bg-red-500 px-4 sm:px-6 py-2 font-medium text-white hover:bg-red-600 transition disabled:opacity-50"
                >
                  Suspend
                </button>
              </div>
              {showRejectionInput && (
                <div className="space-y-2">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium">
                    Rejection Reason *
                  </label>
                  <textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for suspension"
                    className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    rows={4}
                    disabled={isApproving}
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowRejectionInput(false)}
                      disabled={isApproving}
                      className="rounded-md bg-gray-300 px-4 sm:px-6 py-2 font-medium text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSuspend}
                      disabled={isApproving}
                      className="rounded-md bg-red-500 px-4 sm:px-6 py-2 font-medium text-white hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {isApproving ? 'Processing...' : 'Confirm Suspension'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      




      <div className="text-center mt-4">
        <Link href="/admin-dashboard/students" className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium">
          Back to Students
        </Link>
      </div>

      {/* Room Assignment Modal */}
      <StudentRoomAssignmentModal
        isOpen={isRoomAssignmentModalOpen}
        onClose={() => setIsRoomAssignmentModalOpen(false)}
        studentId={id}
        studentName={`${student.firstName} ${student.lastName}`}
      />
    </div>
  );
}
