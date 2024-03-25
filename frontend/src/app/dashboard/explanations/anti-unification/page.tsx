/* eslint-disable max-len */
import Link from 'next/link';
import React from 'react';

export default function LessonPage() {
    return (
        <div className="max-w-4xl mx-auto">
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

            <div className="justify-around flex">
                <div className="max-w-4xl mx-auto py-5 px-4 ">
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

                <nav className="border-solid w-3/4 sticky top-0 z-50 pl-8">
                    <p className="text-black text-base font-semibold mb-2">Lesson Contents</p>
                    <br />
                    <a className="hover:text-orange-500" href="#introduction">Basics of Anti-Unification</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Definition</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">LGG</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Syntax Trees</a>
                    <br />
                    <br />
                    <a className="hover:text-orange-500" href="#introduction">Examples</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Example 1</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Example 2</a>
                    <br />
                    <br />
                    <a className="hover:text-orange-500" href="#introduction">Applications</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Code Refactoring</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">ILP</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">NLP</a>
                    <br />
                    <br />
                    <a className="hover:text-orange-500" href="#introduction">Algorithms</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Idea</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Basic Algorithm</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Complexity Discussion</a>
                    <br />
                    <a className="hover:text-orange-500 pl-4" href="#example">Optimizations</a>
                    <br />
                    <br />
                    <a className="hover:text-orange-500" href="#introduction">Further Resources</a>
                    <br />
                </nav>
            </div>
        </div>
    );
}
