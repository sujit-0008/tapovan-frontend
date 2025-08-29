"use client"

import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Search } from "lucide-react";

const students = [
  { name: "Sunil Varma", avatar: "/placeholder.svg" },
  { name: "Aman Gupta", avatar: "/placeholder.svg" },
  { name: "Rohit Sharma", avatar: "/placeholder.svg" },
  { name: "Karan Mehta", avatar: "/placeholder.svg" },
  { name: "Siddharth Jain", avatar: "/placeholder.svg" },
  { name: "Arjun Kapoor", avatar: "/placeholder.svg" },
];

export default function AllStudent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Students</h1>
      </div>

      {/* Search Box */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by student name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
        />
      </div>

      {/* Student Cards */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <CardContent className="p-6 space-y-4 text-center">
                {/* Avatar */}
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden ring-2 ring-hostel-gold flex items-center justify-center bg-hostel-gold/10">
                  {student.avatar ? (
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-hostel-gold font-bold">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-800">{student.name}</h3>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white py-2 font-medium transition">
                    View Profile
                  </button>
                  <button className="w-full rounded-xl border border-hostel-gold text-hostel-gold hover:bg-hostel-gold hover:text-white py-2 font-medium transition">
                    Update Payment
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center mt-6">
          No students found.
        </p>
      )}
    </div>
  );
}
