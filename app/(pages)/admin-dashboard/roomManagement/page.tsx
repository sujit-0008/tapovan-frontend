'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { useRooms } from '../../../hooks/useRooms';
import { useAvailableRooms } from '../../../hooks/useAvailableRooms';
import { useRoomOccupancyReport } from '../../../hooks/useRoomOccupancyReport';
import { useCreateRoom } from '../../../hooks/useCreateRoom';
import { useDeleteRoom } from '../../../hooks/useDeleteRoom';
import { useState } from 'react';
import { Search, Plus, Trash2, Users, Edit } from 'lucide-react';
import RoomAssignmentModal from '../../../components/RoomAssignmentModal';
import CreateRoomModal from '../../../components/CreateRoomModal';
import EditRoomModal from '../../../components/EditRoomModal';
import RoomOccupantsModal from '../../../components/RoomOccupantsModal';

export default function RoomManagement() {
  const [search, setSearch] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState<number | ''>('');
  const [wing, setWing] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOccupantsModalOpen, setIsOccupantsModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'occupancy'>('list');

  const { data: roomsData, isLoading: roomsLoading, error: roomsError } = useRooms({
    building: building || undefined,
    floor: floor ? Number(floor) : undefined,
  });

  const { data: occupancyData, isLoading: occupancyLoading } = useRoomOccupancyReport();
  const { mutate: deleteRoom, isPending: isDeleting } = useDeleteRoom();

  const rooms = roomsData?.data || [];
  const occupancyReport = occupancyData?.data || [];

  const filteredRooms = rooms.filter((room) => {
    const searchLower = search.toLowerCase();
    return (
      room.roomNumber.toLowerCase().includes(searchLower) ||
      room.building?.toLowerCase().includes(searchLower) ||
      room.description?.toLowerCase().includes(searchLower)||
      room.wing?.toLowerCase().includes(searchLower)
    
    );
  });

  const handleDeleteRoom = (roomId: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(roomId);
    }
  };

  const handleAssignStudent = (roomId: number) => {
    setSelectedRoomId(roomId);
    setIsAssignModalOpen(true);
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Room Management</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Add New Room
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
            viewMode === 'list'
              ? 'bg-hostel-gold text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Room List
        </button>
        <button
          onClick={() => setViewMode('occupancy')}
          className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
            viewMode === 'occupancy'
              ? 'bg-hostel-gold text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Occupancy Report
        </button>
      </div>

      {viewMode === 'list' ? (
        <>
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by room number or building or wing"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                  />
                </div>
          
                <input
                  type="number"
                  placeholder="Floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Rooms List */}
          <Card>
            <CardHeader>
              <CardTitle>Rooms</CardTitle>
              <p className="text-gray-500 text-sm">
                Total Rooms: {filteredRooms.length}
              </p>
            </CardHeader>
            <CardContent>
              {roomsLoading && <p className="text-gray-500 text-sm">Loading rooms...</p>}
              {roomsError && (
                <p className="text-red-500 text-sm">
                  Error: {roomsError.message || 'Failed to load rooms'}
                </p>
              )}
              {!roomsLoading && !roomsError && filteredRooms.length === 0 && (
                <p className="text-gray-500 text-sm text-center mt-6">No rooms found.</p>
              )}
              {!roomsLoading && !roomsError && filteredRooms.length > 0 && (
                <div className="flex flex-col sm:grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
>
                  {filteredRooms.map((room) => {
                    const activeAssignments = room.assignments.filter(
                      (a) => a.status === 'ACTIVE'
                    ).length;
                    const occupancyPercentage = Math.round(
                      (activeAssignments / room.capacity) * 100
                    );

                    return (
                      <Card
                        key={room.id}
                        className="shadow-md hover:shadow-lg transition rounded-2xl "
                      >
                        <CardContent className="p-4 sm:p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">
                                Room {room.roomNumber}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {room.building} ,{room.wing && `Wing ${room.wing}`} ,{room.floor && `- Floor ${room.floor}`}
                              </p>
                            </div>
                            <span
                              className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                                room.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {room.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Capacity:</span>
                              <span className="font-medium">{room.capacity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Occupied:</span>
                              <span className="font-medium">{activeAssignments}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Available:</span>
                              <span className="font-medium">
                                {room.capacity - activeAssignments}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-hostel-gold h-2 rounded-full transition-all"
                                style={{ width: `${occupancyPercentage}%` }}
                              />
                            </div>
                            <p
                              className={`text-sm font-medium ${getOccupancyColor(
                                occupancyPercentage
                              )}`}
                            >
                              {occupancyPercentage}% Occupied
                            </p>
                          </div>

                          {room.roomType && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Type:</span> {room.roomType}
                            </p>
                          )}

                          {room.description && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Description:</span> {room.description}
                            </p>
                          )}

                          <div className="flex gap-2 pt-4 flex-wrap">
                            <button
                              onClick={() => handleAssignStudent(room.id)}
                              disabled={
                                activeAssignments >= room.capacity || !room.isActive
                              }
                              className="flex-1 min-w-[100px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Users className="w-4 h-4" />
                              Assign
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRoom(room);
                                setIsOccupantsModalOpen(true);
                              }}
                              disabled={activeAssignments === 0}
                              className="px-3 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              title="View occupants"
                            >
                              <Users className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRoom(room);
                                setIsEditModalOpen(true);
                              }}
                              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition text-sm"
                              title="Edit room"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoom(room.id)}
                              disabled={isDeleting || activeAssignments > 0}
                              className="px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 font-medium transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Occupancy Report View */
        <Card>
          <CardHeader>
            <CardTitle>Room Occupancy Report</CardTitle>
          </CardHeader>
          <CardContent>
            {occupancyLoading && <p className="text-gray-500 text-sm">Loading report...</p>}
            {!occupancyLoading && occupancyReport.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-6">No rooms found.</p>
            )}
            {!occupancyLoading && occupancyReport.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Room Number
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Building
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Floor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">  
                        Wing
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Capacity
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Occupied
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Available
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Occupancy %
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {occupancyReport.map((room) => (
                      <tr key={room.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {room.roomNumber}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{room.building || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-600">{room.floor || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-600">{room.wing || 'N/A'}</td>
                        <td className="py-3 px-4 text-center text-gray-600">
                          {room.capacity}
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600">
                          {room.occupied}
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600">
                          {room.available}
                        </td>
                        <td
                          className={`py-3 px-4 text-center font-medium ${getOccupancyColor(
                            room.occupancyPercentage
                          )}`}
                        >
                          {room.occupancyPercentage}%
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                              room.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {room.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      {selectedRoomId && (
        <RoomAssignmentModal
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setSelectedRoomId(null);
          }}
          roomId={selectedRoomId}
        />
      )}
      {selectedRoom && (
        <EditRoomModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRoom(null);
          }}
          room={selectedRoom}
        />
      )}
      {selectedRoom && (
        <RoomOccupantsModal
          isOpen={isOccupantsModalOpen}
          onClose={() => {
            setIsOccupantsModalOpen(false);
            setSelectedRoom(null);
          }}
          room={selectedRoom}
        />
      )}
    </div>
  );
}
