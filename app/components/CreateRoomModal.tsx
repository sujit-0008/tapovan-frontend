'use client';

import { useState } from 'react';
import { useCreateRoom } from '../hooks/useCreateRoom';
import { X } from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    building: '',
    wing:'',
    capacity: '',
    roomType: '',
    amenities: '',
    description: '',
    isActive: true,
    maintenanceNotes: '',
  });

  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomNumber || !formData.capacity) {
      alert('Room number and capacity are required');
      return;
    }

    createRoom(
      {
        roomNumber: formData.roomNumber,
        floor: formData.floor ? Number(formData.floor) : undefined,
        building: formData.building || undefined,
        capacity: Number(formData.capacity),
        roomType: formData.roomType || undefined,
        wing: formData.wing || undefined,
        amenities: formData.amenities
          ? formData.amenities.split(',').map((a) => a.trim())
          : undefined,
        description: formData.description || undefined,
        isActive: formData.isActive,
        maintenanceNotes: formData.maintenanceNotes || undefined,
      },
      {
        onSuccess: () => {
          setFormData({
            roomNumber: '',
            floor: '',
            wing:'',
            building: '',
            capacity: '',
            roomType: '',
            amenities: '',
            description: '',
            isActive: true,
            maintenanceNotes: '',
          });
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Create New Room</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Room Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number *
              </label>
              <input
                type="text"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                placeholder="e.g., 101"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity *
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g., 2"
                min="1"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
                required
              />
            </div>

            {/* Building */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Building
              </label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) =>
                  setFormData({ ...formData, building: e.target.value })
                }
                placeholder="e.g., Building A"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
              />
            </div>

            {/* Wing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wing
              </label>
              <input
                type="text"
                value={formData.wing}
                onChange={(e) =>
                  setFormData({ ...formData, wing: e.target.value })
                }
                placeholder="e.g., A, B, C"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
              />
            </div>

            {/* Floor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floor
              </label>
              <input
                type="number"
                value={formData.floor}
                onChange={(e) =>
                  setFormData({ ...formData, floor: e.target.value })
                }
                placeholder="e.g., 1"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
              />
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <input
                type="text"
                value={formData.roomType}
                onChange={(e) =>
                  setFormData({ ...formData, roomType: e.target.value })
                }
                placeholder="e.g., Single, Double, Triple"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.isActive ? 'active' : 'inactive'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === 'active',
                  })
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                disabled={isCreating}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) =>
                setFormData({ ...formData, amenities: e.target.value })
              }
              placeholder="e.g., WiFi, AC, Attached Bathroom"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              disabled={isCreating}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add room description"
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              disabled={isCreating}
            />
          </div>

          {/* Maintenance Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maintenance Notes
            </label>
            <textarea
              value={formData.maintenanceNotes}
              onChange={(e) =>
                setFormData({ ...formData, maintenanceNotes: e.target.value })
              }
              placeholder="Add maintenance notes if any"
              rows={2}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
              disabled={isCreating}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="px-4 sm:px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white transition disabled:opacity-50 font-medium text-sm sm:text-base"
            >
              {isCreating ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
