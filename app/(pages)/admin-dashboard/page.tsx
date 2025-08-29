import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const notifications = [
  {
    type: "SOS",
    message: "Student: Rohan Sharma - Health emergency, needs immediate assistance.",
    date: "2024-07-26 10:30 AM",
    status: "Open"
  },
  {
    type: "Vendor",
    message: "Vendor: Food Supplies Inc. - Delivery scheduled for tomorrow, 8 AM.",
    date: "2024-07-26 09:00 AM",
    status: "Open"
  },
  {
    type: "General",
    message: "General: Hostel meeting scheduled for next week, all students must attend.",
    date: "2024-07-25 05:00 PM",
    status: "Open"
  },
  {
    type: "SOS",
    message: "Student: Vikram Singh - Minor injury, requires first aid.",
    date: "2024-07-25 02:15 PM",
    status: "Open"
  },
  {
    type: "Vendor",
    message: "Vendor: Laundry Services - Laundry pickup scheduled for today, 6 PM.",
    date: "2024-07-25 10:00 AM",
    status: "Open"
  },
  {
    type: "General",
    message: "General: Guest lecture on career guidance, register now.",
    date: "2024-07-24 08:00 PM",
    status: "Open"
  },
  {
    type: "SOS",
    message: "Student: Arjun Verma - Feeling unwell, needs medical attention.",
    date: "2024-07-24 03:45 PM",
    status: "Open"
  },
  {
    type: "Vendor",
    message: "Vendor: Stationery Supplies - New stock arrived, available for purchase.",
    date: "2024-07-24 11:30 AM",
    status: "Open"
  },
  {
    type: "SOS",
    message: "Student: Karan Patel - High fever, requires immediate assistance.",
    date: "2024-07-23 01:20 PM",
    status: "Open"
  }
];

const getTypeStyle = (type: string) => {
  switch (type) {
    case "SOS":
      return "bg-red-100 text-red-700 border border-red-300";
    case "Vendor":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    case "General":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <p className="text-gray-500">
            Manage and view all notifications, including SOS alerts and vendor updates.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Message</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${getTypeStyle(
                          notification.type
                        )}`}
                      >
                        {notification.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <p className="text-sm">{notification.message}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {notification.date}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded-md border border-gray-400 text-gray-600">
                        {notification.status}
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
