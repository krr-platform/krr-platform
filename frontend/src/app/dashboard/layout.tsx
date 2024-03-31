import React from 'react';
import SideNav from '@/app/components/dashboard/sidenav';
import Footer from '@/app/components/footer';

export default function DashboardLayout({ children }:
    { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex h-screen flex-col md:flex-row  md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex flex-col flex-grow pt-6 md:overflow-y-auto">
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}
