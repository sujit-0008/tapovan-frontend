'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { QRScanner } from '../../components/qr-scanner';
import { useMealCheckin } from '../../hooks/useMealCheckin';
import { useSkipMeal } from '../../hooks/useSkipMeal';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import { useCreateSOSAlert } from '../../hooks/useCreateSOSAlert';
import { useCreateTicket, useRoomTickets } from '../../hooks/useCreateTicket';
import { useFacilities } from '../../hooks/useFacilities';
import { useBookings } from '../../hooks/useBookings';
import { useCreateLeave, useUpdateLeave, useMyLeaves } from '../../hooks/useLeave';
import { useAuthStore } from '../../store/authStore';
import { getErrorMessage } from '../../utils/errorUtils';

export default function StudentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { mutate: checkinMeal, isPending: isCheckingIn } = useMealCheckin();
  const { mutate: skipMeal, isPending: isSkipping } = useSkipMeal();
  const { mutate: createBooking, isPending: isBooking } = useCreateBooking();
  const { mutate: createSOSAlert, isPending: isCreatingSOS } = useCreateSOSAlert();
  const { mutate: createTicket, isPending: isCreatingTicket } = useCreateTicket();
  const { data: roomTicketsData } = useRoomTickets();
  const { data: facilitiesData, isLoading: isFacilitiesLoading } = useFacilities();
  const { data: bookingsData, isLoading: isBookingsLoading } = useBookings();
  const { mutate: createLeaveReq, isPending: isCreatingLeave } = useCreateLeave();
  const { mutate: updateLeaveReq, isPending: isUpdatingLeave } = useUpdateLeave();
  const { data: myLeavesData, isLoading: isLeavesLoading } = useMyLeaves();

  const [mealSkip, setMealSkip] = useState({ 
    mealTypes: [] as string[], 
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] 
  });
  const [bookingForm, setBookingForm] = useState({ facilityId: '', slotStart: '', slotEnd: '' });
  const [ticketForm, setTicketForm] = useState({ category: '', description: '', severity: '', roomNumber: '' });
  const [leaveForm, setLeaveForm] = useState({ startDate: '', endDate: '', reason: '' });
  const [editingLeave, setEditingLeave] = useState<{ id: string; startDate: string; endDate: string; reason: string } | null>(null);

  const handleMealCheckin = (qrData: string) => {
    checkinMeal({ data: qrData }, {
      onSuccess: () => alert('Meal checked in successfully'),
      onError: (error) => alert(error.message || 'Failed to check in meal'),
    });
  };

  const handleSkipMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealSkip.mealTypes.length === 0) {
      alert('Please select at least one meal type');
      return;
    }
    skipMeal({ mealTypes: mealSkip.mealTypes, date: mealSkip.date }, {
      onSuccess: () => {
        alert('Meal skip recorded');
        setMealSkip({ mealTypes: [], date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] });
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        alert(`Failed to skip meal: ${errorMessage}`);
      },
    });
  };

  const handleMealTypeToggle = (mealType: string) => {
    setMealSkip(prev => ({
      ...prev,
      mealTypes: prev.mealTypes.includes(mealType)
        ? prev.mealTypes.filter(m => m !== mealType)
        : [...prev.mealTypes, mealType]
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking(
      {
        facilityId: parseInt(bookingForm.facilityId),
        slotStart: new Date(bookingForm.slotStart).toISOString(),
        slotEnd: new Date(bookingForm.slotEnd).toISOString(),
      },
      {
        onSuccess: () => {
          alert('Booking created successfully');
          setBookingForm({ facilityId: '', slotStart: '', slotEnd: '' });
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to create booking: ${errorMessage}`);
        },
      }
    );
  };

  const handleSOSAlert = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          createSOSAlert(
            { latitude: position.coords.latitude, longitude: position.coords.longitude },
            {
              onSuccess: () => alert('SOS alert sent successfully'),
              onError: (error) => {
                const errorMessage = getErrorMessage(error);
                alert(`Failed to send SOS alert: ${errorMessage}`);
              },
            }
          );
        },
        (error) => alert('Failed to get location: ' + error.message)
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket(
      { category: ticketForm.category, description: ticketForm.description, severity: ticketForm.severity, roomNumber: ticketForm.roomNumber },
      {
        onSuccess: () => {
          alert('Ticket created successfully');
          setTicketForm({ category: '', description: '', severity: '', roomNumber: ''});
        },
        onError: (error) => {
          const errorMessage = getErrorMessage(error);
          alert(`Failed to create ticket: ${errorMessage}`);
        },
      }
    );
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeave) {
      updateLeaveReq(
        { id: editingLeave.id, data: { startDate: leaveForm.startDate, endDate: leaveForm.endDate, reason: leaveForm.reason } },
        {
          onSuccess: () => {
            alert('Leave updated successfully');
            setLeaveForm({ startDate: '', endDate: '', reason: '' });
            setEditingLeave(null);
          },
          onError: (error) => {
            const errorMessage = getErrorMessage(error);
            alert(`Failed to update leave: ${errorMessage}`);
          },
        }
      );
    } else {
      createLeaveReq(
        { startDate: leaveForm.startDate, endDate: leaveForm.endDate, reason: leaveForm.reason },
        {
          onSuccess: () => {
            alert('Leave request created successfully');
            setLeaveForm({ startDate: '', endDate: '', reason: '' });
          },
          onError: (error) => {
            const errorMessage = getErrorMessage(error);
            alert(`Failed to create leave request: ${errorMessage}`);
          },
        }
      );
    }
  };

  const handleEditLeave = (leave: any) => {
    setEditingLeave({ id: leave.id.toString(), startDate: leave.startDate.split('T')[0], endDate: leave.endDate.split('T')[0], reason: leave.reason });
    setLeaveForm({ startDate: leave.startDate.split('T')[0], endDate: leave.endDate.split('T')[0], reason: leave.reason });
  };

  const handleCancelEdit = () => {
    setEditingLeave(null);
    setLeaveForm({ startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push(`/studentDashboard/profile/${user?.id}`)}>
            Profile
          </Button>
          {/* <Button variant="outline" onClick={logout}>
            Logout
          </Button> */}
        </div>
      </div>

      {/* SOS Alert */}
      <Card>
        <CardHeader>
          <CardTitle>SOS Medical Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleSOSAlert}
            disabled={isCreatingSOS}
          >
            {isCreatingSOS ? 'Sending...' : 'Send SOS Alert'}
          </Button>
        </CardContent>
      </Card>

      {/* Meal QR Scanner */}
      <Card>
      <CardHeader>
          <CardTitle>Meal Check-In</CardTitle>
        </CardHeader>
        <CardContent>
          <QRScanner onScan={handleMealCheckin} />
        </CardContent> 
      </Card>

      {/* Skip Meal */}
      <Card>
        <CardHeader>
          <CardTitle>Skip Tomorrow's Meal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSkipMeal} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Date</label>
              <Input
                type="date"
                value={mealSkip.date}
                readOnly
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Meals to Skip *</label>
              <div className="space-y-3">
                {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`meal-${type}`}
                      checked={mealSkip.mealTypes.includes(type)}
                      onChange={() => handleMealTypeToggle(type)}
                      disabled={isSkipping}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor={`meal-${type}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={isSkipping || mealSkip.mealTypes.length === 0}>
              {isSkipping ? 'Skipping...' : 'Skip Selected Meals'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Facility Booking */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Create Facility Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Facility *</label>
                <Select
                  value={bookingForm.facilityId}
                  onChange={(e) => setBookingForm({ ...bookingForm, facilityId: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isBooking || isFacilitiesLoading}
                >
                  <option value="">Select Facility</option>
                  {facilitiesData?.facilities.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name} ({facility.operationalHours})
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time *</label>
                <Input
                  type="datetime-local"
                  value={bookingForm.slotStart}
                  onChange={(e) => setBookingForm({ ...bookingForm, slotStart: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isBooking}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time *</label>
                <Input
                  type="datetime-local"
                  value={bookingForm.slotEnd}
                  onChange={(e) => setBookingForm({ ...bookingForm, slotEnd: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isBooking}
                />
              </div>
            </div>
            <Button type="submit" disabled={isBooking}>
              {isBooking ? 'Booking...' : 'Create Booking'}
            </Button>
          </form>
        </CardContent>
      </Card> */}

      {/* Create Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Create In-Room Service Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTicketSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <Select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isCreatingTicket}
                >
                  <option value="">Select Category</option>
                  {['MAINTENANCE', 'CLEANING', 'OTHER'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <Select
                  value={ticketForm.severity}
                  onChange={(e) => setTicketForm({ ...ticketForm, severity: e.target.value })}
                  className="rounded-xl"
                  disabled={isCreatingTicket}
                >
                  <option value="">Select Severity</option>
                  {['LOW', 'MEDIUM', 'HIGH'].map((sev) => (
                    <option key={sev} value={sev}>{sev}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <Input
                  value={ticketForm.roomNumber}
                  onChange={(e) => setTicketForm({ ...ticketForm, roomNumber: e.target.value })}
                  className="rounded-xl"
                  disabled={isCreatingTicket}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <Input
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                required
                className="rounded-xl min-h-[100px]"
                disabled={isCreatingTicket}
              />
            </div>
            <Button type="submit" disabled={isCreatingTicket}>
              {isCreatingTicket ? 'Creating...' : 'Create Ticket'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Leave Request */}
      <Card>
        <CardHeader>
          <CardTitle>{editingLeave ? 'Edit Leave Request' : 'Request Leave'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLeaveSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <Input
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isCreatingLeave || isUpdatingLeave}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <Input
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isCreatingLeave || isUpdatingLeave}
                  min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason *</label>
              <Input
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                required
                className="rounded-xl"
                disabled={isCreatingLeave || isUpdatingLeave}
                placeholder="Reason for leave"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isCreatingLeave || isUpdatingLeave}>
                {isCreatingLeave || isUpdatingLeave ? 'Submitting...' : editingLeave ? 'Update Leave' : 'Request Leave'}
              </Button>
              {editingLeave && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* My Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>My Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLeavesLoading ? (
            <p className="text-sm text-gray-500">Loading leaves...</p>
          ) : !myLeavesData?.length ? (
            <p className="text-sm text-gray-500">No leave requests found</p>
          ) : (
            <div className="space-y-3">
              {myLeavesData.map((leave) => (
                <div key={leave.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {leave.status}
                      </span>
                      {leave.status === 'PENDING' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditLeave(leave)}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{leave.reason}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Requested on {new Date(leave.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Room Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Open Tickets for Your Room</CardTitle>
        </CardHeader>
        <CardContent>
          {!roomTicketsData?.tickets?.length ? (
            <p className="text-sm text-gray-500">No open tickets for your room.</p>
          ) : (
            <div className="space-y-3">
              {roomTicketsData.tickets.map((t) => (
                <div key={t.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">#{t.id} • {t.category}</div>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">{t.status}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{t.description}</div>
                  {t.severity && <div className="text-xs text-gray-500 mt-1">Severity: {t.severity}</div>}
                  {t.roomNumber && <div className="text-xs text-gray-500">Room: {t.roomNumber}</div>}
                  {t.closureNote && <div className="text-xs text-gray-500">Note: {t.closureNote}</div>}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bookings */}
      {/* <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {isBookingsLoading ? (
            <p className="text-sm text-gray-500">Loading bookings...</p>
          ) : !bookingsData?.bookings.length ? (
            <p className="text-sm text-gray-500">No bookings found</p>
          ) : (
            <table className="w-full border border-gray-200 rounded-xl">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Facility</th>
                  <th className="px-4 py-2 text-left text-sm">Date</th>
                  <th className="px-4 py-2 text-left text-sm">Time</th>
                  <th className="px-4 py-2 text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.bookings.map((booking, index) => (
                  <tr key={booking.id} className={index % 2 ? 'bg-muted/20' : ''}>
                    <td className="px-4 py-2 text-sm">{booking.facility.name}</td>
                    <td className="px-4 py-2 text-sm">{new Date(booking.slotStart).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(booking.slotStart).toLocaleTimeString()} - {new Date(booking.slotEnd).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
}
