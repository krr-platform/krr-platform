/* eslint-disable react/button-has-type */
import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import Logo from '@/app/components/logo';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="
                mb-2 flex h-20 items-center justify-center rounded-md
                 bg-gray-50 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <Logo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2
            md:flex-col md:space-x-0 md:space-y-2"
            >
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md
                bg-gray-50 md:block"
                />
                {/* <form>
                    <button className="flex h-[48px] w-full grow items-center
                    justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm
                    font-medium hover:bg-sky-100
                    hover:text-blue-600 md:flex-none md:justify-start
                    md:p-2 md:px-3"
                    >
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form> */}
            </div>
        </div>
    );
}
