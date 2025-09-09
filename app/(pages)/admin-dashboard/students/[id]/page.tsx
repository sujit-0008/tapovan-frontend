
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { useStudentDetails } from '../../../../hooks/useStudentDetails';
import { useApproveStudent } from '../../../../hooks/useApproveStudent';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useStudentDetails(id);
  const { mutate: approveStudent, isPending: isApproving } = useApproveStudent();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionInput, setShowRejectionInput] = useState(false);

  const handleApprove = () => {
    approveStudent({ id, data: { status: 'APPROVED' } });
  };

  const handleSuspend = () => {
    if (!rejectionReason.trim()) {
      alert('Rejection reason is required for suspension');
      return;
    }
    approveStudent({ id, data: { status: 'SUSPENDED', rejectionReason } });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Student Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p className="text-gray-500 text-sm">Loading student details...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error.message || 'Failed to load student details'}
            </p>
          )}
          {data?.student && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Personal Details</h3>
                <p className="text-sm">
                  <strong>Name:</strong> {data.student.firstName} {data.student.middleName || ''}{' '}
                  {data.student.lastName || ''}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {data.student.email}
                </p>
                <p className="text-sm">
                  <strong>Mobile:</strong> {data.student.mobileNumber}
                </p>
                <p className="text-sm">
                  <strong>WhatsApp:</strong> {data.student.whatsappNumber || 'N/A'}
                </p>
                <p className="text-sm">
                  <strong>Gender:</strong> {data.student.gender}
                </p>
                <p className="text-sm">
                  <strong>Date of Birth:</strong>{' '}
                  {new Date(data.student.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> {data.student.permanentAddress}
                </p>
                <p className="text-sm">
                  <strong>Room:</strong> {data.student.roomNumber}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Academic Details</h3>
                <p className="text-sm">
                  <strong>Institute:</strong> {data.student.instituteName}
                </p>
                <p className="text-sm">
                  <strong>Course:</strong> {data.student.courseName}
                </p>
                <p className="text-sm">
                  <strong>Roll Number:</strong> {data.student.rollNumber}
                </p>
                <p className="text-sm">
                  <strong>Languages:</strong> {data.student.languagesKnown.join(', ')}
                </p>
              </div>
              {data.student.parentInfo && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base">Parent/Guardian Details</h3>
                  <p className="text-sm">
                    <strong>Parent 1:</strong> {data.student.parentInfo.parent1Name} (
                    {data.student.parentInfo.parent1Email}, {data.student.parentInfo.parent1Mobile})
                  </p>
                  {data.student.parentInfo.parent2Name && (
                    <p className="text-sm">
                      <strong>Parent 2:</strong> {data.student.parentInfo.parent2Name} (
                      {data.student.parentInfo.parent2Email || 'N/A'},{' '}
                      {data.student.parentInfo.parent2Mobile || 'N/A'})
                    </p>
                  )}
                  {data.student.parentInfo.localGuardian1Name && (
                    <p className="text-sm">
                      <strong>Local Guardian 1:</strong>{' '}
                      {data.student.parentInfo.localGuardian1Name} (
                      {data.student.parentInfo.localGuardian1Email || 'N/A'},{' '}
                      {data.student.parentInfo.localGuardian1Mobile || 'N/A'})
                    </p>
                  )}
                  {data.student.parentInfo.additionalInfo && (
                    <p className="text-sm">
                      <strong>Additional Info:</strong> {data.student.parentInfo.additionalInfo}
                    </p>
                  )}
                </div>
              )}
              {data.student.medicalHistory && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base">Medical History</h3>
                  <p className="text-sm">
                    <strong>Blood Group:</strong> {data.student.medicalHistory.bloodGroup}
                  </p>
                  <p className="text-sm">
                    <strong>Identification Marks:</strong>{' '}
                    {data.student.medicalHistory.identificationMarks}
                  </p>
                  <p className="text-sm">
                    <strong>Allergies:</strong> {data.student.medicalHistory.allergicTo}
                  </p>
                  <p className="text-sm">
                    <strong>Known Diseases:</strong> {data.student.medicalHistory.knownDiseases}
                  </p>
                  <p className="text-sm">
                    <strong>Medications:</strong> {data.student.medicalHistory.currentMedications}
                  </p>
                  <p className="text-sm">
                    <strong>Food Preference:</strong> {data.student.medicalHistory.foodPreference}
                  </p>
                  <p className="text-sm">
                    <strong>Food Restrictions:</strong>{' '}
                    {data.student.medicalHistory.foodRestrictions}
                  </p>
                  <p className="text-sm">
                    <strong>Special Dietary Requirements:</strong>{' '}
                    {data.student.medicalHistory.specialDietaryRequirements}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Documents</h3>
                <div className="text-sm">
                  <strong>Passport Photo:</strong>
                  <a href={data.student.passportPhoto} target="_blank" rel="noopener noreferrer">
                    <img
                      src={data.student.passportPhoto}
                      alt="Passport Photo"
                      className="mt-2 w-32 h-32 object-cover rounded-md border cursor-pointer"
                    />
                  </a>
                </div>
                <div className="text-sm">
                  <strong>Aadhar (Masked):</strong>
                  <a href={data.student.aadharMasked} target="_blank" rel="noopener noreferrer">
                    <img
                      src={data.student.aadharMasked}
                      alt="Aadhar (Masked)"
                      className="mt-2 w-48 h-auto object-contain rounded-md border cursor-pointer"
                    />
                  </a>
                </div>
                {data.student.formFileUrls && (
                  <div className="text-sm">
                    <strong>Form File:</strong>{' '}
                    <a
                      href={data.student.formFileUrls}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Status</h3>
                <p className="text-sm">
                  <strong>Current Status:</strong> {data.student.status}
                </p>
                {data.student.rejectionReason && (
                  <p className="text-sm">
                    <strong>Rejection Reason:</strong> {data.student.rejectionReason}
                  </p>
                )}
              </div>
            </div>
          )}
          {data?.student && data.student.status === 'PENDING' && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-sm sm:text-base">Actions</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="rounded-md bg-hostel-gold px-4 sm:px-6 py-2 font-medium text-white hover:bg-hostel-gold/90 transition disabled:opacity-50"
                >
                  {isApproving ? 'Processing...' : 'Approve'}
                </button>
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
        </CardContent>
      </Card>
      <div className="text-center mt-4">
        <Link
          href="/admin-dashboard"
          className="text-hostel-gold hover:text-hostel-gold/80 text-sm font-medium"
        >
          Back to Notifications
        </Link>
      </div>
    </div>
  );
}
