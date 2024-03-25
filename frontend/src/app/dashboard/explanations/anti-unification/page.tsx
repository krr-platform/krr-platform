/* eslint-disable max-len */
import Link from 'next/link';
import React from 'react';

export default function LessonPage() {
    return (
        <div className="max-w-4xl mx-auto flex w-full border-black">
            <div className="flex">
                <div className="flex flex-col flex-grow w-9/12">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/dashboard/explanations"
                                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-orange-500"
                                >
                                    Explanations
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">Anti-Unification</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="mx-auto py-5 px-4">
                        <h1 className="text-3xl font-bold  text-gray-900 mb-2">
                            Anti-Unification
                        </h1>
                        <p className="">
                            The process of constructing a generalization
                            common to two given symbolic expressions.
                        </p>
                        <hr className="border-b border-gray-200 my-6 rounded" />

                        <h2 className="text-xl font-semibold text-gray-900 mb-1" id="introduction">
                            Basics of Anti-Unification
                        </h2>
                        <h3 className="text-l font-medium text-gray-900" id="">
                            Definition of anti-unification
                        </h3>
                        <p className="mb-12">
                            Anti-unification is a technique used in a lot of fields
                            in computational logic. In broad terms, anti-unification
                            allows us to find generalizations to symbols or statements,
                            enabling us to abstract the differences between them
                            and emphasize their commonalities.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mb-1" id="example">
                            Example
                        </h2>
                        <p className="mb-12">
                            Anti-unification is a technique used in a lot of fields
                            in computational logic. In broad terms, anti-unification
                            allows us to find generalizations to symbols or statements,
                            enabling us to abstract the differences between them
                            and emphasize their commonalities.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mb-1" id="example1">
                            Example
                        </h2>
                        <p className="mb-12">
                            Anti-unification is a technique used in a lot of fields
                            in computational logic. In broad terms, anti-unification
                            allows us to find generalizations to symbols or statements,
                            enabling us to abstract the differences between them
                            and emphasize their commonalities.
                        </p>

                        <h2 className="text-xl font-semibold text-gray-900 mb-1" id="example2">
                            Example
                        </h2>
                        <p className="mb-12">
                            Anti-unification is a technique used in a lot of fields
                            in computational logic. In broad terms, anti-unification
                            allows us to find generalizations to symbols or statements,
                            enabling us to abstract the differences between them
                            and emphasize their commonalities.
                        </p>
                    </div>
                </div>
                <div className="">
                    <nav className="sticky pl-8 z-10 flex-grow w-full top-0">
                        <p className="text-md pb-4 text-gray-700">Lesson Contents</p>
                        <ul>
                            <li className="border-l-4 pb-1"><a className="hover:text-orange-500 pl-2 font-light text-sm" href="#introduction">Basics of Anti-unification</a></li>
                            <li className="border-l-4 pb-1"><a className="hover:text-orange-500 pl-2 font-light text-sm" href="#introduction">Examples</a></li>
                            <li className="border-l-4 pb-1"><a className="hover:text-orange-500 pl-2 font-light text-sm" href="#introduction">Applications</a></li>
                            <li className="border-l-4 pb-1"><a className="hover:text-orange-500 pl-2 font-light text-sm" href="#introduction">Algorithms</a></li>
                            <li className="border-l-4 pb-1"><a className="hover:text-orange-500 pl-2 font-light text-sm" href="#introduction">Further Resources</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
