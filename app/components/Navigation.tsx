"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import * as authService from "../services/authService";
export const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDashboardInfo = (role?: string) => {
    switch (role) {
      case "STUDENT":
        return { path: "/studentDashboard", label: "Student Dashboard" };
      case "ADMIN":
      case "FACILITY_ADMIN":
        return { path: "/admin-dashboard", label: "Admin Dashboard" };
      case "STAFF":
        return { path: "/staffDashboard", label: "Staff Dashboard" };
      case "PARENT":
        return { path: "/parentDashboard", label: "Parent Dashboard" };
      case "VENDOR":
        return { path: "/vendorDashboard", label: "Vendor Dashboard" };
      case "MEDICAL_VENDOR":
        return { path: "/medicalVendorDashboard", label: "Medical Dashboard" };
      case "FOOD_VENDOR":
        return { path: "/foodVendorDashboard", label: "Food Dashboard" };
      default:
        return { path: "/dashboard", label: "Dashboard" };
    }
  };
  const dashboardInfo = getDashboardInfo(user?.role);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
    logout();
    setIsMenuOpen(false);
    router.push("/login");
  };
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/aboutUs", label: "About" },
    { path: "/studentRegistration", label: "Student Registration" },
    { path: "/contactUs", label: "Contact" },
    { path: "/vendorRegistration", label: "Vendor Registration" },
  ];
  const isActive = (path: string) => pathname === path;
  return (
    <header className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-hostel-gold font-bold text-lg">★</span>
            </div>
            <span className="font-bold text-lg hidden md:block">
              Tapovan Nest Boys Hostel
            </span>
            <span className="font-bold text-lg md:hidden">Tapovan</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive(item.path)
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {mounted && (
              <>
                {!isAuthenticated ? (
                  <Link
                    href="/login"
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      isActive("/login")
                        ? "bg-white/20 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      href={dashboardInfo.path}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        isActive(dashboardInfo.path)
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {dashboardInfo.label}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white/90 hover:bg-white/10 hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            )}
          </nav>
          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className="md:hidden text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isActive(item.path)
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {mounted && (
                <>
                  {!isAuthenticated ? (
                    <Link
                      href="/login"
                      className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        isActive("/login")
                          ? "bg-white/20 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  ) : (
                    <>
                      <Link
                        href={dashboardInfo.path}
                        className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                          isActive(dashboardInfo.path)
                            ? "bg-white/20 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dashboardInfo.label}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-3 rounded-lg transition-all duration-200 font-medium text-white/90 hover:bg-white/10 hover:text-white text-left"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
