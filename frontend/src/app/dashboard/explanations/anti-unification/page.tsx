'use client';

/* eslint-disable max-len */
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

export default function LessonPage() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionRefs = {
        basics: useRef(null),
        examples: useRef(null),
        applications: useRef(null),
        algorithms: useRef(null),
        resources: useRef(null),
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.7 },
        );

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            Object.values(sectionRefs).forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [sectionRefs]);
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

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1" ref={sectionRefs.basics} id="basics">
                                Basics of Anti-Unification
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Definition
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a concept in computational logic and computer science where the aim is to find the simplest or most general form that can represent two or more specific instances. This process involves identifying the common structure shared by the instances while abstracting away the differences. In the context of symbolic expressions or program code, anti-unification helps in determining a general pattern that captures the essence of the instances without the specifics. For example, when applied to programming, anti-unification can be used to detect and abstract common code patterns, facilitating tasks such as code refactoring, clone detection, or even aiding in the understanding of different code bases by highlighting their commonalities. The anti-unifier is the most general expression that can be specialized to produce each of the given expressions through some substitution, serving as a foundational tool in areas like inductive logic programming, where learning from examples is essential, and in various forms of automated reasoning and program analysis.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Least General Generalizations (LGG)
                            </h3>
                            <p className="mb-8">
                                Least general generalization (LGG) is a foundational concept in the field of artificial intelligence and computational logic, particularly in the context of inductive logic programming and generalization processes. It refers to the most specific generalization that captures the essential commonalities of a given set of instances or expressions without introducing extraneous or overly general features. This concept is intricately related to anti-unification, as the process of anti-unification essentially seeks to find this least general generalization among given entities. When you perform anti-unification on a set of expressions or structures, you are trying to identify the LGG that represents their shared patterns or attributes while discarding the unique, instance-specific details. For example, in the realm of programming, applying LGG through anti-unification can reveal the underlying common structure in different pieces of code, potentially aiding in tasks like code refactoring, pattern recognition, and the development of more generalized software frameworks. The utility of LGG spans various domains, offering a systematic approach to extracting and understanding the fundamental similarities across distinct yet related entities, which is pivotal for learning, abstraction, and synthesis in both human and machine cognition.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Syntax Trees
                            </h3>
                            <p className="mb-4">
                                Syntax trees, also known as abstract syntax trees (ASTs), are crucial data structures in computer science used to represent the syntactic structure of code or expressions in a hierarchical tree format. Each node in the tree corresponds to a construct occurring in the source code. For example, in programming, a syntax tree breaks down the code into its constituent parts, like operators, operands, and statements, which are then structured in a tree according to the syntax rules of the language.
                            </p>
                            <p className="mb-4">
                                In the context of anti-unification, syntax trees play a vital role because they provide a concrete way to compare and analyze different pieces of code or expressions structurally. Anti-unification applied to syntax trees involves finding a common template tree that can represent multiple specific syntax trees by abstracting their common structure while omitting the differences.
                            </p>
                            <p className="mb-4">
                                Let us illustrate this with a simple visual example related to arithmetic expressions. Consider two expressions: 3 + 5 and 3 + 9. The syntax trees for these expressions would separately represent the structure of each expression as represented in the following visual. Applying anti-unification to these trees would yield a generalized tree where specific numbers are replaced with placeholders, reflecting the shared structure.
                            </p>
                            <Image className="mb-4" src="/syntax-tree-example.jpeg" alt="Example of Syntax Trees" width="1000" height="100" />
                            <p className="mb-24">
                                This generalized syntax tree represents the common structure of the two original trees: a binary operation (addition) applied to two operands, one of which was always 3. In this generalized form, X serves as a placeholder (variable) that can be substituted with specific values to obtain any of the original expressions. While this example is simplistic, the same principle applies in more complex scenarios, like comparing function structures in code, making syntax trees a powerful tool in understanding and analyzing the commonalities in various codebases or expressions through anti-unification.
                            </p>
                        </div>

                        <div ref={sectionRefs.examples} id="examples">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                Examples
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Example 1: ...
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Example 2: ...
                            </h3>
                            <p className="mb-24">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                        </div>

                        <div ref={sectionRefs.applications} id="applications">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                Applications
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Code Refactoring
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Inductive Language Programming (ILP)
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Natural Language Processing (NLP)
                            </h3>
                            <p className="mb-24">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                        </div>

                        <div ref={sectionRefs.algorithms} id="algorithms">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                Algorithms
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Idea
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Basic Implementation
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Complexity Discussion
                            </h3>
                            <p className="mb-8">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Optimzation
                            </h3>
                            <p className="mb-24">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                        </div>

                        <div ref={sectionRefs.resources} id="resources">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                Further Resources
                            </h2>
                            <p className="mb-24">
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                                Anti-unification is a technique used in a lot of fields
                                in computational logic. In broad terms, anti-unification
                                allows us to find generalizations to symbols or statements,
                                enabling us to abstract the differences between them
                                and emphasize their commonalities.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <nav className="sticky pl-8 z-10 flex-grow w-full top-0">
                        <p className="text-md pb-4 text-gray-700">Lesson Contents</p>
                        <ul>
                            <li className={`border-l-4 pb-1 ${activeSection === 'basics' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#basics">Basics of Anti-unification</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'examples' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#examples">Examples</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'applications' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#applications">Applications</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'algorithms' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#algorithms">Algorithms</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'resources' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#resources">Further Resources</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
