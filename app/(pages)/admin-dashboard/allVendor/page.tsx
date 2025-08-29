"use client";
import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Search } from "lucide-react";

const vendors = [
  { name: "Sunil Varma", avatar: "/placeholder.svg" },
  { name: "Ravi Mehta", avatar: "/placeholder.svg" },
  { name: "Karan Singh", avatar: "/placeholder.svg" },
  { name: "Amit Sharma", avatar: "/placeholder.svg" },
  { name: "Deepak Jain", avatar: "/placeholder.svg" },
  { name: "Vikas Gupta", avatar: "/placeholder.svg" },
];

export default function AllVendor() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">All Vendors</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by vendor name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-hostel-gold focus:outline-none"
        />
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <CardContent className="p-6 space-y-4 text-center">
                {/* Avatar */}
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden ring-2 ring-hostel-gold flex items-center justify-center bg-hostel-gold/10">
                  {vendor.avatar ? (
                    <img
                      src={vendor.avatar}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-hostel-gold font-bold">
                      {vendor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

                {/* Vendor Name */}
                <h3 className="font-semibold text-gray-800">{vendor.name}</h3>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full rounded-xl bg-hostel-gold hover:bg-hostel-gold/90 text-white py-2 font-medium transition">
                    View Profile
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No vendors found.</p>
        )}
      </div>
    </div>
  );
}
