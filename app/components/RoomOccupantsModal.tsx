'use client';

import { useState } from 'react';
import { useVacateStudent } from '../hooks/useVacateStudent';
import { X, LogOut } from 'lucide-react';
import { Room } from '../types/room';

interface RoomOccupantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export default function RoomOccupantsModal({ isOpen, onClose, room }: RoomOccupantsModalProps) {
  const [vacatingAssignmentId, setVacatingAssignmentId] = useState<number | null>(null);
  const { mutate: vacateStudent, isPending: isVacating } = useVacateStudent();

  const activeAssignments = room?.assignments.filter((a) => a.status === 'ACTIVE') || [];

  const handleVacateStudent = (assignmentId: number, studentName: string) => {
    if (
      window.confirm(
        `Are you sure you want to vacate ${studentName} from this room?`
      )
    ) {
      setVacatingAssignmentId(assignmentId);
      vacateStudent(assignmentId, {
        onSuccess: () => {
          setVacatingAssignmentId(null);
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
          setVacatingAssignmentId(null);
        },
      });
    }
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Room {room.roomNumber} Occupants
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {room.building} {room.wing && `Wing ${room.wing}`} {room.floor && `- Floor ${room.floor}`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Room Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600">Capacity</p>
                <p className="text-lg font-semibold text-gray-800">{room.capacity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Occupied</p>
                <p className="text-lg font-semibold text-gray-800">
                  {activeAssignments.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Available</p>
                <p className="text-lg font-semibold text-gray-800">
                  {room.capacity - activeAssignments.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Occupancy</p>
                <p className="text-lg font-semibold text-gray-800">
                  {Math.round((activeAssignments.length / room.capacity) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Occupants List */}
          {activeAssignments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No students currently assigned to this room</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {assignment.student?.firstName} {assignment.student?.lastName}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Email:</span> {assignment.student?.email}
                      </p>
                      <p>
                        <span className="font-medium">Mobile:</span>{' '}
                        {assignment.student?.mobileNumber}
                      </p>
                      {assignment.student?.rollNumber && (
                        <p>
                          <span className="font-medium">Roll:</span>{' '}
                          {assignment.student.rollNumber}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Assigned:</span>{' '}
                        {new Date(assignment.assignedDate).toLocaleDateString()}
                      </p>
                    </div>
                    {assignment.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {assignment.notes}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      handleVacateStudent(
                        assignment.id,
                        `${assignment.student?.firstName} ${assignment.student?.lastName}`
                      )
                    }
                    disabled={isVacating && vacatingAssignmentId === assignment.id}
                    className="ml-4 px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-medium transition text-sm disabled:opacity-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {isVacating && vacatingAssignmentId === assignment.id
                      ? 'Vacating...'
                      : 'Vacate'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
