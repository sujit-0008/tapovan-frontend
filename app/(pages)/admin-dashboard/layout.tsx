
import React from "react";
import { AdminSidebar } from "@/app/components/AdminSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
       <div className="min-h-screen flex">
          <div className="sticky"> <AdminSidebar /></div>
           <main className="w-full max-h-screen  overflow-auto">{children}</main>
        </div>

      </body>
    </html>
  );
}