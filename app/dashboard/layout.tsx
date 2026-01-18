"use client"

import React from "react";
import {DashboardNavbar} from "@/components/dashboard/dashboard-navbar";
import {ProfileProvider} from "@/contexts/profile";


export default function DashboardLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ProfileProvider>
            <div className="min-h-screen bg-background">
                <DashboardNavbar/>
                {children}
            </div>
        </ProfileProvider>
    )
}
