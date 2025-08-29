
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
          <AdminSidebar />
          <main className="flex-1 bg-background">{children}</main>
        </div>

      </body>
    </html>
  );
}