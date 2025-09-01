"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { QrCode } from "lucide-react";

export default function StudentDashboard() {
  const [mealSelections, setMealSelections] = useState({
    breakfast: false,
    lunch: true,
    dinner: true
  });

  const gameRoomBookings = [
    { date: "2024-07-5", time: "02:00 PM - 04:00 PM" },
    { date: "2024-07-13", time: "06:00 PM - 08:00 PM" },
    { date: "2024-07-29", time: "10:00 AM - 12:00 PM" }
  ];

  const entryExitData = [
    { date: "2024-07-26", time: "08:00 AM", status: "Entered" },
    { date: "2024-07-25", time: "06:00 PM", status: "Exited" },
    { date: "2024-07-25", time: "08:00 AM", status: "Entered" },
    { date: "2024-07-24", time: "06:00 PM", status: "Exited" },
    { date: "2024-07-24", time: "08:00 AM", status: "Entered" }
  ];

  const handleMealToggle = (meal: string) => {
    setMealSelections(prev => ({
      ...prev,
      [meal]: !prev[meal as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-hostel-burgundy transition">
            Dashboard
          </button>
          <button className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-hostel-burgundy transition">
            Profile
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-hostel-burgundy font-bold">A</span>
          </div>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* SOS Medical Alert */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SOS Medical Alert</h2>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
            SOS Medical Alert
          </button>
        </div>

        {/* Meal QR Code */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Meal QR Code</h2>
          <button className="flex items-center bg-hostel-gold hover:bg-hostel-gold/90 text-white px-6 py-2 rounded-md">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR Code
          </button>
        </div>

        {/* Tomorrow Meal */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tomorrow Meal</h2>
          <Card>
            <CardContent className="p-6">
              <table className="w-full border border-gray-200 rounded-md">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-4 py-2 text-left"></th>
                    <th className="px-4 py-2 text-center">Yes</th>
                    <th className="px-4 py-2 text-center">No</th>
                  </tr>
                </thead>
                <tbody>
                  {["breakfast", "lunch", "dinner"].map((meal, idx) => (
                    <tr key={meal} className={idx % 2 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-2 font-medium capitalize">{meal}</td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="radio"
                          name={meal}
                          checked={mealSelections[meal as keyof typeof mealSelections]}
                          onChange={() => handleMealToggle(meal)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="radio"
                          name={meal}
                          checked={!mealSelections[meal as keyof typeof mealSelections]}
                          onChange={() => handleMealToggle(meal)}
                          className="w-4 h-4"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* In-Room Service Ticket */}
        <div>
          <h2 className="text-2xl font-bold mb-4">In-Room Service Ticket</h2>
          <button className="bg-hostel-gold hover:bg-hostel-gold/90 text-white px-6 py-2 rounded-md">
            Room service Ticket
          </button>
        </div>

        {/* Medical Records */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
          <button className="bg-hostel-gold hover:bg-hostel-gold/90 text-white px-6 py-2 rounded-md">
            View Medical Records
          </button>
        </div>

        {/* Game Room Bookings */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Game Room Bookings</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">July 2024</span>
              <div className="flex space-x-2">
                <button className="px-2 py-1 border rounded hover:bg-muted">‹</button>
                <button className="px-2 py-1 border rounded hover:bg-muted">›</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center font-semibold p-2">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isHighlighted = day === 4;
                return (
                  <div
                    key={day}
                    className={`text-center p-2 rounded cursor-pointer ${
                      isHighlighted ? 'bg-hostel-gold text-white' : 'hover:bg-muted'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {gameRoomBookings.map((booking, index) => (
                <tr key={index} className={index % 2 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2">{booking.date}</td>
                  <td className="px-4 py-2">{booking.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Entry/Exit */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Student Entry/Exit</h2>
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {entryExitData.map((record, index) => (
                <tr key={index} className={index % 2 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">{record.time}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "Entered"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
