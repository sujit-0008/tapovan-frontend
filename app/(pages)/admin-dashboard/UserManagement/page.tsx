
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Search } from "lucide-react";

const users = [
  { name: "Arjun Sharma", role: "Electrician", email: "arjun.sharma@example.com", phone: "+91 9876543210" },
  { name: "Priya Verma", role: "Vendor", email: "priya.verma@example.com", phone: "+91 8765432109" },
  { name: "Dr. Rohan Kapoor", role: "Medical Staff", email: "rohan.kapoor@example.com", phone: "+91 7654321098" },
  { name: "Vikram Singh", role: "Electrician", email: "vikram.singh@example.com", phone: "+91 6543210987" },
  { name: "Anjali Gupta", role: "Vendor", email: "anjali.gupta@example.com", phone: "+91 5432109876" },
  { name: "Dr. Neha Sharma", role: "Medical Staff", email: "neha.sharma@example.com", phone: "+91 4321098765" },
  { name: "Rajat Verma", role: "Electrician", email: "rajat.verma@example.com", phone: "+91 3210987654" },
  { name: "Sunita Kapoor", role: "Vendor", email: "sunita.kapoor@example.com", phone: "+91 2109876543" },
  { name: "Dr. Amit Singh", role: "Medical Staff", email: "amit.singh@example.com", phone: "+91 1098765432" },
  { name: "Divya Gupta", role: "Electrician", email: "divya.gupta@example.com", phone: "+91 9987654321" }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Electrician":
      return "bg-gray-200 text-gray-800";
    case "Vendor":
      return "bg-blue-100 text-blue-700";
    case "Medical Staff":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hostel-gold"
              />
            </div>

            {/* Add button */}
            <button className="px-4 py-2 rounded-md bg-hostel-gold text-white hover:bg-hostel-gold/90 transition">
              Add New User
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-gray-600">{user.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm rounded border border-hostel-gold text-hostel-gold hover:bg-hostel-gold hover:text-white transition">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
                          Delete
                        </button>
                      </div>
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
