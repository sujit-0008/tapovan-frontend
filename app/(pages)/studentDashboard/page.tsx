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
import { useAuthStore } from '../../store/authStore';

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

  const [mealSkip, setMealSkip] = useState({ mealType: '', date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] });
  const [bookingForm, setBookingForm] = useState({ facilityId: '', slotStart: '', slotEnd: '' });
  const [ticketForm, setTicketForm] = useState({ category: '', description: '', severity: '', roomNumber: '' });

  const handleMealCheckin = (qrData: string) => {
    checkinMeal({ data: qrData }, {
      onSuccess: () => alert('Meal checked in successfully'),
      onError: (error) => alert(error.message || 'Failed to check in meal'),
    });
  };

  const handleSkipMeal = (e: React.FormEvent) => {
    e.preventDefault();
    skipMeal({ ...mealSkip, mealType: mealSkip.mealType as 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'ALL' }, {
      onSuccess: () => {
        alert('Meal skip recorded');
        setMealSkip({ ...mealSkip, mealType: '' });
      },
      onError: (error) => alert(error.message || 'Failed to skip meal'),
    });
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
        onError: (error) => alert(error.message || 'Failed to create booking'),
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
              onError: (error) => alert(error.message || 'Failed to send SOS alert'),
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
        onError: (error) => alert(error.message || 'Failed to create ticket'),
      }
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push(`/studentDashboard/profile/${user?.id}`)}>
            Profile
          </Button>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <Input
                  type="date"
                  value={mealSkip.date}
                  readOnly
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meal Type *</label>
                <Select
                  value={mealSkip.mealType}
                  onChange={(e) => setMealSkip({ ...mealSkip, mealType: e.target.value })}
                  required
                  className="rounded-xl"
                  disabled={isSkipping}
                >
                  <option value="">Select Meal</option>
                  {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'ALL'].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={isSkipping}>
              {isSkipping ? 'Skipping...' : 'Skip Meal'}
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
