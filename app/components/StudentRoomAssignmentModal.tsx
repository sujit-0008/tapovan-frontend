'use client';

import { useState } from 'react';
import { useAvailableRooms } from '../hooks/useAvailableRooms';
import { useAssignStudentToRoom } from '../hooks/useAssignStudentToRoom';
import { X, Search } from 'lucide-react';

interface StudentRoomAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
}

export default function StudentRoomAssignmentModal({
  isOpen,
  onClose,
  studentId,
  studentName,
}: StudentRoomAssignmentModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: roomsData, isLoading: roomsLoading } = useAvailableRooms();
  const { mutate: assignStudent, isPending: isAssigning } = useAssignStudentToRoom();

  const rooms = roomsData?.data || [];

  // Filter rooms based on search term
  const filteredRooms = rooms.filter((room) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      room.roomNumber.toLowerCase().includes(searchLower) ||
      room.building?.toLowerCase().includes(searchLower) ||
      room.roomType?.toLowerCase().includes(searchLower)
    );
  });

  const handleAssign = () => {
    if (!selectedRoomId) {
      alert('Please select a room');
      return;
    }

    assignStudent(
      {
        roomId: selectedRoomId,
        studentId,
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          setSelectedRoomId(null);
          setNotes('');
          setSearchTerm('');
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
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Assign Room</h2>
            <p className="text-sm text-gray-500 mt-1">Student: {studentName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Rooms
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by room number, building, or type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Rooms Grid */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Available Rooms
            </label>
            {roomsLoading && (
              <p className="text-gray-500 text-sm text-center py-8">Loading available rooms...</p>
            )}
            {!roomsLoading && filteredRooms.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-8">
                {rooms.length === 0 ? 'No available rooms' : 'No rooms match your search'}
              </p>
            )}
            {!roomsLoading && filteredRooms.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-4 rounded-xl border-2 transition text-left ${
                      selectedRoomId === room.id
                        ? 'border-hostel-gold bg-hostel-gold/10'
                        : 'border-gray-200 hover:border-hostel-gold'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">Room {room.roomNumber}</h3>
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                        {room.availableSlots} slot{room.availableSlots !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {room.building && <p>Building: {room.building}</p>}
                      {room.floor !== null && <p>Floor: {room.floor}</p>}
                      {room.roomType && <p>Type: {room.roomType}</p>}
                      <p>Capacity: {room.capacity}</p>
                    </div>
                  </button>
                ))}
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
            disabled={isAssigning || !selectedRoomId}
            className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white transition disabled:opacity-50 font-medium text-sm sm:text-base"
          >
            {isAssigning ? 'Assigning...' : 'Assign Room'}
          </button>
        </div>
      </div>
    </div>
  );
}
