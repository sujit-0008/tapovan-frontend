
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useParentAttendance } from '../../hooks/useParentAttendance';
import { useAuthStore } from '../../store/authStore';
import { Button } from '@/app/components/ui/button';

export default function ParentDashboard() {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useParentAttendance();

  const [activeSection, setActiveSection] = useState('foodIntake');

  if (isLoading) return <p className="p-4 sm:p-6 text-gray-500 text-sm">Loading dashboard...</p>;
  if (error) return <p className="p-4 sm:p-6 text-red-500 text-sm">Error: {error.message || 'Failed to load dashboard'}</p>;
  if (!data) return <p className="p-4 sm:p-6 text-gray-500 text-sm">No data available.</p>;

  const { parentInfo,studentInfo, attendance, mealAttendance, checkupReports } = data;
console.log("Parent Info:",parentInfo);
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-8">
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Parent Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push('/parent/profile')}>
            Profile
          </Button>
          <Button variant="outline" onClick={() => user?.logout()}>
            Logout
          </Button>
        </div>
      </div> */}

      {/* Notification Section */}

         <Card>
        <CardHeader>
          <CardTitle>Parent Names</CardTitle>
        </CardHeader>
        <CardContent>
        {/* <p className="text-lg font-semibold ">
          ID:  {studentInfo.id}
        </p> */}
        <p className="text-lg font-semibold ">
          Name 1: {parentInfo.parent1Name}
        </p>
        <p className="text-lg font-semibold ">
          Name 2: {parentInfo.parent2Name}
        </p>
      

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
        {/* <p className="text-lg font-semibold ">
          ID:  {studentInfo.id}
        </p> */}
        <p className="text-lg font-semibold ">
          Name: {studentInfo.firstName} {studentInfo.lastName}
        </p>
        <p className="text-lg font-semibold ">
          Room Number: {studentInfo.roomNumber}
        </p>
     
        

        </CardContent>
      </Card>

      {/* Medical Records */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checkupReports.length > 0 ? (
              checkupReports.map((report, index) => (
                <Card key={index} className="bg-muted/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg sm:text-xl mb-2">
                          {new Date(report.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">Report: {report.report}</p>
                        <p className="text-sm text-gray-500 mb-2">Prescription: {report.prescription}</p>
                        <p className="text-sm text-gray-500 mb-2">Notes: {report.notes}</p>
                        <p className="text-sm text-gray-500">
                          Vendor: {report.vendor.name} ({report.vendor.category})
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-gray-500">No medical checkups .</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Student Food Intake */}
      <Card>
        <CardHeader>
          <CardTitle>Student Food Intake</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Date</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Breakfast</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Lunch</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Dinner</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Snack</th>
              </tr>
            </thead>
            <tbody>
              {mealAttendance.map((attendance, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                  <td className="p-2 text-sm sm:text-base font-medium text-hostel-gold">
                    {new Date(attendance.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm font-medium ${attendance.mealType === 'BREAKFAST' && attendance.present
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {attendance.mealType === 'BREAKFAST' ? (attendance.present ? 'Present' : 'Absent') : 'N/A'}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm font-medium ${attendance.mealType === 'LUNCH' && attendance.present
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {attendance.mealType === 'LUNCH' ? (attendance.present ? 'Present' : 'Absent') : 'N/A'}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm font-medium ${attendance.mealType === 'DINNER' && attendance.present
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {attendance.mealType === 'DINNER' ? (attendance.present ? 'Present' : 'Absent') : 'N/A'}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs sm:text-sm font-medium ${attendance.mealType === 'SNACK' && attendance.present
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {attendance.mealType === 'SNACK' ? (attendance.present ? 'Present' : 'Absent') : 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {mealAttendance.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-6">No food intake data available.</p>
          )}
        </CardContent>
      </Card>

      {/* Student Entry/Exit Timings */}
      <Card>
        <CardHeader>
          <CardTitle>Student Entry/Exit Timings</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Date</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Entry Time</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Exit Time</th>
                <th className="text-left font-semibold p-2 text-sm sm:text-base">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                  <td className="p-2 text-sm sm:text-base font-medium text-hostel-gold">
                    {new Date(record.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="p-2 text-sm sm:text-base text-blue-700">
                    {record.inTime ? new Date(record.inTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </td>
                  <td className="p-2 text-sm sm:text-base text-purple-700">
                    {record.outTime ? new Date(record.outTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </td>
                  <td className="p-2 text-sm sm:text-base text-gray-500">
                    {record.remarks || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {attendance.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-6">No entry/exit data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
