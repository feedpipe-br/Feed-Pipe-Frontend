import type React from "react";
import {DashboardNavbar} from "@/components/dashboard/dashboard-navbar";

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar/>
            {children}
        </div>
    )
}
