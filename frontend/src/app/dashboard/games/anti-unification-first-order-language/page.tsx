'use client';

import Link from 'next/link';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Game from './Game';

export default function GamePage() {
    return (
        <div className="max-w-4xl mx-auto py-10 pt-4">
            <div className="flex">
                <div className="flex flex-col flex-grow w-9/12">
                    <nav className="flex px-4" aria-label="Breadcrumb">
                        <ol className="
                        inline-flex
                        items-center
                        space-x-1
                        md:space-x-2
                        rtl:space-x-reverse"
                        >
                            <li className="inline-flex items-center">
                                <Link
                                    href="/dashboard/games"
                                    className="
                                    inline-flex
                                    items-center
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    hover:text-orange-500
                                    transition-colors
                                    duration-300"
                                >
                                    Games
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg
                                        className="
                                        rtl:rotate-180
                                        w-3
                                        h-3
                                        text-gray-400
                                        mx-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span
                                        className="
                                        ms-1 text-sm
                                        font-medium
                                        text-gray-500 md:ms-2"
                                    >
                                        Anti-Unification
                                        (First-order Language)
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="py-5 px-4">
                        <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                            Anti-Unification (First-order Language)
                        </h1>
                        <p className="">
                            The process of constructing a generalization
                            common to two given symbolic expressions.
                        </p>
                        <hr className="border-b border-gray-200 my-6 rounded" />
                    </div>
                    <Game />
                </div>
            </div>
        </div>
    );
}
