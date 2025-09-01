"use client"
import { Card, CardContent } from "../../components/ui/card";

export default function ParentDashboard() {
  const foodIntakeData = [
    { date: "2024-07-22", breakfast: "Present", lunch: "Absent", dinner: "Present" },
    { date: "2024-07-21", breakfast: "Present", lunch: "Present", dinner: "Present" },
    { date: "2024-07-20", breakfast: "Absent", lunch: "Present", dinner: "Absent" },
    { date: "2024-07-19", breakfast: "Present", lunch: "Present", dinner: "Present" },
    { date: "2024-07-18", breakfast: "Present", lunch: "Absent", dinner: "Present" },
    { date: "2024-07-17", breakfast: "Absent", lunch: "Present", dinner: "Absent" },
    { date: "2024-07-16", breakfast: "Present", lunch: "Present", dinner: "Present" }
  ];

  const entryExitData = [
    { date: "2024-07-22", entryTime: "08:00 AM", exitTime: "06:00 PM" },
    { date: "2024-07-21", entryTime: "08:30 AM", exitTime: "05:30 PM" },
    { date: "2024-07-20", entryTime: "09:00 AM", exitTime: "06:30 PM" },
    { date: "2024-07-19", entryTime: "08:15 AM", exitTime: "05:45 PM" },
    { date: "2024-07-18", entryTime: "08:45 AM", exitTime: "06:15 PM" },
    { date: "2024-07-17", entryTime: "09:15 AM", exitTime: "05:15 PM" },
    { date: "2024-07-16", entryTime: "08:00 AM", exitTime: "06:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <div className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Parent Dashboard</h1>
        <div className="flex space-x-4 items-center">
          <button className="px-4 py-2 rounded border text-white border-white hover:bg-white hover:text-hostel-burgundy transition">
            Dashboard
          </button>
          <button className="px-4 py-2 rounded border text-white border-white hover:bg-white hover:text-hostel-burgundy transition">
            Profile
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-hostel-burgundy font-bold">A</span>
          </div>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Notification Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Notification</h2>
        </div>

        {/* Medical Records */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
          <button className="px-4 py-2 rounded bg-hostel-gold hover:bg-hostel-gold/90 text-white transition">
            View Medical Records
          </button>
        </div>

        {/* Student Food Intake */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Student Food Intake</h2>
          <Card>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left font-semibold p-2">Date</th>
                    <th className="text-left font-semibold p-2">Breakfast</th>
                    <th className="text-left font-semibold p-2">Lunch</th>
                    <th className="text-left font-semibold p-2">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {foodIntakeData.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-2 text-hostel-gold font-medium">{record.date}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            record.breakfast === "Present" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {record.breakfast}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            record.lunch === "Present" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {record.lunch}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            record.dinner === "Present" ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {record.dinner}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Student Entry/Exit Timings */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Student Entry/Exit Timings</h2>
          <Card>
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left font-semibold p-2">Date</th>
                    <th className="text-left font-semibold p-2">Entry Time</th>
                    <th className="text-left font-semibold p-2">Exit Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entryExitData.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-2 text-hostel-gold font-medium">{record.date}</td>
                      <td className="p-2 text-blue-700">{record.entryTime}</td>
                      <td className="p-2 text-purple-700">{record.exitTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
