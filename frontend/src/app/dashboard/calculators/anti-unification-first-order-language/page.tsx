'use client';

/* eslint-disable max-len */
import Link from 'next/link';

export default function LessonPage() {
    return (
        <div className="max-w-4xl mx-auto flex w-full border-black">
            <div className="flex">
                <div className="flex flex-col flex-grow w-9/12">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/dashboard/calculators"
                                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-orange-500"
                                >
                                    Calculators
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">Anti-Unification (First-order Language)</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="mx-auto py-5 px-4">
                        <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                            Anti-Unification (First-order Language)
                        </h1>
                        <p className="">
                            The process of constructing a generalization
                            common to two given symbolic expressions.
                        </p>
                        <hr className="border-b border-gray-200 my-6 rounded" />

                        <div className="bg-blue-50 rounded-lg w-full p-8 mt-12">
                            <p> Input goes here </p>
                            <p> Input goes here </p>
                            <p> Input goes here </p>
                            <p> Input goes here </p>
                        </div>

                        <div className="bg-orange-50 rounded-lg w-full p-8 mt-12">
                            <p> Output goes here </p>
                            <p> Output goes here </p>
                            <p> Output goes here </p>
                            <p> Output goes here </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
