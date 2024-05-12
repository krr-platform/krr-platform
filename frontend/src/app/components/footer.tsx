/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Logo from '@/../public/favicon.ico';

export default function Footer() {
    return (
        <footer className="bg-gray-50 text-slate-900 rounded-lg shadow m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link
                        className="flex items-center mb-4 sm:mb-0 space-x-3"
                        href="/"
                    >
                        <Image width="50" height="50" layout="fixed" src={Logo} alt="Flowbite Logo" />
                        <span className="self-center text-l font-semibold whitespace-nowrap">KRR Platform</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <a href="/about" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline me-4 md:me-6">Contact</a>
                        </li>
                        <li>
                            <a href="https://github.com/krr-platform" target="_blank" className="hover:underline flex align-middle me-4 md:me-6">
                                Documentation
                                <ArrowTopRightOnSquareIcon className="h-4 ml-1" />
                            </a>
                        </li>
                        {/* <li>
                            <a href="https://github.com/krr-platform" target="_blank" className="hover:underline flex align-middle">
                                GitHub
                                <ArrowTopRightOnSquareIcon className="h-4 ml-1" />
                            </a>
                        </li> */}
                    </ul>
                </div>
                <hr className="my-2 border-gray-200 sm:mx-auto lg:my-2" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © 2024 KRR Platform. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}
