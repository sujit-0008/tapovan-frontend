"use client"
import { Card, CardContent } from "../../components/ui/card";
import { Search } from "lucide-react";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-background">
   
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Student"
              className="w-full pl-10 py-3 px-4 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
            />
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="flex justify-center">
          <Card className="w-80 bg-muted/20 shadow-md">
            <CardContent className="p-8 text-center">
              {/* Avatar */}
              <div className="h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden bg-hostel-gold flex items-center justify-center text-white text-lg font-bold">
                SV
              </div>

              <h3 className="text-xl font-semibold mb-6">Sunil Varma</h3>

              {/* Buttons */}
              <div className="space-y-3">
                <button className="w-full py-2 rounded-lg bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition">
                  View Profile
                </button>

                <button className="w-full py-2 rounded-lg bg-hostel-gold hover:bg-hostel-gold/90 text-white font-medium transition">
                  Add Checkup
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
