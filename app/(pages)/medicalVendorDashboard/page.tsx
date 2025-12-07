
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useSearchStudents, useMedicalHistory ,useAddCheckup  } from '../../hooks/useSearchStudents';

import { Search, FileText, PlusCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [showAddCheckup, setShowAddCheckup] = useState(false);
  const [checkupForm, setCheckupForm] = useState({
    report: '',
    prescription: '',
    notes: '',
  });

  const { data: searchData, isFetching: isSearching } = useSearchStudents(searchQuery);
  const { data: historyData, isLoading: isLoadingHistory } = useMedicalHistory(selectedStudentId || '');
  const addCheckup = useAddCheckup();

  const handleAddCheckup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    addCheckup.mutate(
      {
        studentId: selectedStudentId,
        data: checkupForm,
      },
      {
        onSuccess: () => {
          setShowAddCheckup(false);
          setCheckupForm({ report: '', prescription: '', notes: '' });
          alert('Checkup report added successfully!');
        },
        onError: (err: any) => alert(err.message || 'Failed to add checkup'),
      }
    );
  };

  const selectedStudent = searchData?.students.find(s => s.id === selectedStudentId);

  return (
    <div className="min-h-screen bg-background p-4 xl:m-20 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
      </div>

      {/* Search Student */}
      <Card>
        <CardHeader>
          <CardTitle>Search Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Type student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>

          {isSearching && <p className="mt-4 text-sm text-gray-500">Searching...</p>}

          {searchData&& searchData?.students.length > 0 && searchQuery && (
            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {searchData.students.map((student) => (
                <Card
                  key={student.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStudentId === student.id ? 'ring-2 ring-hostel-gold' : ''
                  }`}
                  onClick={() => setSelectedStudentId(student.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {student.firstName} {student.middleName} {student.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Roll: {student.rollNumber} | Room: {student.roomNumber}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudentId(student.id);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View History
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudentId(student.id);
                            setShowAddCheckup(true);
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Add Checkup
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Student Medical History */}
      {selectedStudentId && selectedStudent && (
        <Card>
          <CardHeader>
            <CardTitle>
              Medical History - {selectedStudent.firstName} {selectedStudent.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <p>Loading medical history...</p>
            ) : !historyData?.history ? (
              <p className="text-gray-500">No medical history found.</p>
            ) : (
              <div className="space-y-6">
                {/* Base Medical Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Blood Group:</strong> {historyData.history.bloodGroup || 'Not specified'}
                  </div>
                  <div>
                    <strong>Allergies:</strong> {historyData.history.allergicTo || 'None'}
                  </div>
                  <div>
                    <strong>Known Diseases:</strong> {historyData.history.knownDiseases || 'None'}
                  </div>
                  <div>
                    <strong>Current Medications:</strong> {historyData.history.currentMedications || 'None'}
                  </div>
                </div>

                <hr />

                {/* Checkup Reports */}
                <h3 className="text-lg font-semibold mt-6">Checkup Reports</h3>
                {historyData.history.checkupReports.length === 0 ? (
                  <p className="text-gray-500">No checkup reports yet.</p>
                ) : (
                  <div className="space-y-4">
                    {historyData.history.checkupReports.map((report) => (
                      <Card key={report.id} className="bg-muted/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-sm text-gray-500">
                                {new Date(report.date).toLocaleDateString()} by {report.vendor.name}
                              </p>
                              <p className="mt-2"><strong>Report:</strong> {report.report}</p>
                              {report.prescription && (
                                <p className="mt-1"><strong>Prescription:</strong> {report.prescription}</p>
                              )}
                              {report.notes && (
                                <p className="mt-1 text-sm text-gray-600"><em>{report.notes}</em></p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Checkup Modal */}
      {showAddCheckup && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle>Add Checkup Report</CardTitle>
              <p className="text-sm text-gray-600">
                Student: {selectedStudent.firstName} {selectedStudent.lastName} ({selectedStudent.rollNumber})
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCheckup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report *</label>
                  <textarea
                    required
                    rows={4}
                    value={checkupForm.report}
                    onChange={(e) => setCheckupForm({ ...checkupForm, report: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-hostel-gold"
                    placeholder="e.g., Patient is healthy. No issues found."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prescription</label>
                  <textarea
                    rows={3}
                    value={checkupForm.prescription}
                    onChange={(e) => setCheckupForm({ ...checkupForm, prescription: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-hostel-gold"
                    placeholder="e.g., Paracetamol 500mg if needed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    rows={2}
                    value={checkupForm.notes}
                    onChange={(e) => setCheckupForm({ ...checkupForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-hostel-gold"
                    placeholder="Additional observations..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowAddCheckup(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addCheckup.isPending}>
                    {addCheckup.isPending ? 'Saving...' : 'Save Checkup'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
