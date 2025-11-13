'use client';

import { useState, useEffect } from 'react';
import { useStudents } from '../hooks/useAllStudents';
import { useAssignStudentToRoom } from '../hooks/useAssignStudentToRoom';
import { X, Search } from 'lucide-react';

interface RoomAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: number;
}

export default function RoomAssignmentModal({
  isOpen,
  onClose,
  roomId,
}: RoomAssignmentModalProps) {
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [notes, setNotes] = useState('');
  const [page, setPage] = useState(1);

  const { data: studentsData, isLoading: studentsLoading } = useStudents({
    status: 'APPROVED',
    search: studentSearch,
    page,
  });

  const { mutate: assignStudent, isPending: isAssigning } = useAssignStudentToRoom();

  const students = studentsData?.students || [];

  const handleAssign = () => {
    if (!selectedStudentId) {
      alert('Please select a student');
      return;
    }

    assignStudent(
      {
        roomId,
        studentId: selectedStudentId,
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          setSelectedStudentId('');
          setNotes('');
          setStudentSearch('');
          setPage(1);
          onClose();
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Assign Student to Room</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Student Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Student
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Students List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Student
            </label>
            <div className="border border-gray-300 rounded-xl max-h-64 overflow-y-auto">
              {studentsLoading && (
                <p className="p-4 text-gray-500 text-sm">Loading students...</p>
              )}
              {!studentsLoading && students.length === 0 && (
                <p className="p-4 text-gray-500 text-sm">No approved students found.</p>
              )}
              {!studentsLoading && students.length > 0 && (
                <div className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name="student"
                        value={student.id}
                        checked={selectedStudentId === student.id}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="w-4 h-4 text-hostel-gold focus:ring-hostel-gold"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                        {student.rollNumber && (
                          <p className="text-xs text-gray-500">Roll: {student.rollNumber}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {studentsData && studentsData.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition text-sm"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {studentsData.pages}
                </span>
                <button
                  onClick={() => setPage(Math.min(studentsData.pages, page + 1))}
                  disabled={page === studentsData.pages}
                  className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 transition text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this assignment"
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              disabled={isAssigning}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isAssigning}
            className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={isAssigning || !selectedStudentId}
            className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white transition disabled:opacity-50 font-medium text-sm sm:text-base"
          >
            {isAssigning ? 'Assigning...' : 'Assign Student'}
          </button>
        </div>
      </div>
    </div>
  );
}
