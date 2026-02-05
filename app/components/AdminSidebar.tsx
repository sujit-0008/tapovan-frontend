"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Utensils,
  Gamepad2,
  Heart,
  Truck,
  Star,
  Calendar,
} from "lucide-react";



export const AdminSidebar = () => {
  const pathname = usePathname();
  const navItems = [
  { path: "/admin-dashboard", label: "Notification", icon: LayoutDashboard },
  { path: "/admin-dashboard/UserManagement", label: "User Management", icon: Users },
  { path: "/admin-dashboard/canteenManagement", label: "Canteen", icon: Utensils },
  //{ path: "/admin-dashboard/gameRoomManagement", label: "Game Room", icon: Gamepad2 },
  { path: "/admin-dashboard/allStudent", label: "All Student", icon: Heart },
  { path: "/admin-dashboard/allVendor", label: "All Vendor", icon: Truck },
  { path: "/admin-dashboard/roomManagement", label: "Room Management", icon: Star },
  { path: "/admin-dashboard/tickets", label: "Tickets", icon: Star },
  { path: "/admin-dashboard/commonMsg", label: "Common Message", icon: Star },
  { path: "/admin-dashboard/leaves", label: "Leave Management", icon: Calendar },
  { path: "/admin-dashboard/payment", label: "Payment Management", icon: Calendar },

];

  return (
    <div className="w-20 md:w-64 bg-[rgba(250, 250, 247, 1)] flex flex-col min-h-screen transition-all duration-300 border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-4 border-b pt-10 border-blue-800">
        <div className="flex items-center justify-center md:justify-start space-x-0 md:space-x-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            
            <Star className="w-5 h-5 text-[#0A3161]" />
        
          </div>
          <span className="hidden md:inline text-black font-semibold text-lg">Admin Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 md:p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex items-center justify-center md:justify-start space-x-0 md:space-x-3 px-3 py-3 rounded-lg text-black transition-all duration-200 ${
                isActive
                  ? 'bg-yellow-500 text-white font-medium'
                  : 'hover:bg-yellow-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
