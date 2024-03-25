import React from 'react';
import SideNav from '@/app/components/dashboard/sidenav';

export default function DashboardLayout({ children }:
    { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex h-screen flex-col md:flex-row  md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}
