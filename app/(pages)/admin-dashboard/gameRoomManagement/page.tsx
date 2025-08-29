import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const bookingSchedule = [
  { time: "10:00 AM - 11:00 AM", student: "Arjun Sharma", game: "Table Tennis", status: "Booked" },
  { time: "11:00 AM - 12:00 PM", student: "Vikram Singh", game: "Pool", status: "Available" },
  { time: "12:00 PM - 1:00 PM", student: "Rohan Verma", game: "Foosball", status: "Booked" },
  { time: "1:00 PM - 2:00 PM", student: "Aditya Kapoor", game: "Table Tennis", status: "Available" },
  { time: "2:00 PM - 3:00 PM", student: "Siddharth Patel", game: "Pool", status: "Booked" },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Booked":
      return "bg-red-100 text-red-700 border border-red-300";
    case "Available":
      return "bg-green-100 text-green-700 border border-green-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

export default function GameRoomManagement() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Game Room Management</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Booking Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Student Name</th>
                  <th className="text-left py-3 px-4 font-medium">Game</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingSchedule.map((booking, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-500">{booking.time}</td>
                    <td className="py-3 px-4 font-medium">{booking.student}</td>
                    <td className="py-3 px-4 text-gray-500">{booking.game}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
