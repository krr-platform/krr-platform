import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import SideNav from '@/app/components/dashboard/sidenav';
import Footer from '@/app/components/footer';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({ children }:
    { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="
            flex flex-col flex-grow
            pt-6 md:overflow-y-auto scroll-smooth"
            >
                <div className="flex-1">
                    {children}
                </div>
                <Footer />
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />
            </div>
        </div>
    );
}
