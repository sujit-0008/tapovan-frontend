"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";

export default function Vendor() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    category: "",
    email: "",
    password: "",
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    mobileNo: "",
    whatsappNumber: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-hostel-gold to-hostel-burgundy p-8 rounded-lg text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Vendor Registration</h1>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["firstName", "middleName", "lastName"].map((field, idx) => (
                  <div key={idx} className="space-y-2">
                    <label htmlFor={field} className="block text-sm font-medium">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      id={field}
                      placeholder={`Enter ${field}`}
                      value={(formData as any)[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    />
                  </div>
                ))}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                >
                  <option value="">Select Category</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="food-vendor">Food Vendor</option>
                  <option value="laundry">Laundry Service</option>
                  <option value="medical">Medical Staff</option>
                </select>
              </div>

              {/* Email + Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "email", type: "email", placeholder: "Enter Your Email" },
                  { id: "password", type: "password", placeholder: "Enter Your Password" }
                ].map((input) => (
                  <div key={input.id} className="space-y-2">
                    <label htmlFor={input.id} className="block text-sm font-medium capitalize">
                      {input.id}
                    </label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={(formData as any)[input.id]}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    />
                  </div>
                ))}
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["passportPhoto", "aadharMasked"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="block text-sm font-medium">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      id={field}
                      type="file"
                      accept="image/*"
                      className="w-full cursor-pointer rounded-md border border-input bg-muted/50 file:bg-hostel-gold file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    />
                  </div>
                ))}
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "companyName", label: "Company Name" },
                  { id: "companyAddress", label: "Company Address" },
                  { id: "companyPhone", label: "Company Phone" },
                  { id: "companyEmail", label: "Company Email" },
                  { id: "mobileNo", label: "Mobile No" },
                  { id: "whatsappNumber", label: "WhatsApp Number" },
                  { id:"gstNumber", label:"GST Number" }
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-sm font-medium">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      placeholder={`Enter ${field.label}`}
                      value={(formData as any)[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hostel-gold"
                    />
                  </div>
                ))}
              </div>

              {/* KYC Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["kycBusinessReg", "kycTaxId", "kycAddressProof"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="block text-sm font-medium">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      id={field}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full cursor-pointer rounded-md border border-input bg-muted/50 file:bg-hostel-gold file:text-white file:border-0 file:rounded file:px-3 file:py-1"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-hostel-gold px-8 py-2 font-medium text-white hover:bg-hostel-gold/90 transition"
                >
                  Register
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
