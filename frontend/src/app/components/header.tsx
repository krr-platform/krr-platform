'use client';

/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/../public/favicon.ico';
import mobileLogoImage from '@/../public/logo-mobile-transparent.png';

const navigation = [
    { name: 'Explanations', href: 'dashboard/explanations' },
    { name: 'Games', href: 'dashboard/games' },
    { name: 'Calculators', href: 'dashboard/calculators' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                className="flex items-center justify-between
                        p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">KRR Platform</span>
                        {mobileMenuOpen ? <></> : (
                            <Image
                                className="h-16 w-auto"
                                src={logoImage}
                                alt=""
                                width={50}
                                height={50}
                            />
                        )}
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center
                                justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {mobileMenuOpen ? <></> : (
                            <Bars3Icon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        )}
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6
                                    text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div
                    className="fixed inset-0 z-50"
                />
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full
                             overflow-y-auto bg-white px-6 py-6 sm:max-w-sm
                              sm:ring-1 sm:ring-gray-900/10"
                >
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">
                                KRR Platform
                            </span>
                            <Image
                                className="h-8 w-auto"
                                src={mobileLogoImage}
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5
                                     text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            {mobileMenuOpen
                                ? (
                                    <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                ) : <></>}
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y
                                 divide-gray-500/10"
                        >
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block
                                                rounded-lg px-3 py-2
                                                text-base font-semibold
                                                leading-7 text-gray-900
                                                 hover:bg-gray-50 transition-colors duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
