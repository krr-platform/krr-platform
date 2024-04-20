'use client';

/* eslint-disable max-len */
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';

export default function LessonPage() {
    // const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const sectionRefs = {
        basics: useRef(null),
        examples: useRef(null),
        applications: useRef(null),
        algorithm: useRef(null),
        resources: useRef(null),
    };

    // const handleScroll = () => {
    //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     const scrollBottom = (document.documentElement.scrollHeight || document.body.scrollHeight);
    //     const scrollPercent = (scrollTop / scrollBottom) * 100;
    //     // const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    //     // const currentScroll = window.scrollY;
    //     // const newProgress = (currentScroll / totalScroll) * 100;
    //     setProgress(scrollPercent);
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

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
        <div className="max-w-4xl mx-auto flex w-full border-black pt-4">
            <div className="flex">
                <div className="flex flex-col flex-grow w-9/12">
                    {/* <div className="sticky z-10 flex-grow w-full top-0 bg-white"> */}
                    <div>
                        {/* <progress className="progress w-full mb-4 progress-secondary" value={progress} max="100" /> */}
                        <nav className="flex px-4" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                <li className="inline-flex items-center">
                                    <Link
                                        href="/dashboard/explanations"
                                        className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors duration-300"
                                    >
                                        Explanations
                                    </Link>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">Anti-Unification</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
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
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 scroll-mt-12" ref={sectionRefs.basics} id="basics">
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

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 scroll-mt-12" ref={sectionRefs.examples} id="examples">
                                Examples
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Example 1: Anti-unification in Arithmetic Expressions
                            </h3>
                            <p className="mb-8">
                                Problem Statement: Find the least general generalization (LGG) of the following two arithmetic expressions:
                            </p>
                            <ol className="mb-8">
                                <li className="text-center italic text-lg text-blue-500">3x+5</li>
                                <li className="text-center italic text-lg text-blue-500">3y+5</li>
                            </ol>
                            <p className="mb-8"> Solution: Both expressions share a similar structure: they are sums of a product of 3 and a variable, and the number 5. The difference lies in the variables used (x and y). Anti-unification seeks the most specific structure that captures the similarities and abstracts the differences.</p>
                            <p className="mb-8">In this case, the LGG would abstract the variable part since it is the only difference between the two expressions. You can represent the variable part by a placeholder, say v, to indicate it can be any variable. Thus, the LGG of these two expressions is:</p>
                            <p className="mb-8 text-center italic text-lg text-orange-500">3v+5</p>
                            <p className="mb-8">Explanation: The LGG 3v+5 represents a pattern that both expressions match when v is instantiated to x for the first expression and y for the second expression. The constant 3 and 5 are retained as they are common to both expressions.</p>
                            <h3 className="text-l font-medium text-gray-900">
                                Example 2: Anti-unification in code
                            </h3>
                            <p className="mb-8">Problem Statement: Consider the following two pseudocode snippets: </p>
                            <div className="flex justify-center mb-8">
                                <div className="self-center">
                                    <pre className="text-left m-0 text-blue-500">
                                        <code>
                                            {`if (userInput > 0) {
  print("Positive")
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                            <div className="flex justify-center mb-8">
                                <div className="self-center">
                                    <pre className="text-left m-0 text-blue-500">
                                        <code>
                                            {`if (userInput < 0) {
  print("Negative")
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                            <p className="mb-8">Solution: Both code snippets have an if condition followed by a print statement. The difference lies in the condition checked within the if statement and the string printed. Anti-unification would abstract the condition and the message into placeholders. The LGG of these snippets would be: </p>
                            <div className="flex justify-center mb-8">
                                <div className="self-center">
                                    <pre className="text-left m-0 text-orange-500">
                                        <code>
                                            {`if (userInput OPERATOR 0) {
  print(MESSAGE)
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                            <p className="mb-24">
                                Explanation: Here, operator and message are placeholders. The LGG abstracts the specific operators (
                                {'>'}
                                ,
                                {' <'}
                                ) and the specific messages (Positive, Negative) into these placeholders. This generalized form captures the structure common to both snippets: an if statement comparing userInput with 0 and printing a message.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 scroll-mt-12" ref={sectionRefs.applications} id="applications">
                                Applications
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Code Refactoring
                            </h3>
                            <p className="mb-8">
                                Anti-unification plays a pivotal role in the realm of code refactoring by enabling the systematic identification of common patterns across different code segments. In the process of refactoring, developers aim to simplify and improve the internal structure of code without altering its external behavior. Anti-unification aids this process by identifying structural similarities within disparate code blocks, highlighting recurring patterns that might not be immediately apparent. For instance, if two or more functions across a codebase share a similar sequence of operations but differ in specific variables or function calls, anti-unification can abstract these sequences into a generalized form. This abstraction then serves as a guide for creating more generic functions or classes, thereby reducing code redundancy and improving modularity. The essence of using anti-unification in refactoring lies in its ability to abstract and generalize, transforming specific instances of code into broader templates. Such generalized templates can lead to the development of higher-order functions or polymorphic classes, significantly enhancing code maintainability, readability, and testability. By systematically identifying and abstracting common coding patterns, anti-unification contributes to more efficient, clean, and reusable code architectures, aligning perfectly with the objectives of refactoring.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Inductive Language Programming (ILP)
                            </h3>
                            <p className="mb-8">
                                Inductive Logic Programming (ILP), a subfield of machine learning, stands at the confluence of logic programming and inductive learning, offering a powerful framework for learning programs from examples and background knowledge. At its core, ILP leverages the principles of logic programming to induce hypotheses or rules from observed examples, effectively synthesizing logic programs that generalize the input data. This approach allows for the creation of models that can predict unseen instances, making it particularly valuable in domains where understanding the underlying logic of data is crucial, such as bioinformatics, natural language processing, and knowledge discovery in databases.

                                The process of ILP involves searching through a hypothesis space to find a logic program that fits the given examples under the constraints of the background knowledge. Anti-unification plays a critical role in this process, enabling the generalization of specific observed instances into broader rules. By finding the least general generalizations of example pairs, ILP can abstract patterns and regularities from data, encapsulating them in symbolic rules that are interpretable and can be directly executed or queried. This ability to generate explanatory models that not only predict but also provide insights into the logic of the decision-making process distinguishes ILP from many other machine learning paradigms, offering a transparent and theoretically grounded approach to learning from data. Through its integration of logical inference and learning, ILP facilitates a deep interaction between deductive and inductive reasoning, paving the way for advances in artificial intelligence that are both powerful and interpretable.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Natural Language Processing (NLP)
                            </h3>
                            <p className="mb-24">
                                Anti-unification holds significant potential in the field of Natural Language Processing (NLP), where it can be harnessed to identify and generalize linguistic patterns from diverse language data. NLP, a domain at the intersection of computer science, artificial intelligence, and linguistics, aims to enable computers to understand, interpret, and generate human language in a way that is both meaningful and contextually appropriate. Anti-unification contributes to this goal by facilitating the abstraction of common structures from different language expressions, enhancing the ability of the machine to understand the inherent variability and complexity of the language. In NLP, anti-unification can be used to generalize over various syntactic or semantic structures found in language data. For instance, when analyzing sentences or phrases, anti-unification can help identify common grammatical patterns or structures across different language expressions, despite their superficial dissimilarities. This capability is particularly valuable in tasks like machine translation, information extraction, and semantic analysis, where understanding the underlying patterns in language data is crucial. By abstracting a generalized form from specific instances of text, anti-unification enables the development of more robust language models that can effectively deal with the nuances and variations inherent in human language. For example, in semantic parsing, anti-unification can help in deriving a generalized representation of sentences that express similar meanings but are phrased differently. Similarly, in the context of dialog systems or chatbots, anti-unification can aid in identifying the underlying intent of user inputs that vary in phrasing but convey the same underlying message, thereby improving the response accuracy of the system. Overall, the application of anti-unification in NLP serves to deepen the understanding of language patterns, supporting the development of systems that can interact with humans more naturally and effectively, and enhancing the ability of machines to process and generate language in a way that is contextually and semantically coherent.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 scroll-mt-12" ref={sectionRefs.algorithm} id="algorithm">
                                Algorithm
                            </h2>
                            <h3 className="text-l font-medium text-gray-900">
                                Idea
                            </h3>
                            <p className="mb-8">
                                If one aims to build an anti-unification algorithm, the foundational idea would be to create a method that identifies the most specific generalization (least general generalizer or LGG) between two or more structures, typically abstract syntax trees in the context of programming or parse trees in natural language processing. The algorithm would analyze these structures to find their highest common abstraction without losing the details that make each instance unique. This involves traversing the given trees or structures, comparing corresponding nodes, and determining the most specific pattern that can represent all instances. For differing nodes, the algorithm introduces variables or placeholders, maintaining the common structure while abstracting the differences. The process is recursive and systematic, ensuring that the resulting generalization captures the shared essence of all inputs. In practice, this would involve detailed comparisons at each node or structural level, creating a new generalized structure where similarities are preserved, and differences are parameterized. Such an algorithm can be immensely useful in various domains, including program analysis, machine learning, and semantic analysis, where identifying underlying patterns and regularities is crucial.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Basic Implementation
                            </h3>
                            <p className="mb-8">
                                Implementing a basic anti-unification algorithm typically involves a recursive approach that traverses two given trees (or other hierarchical structures) and constructs their least general generalization (LGG). At each step, the algorithm compares corresponding nodes from both trees. If the nodes are identical, they become part of the LGG directly. In contrast, if the nodes differ, the algorithm introduces a variable or placeholder to represent this divergence in the generalized structure. The recursion continues down the trees, comparing children nodes and either copying them to the LGG or abstracting them as variables, until all nodes have been processed. The end result is a new tree structure that represents the highest level of abstraction common to the input structures, encapsulating the similarities and abstracting the differences. This generalized structure can then be used for further analysis or as a template for recognizing or generating similar structures. The implementation detail includes efficient tree traversal, comparison mechanisms, and an effective way to represent variables or placeholders that capture the divergences between the compared entities.
                            </p>
                            <h3 className="text-l font-medium text-gray-900">
                                Complexity Discussion
                            </h3>
                            <p className="mb-24">
                                The complexity of an anti-unification algorithm is primarily influenced by the structures it analyzes and the depth of the recursion needed to find the least general generalization. For tree structures, such as syntax trees in programming or parse trees in natural language processing, the complexity can be broadly considered in terms of the number of nodes and the depth of the trees. The algorithm must visit each node potentially multiple times, once for each level of recursion as it compares and generalizes corresponding nodes across the structures. Thus, if the trees have a maximum depth (d) and there are (n) nodes in total, the computational complexity is often represented as (O(nd)), assuming each node is visited a constant number of times per level of depth. However, this can vary significantly based on the specific implementation details and the nature of the structures being generalized. For instance, highly imbalanced trees or those with a large number of similar subtrees could affect the performance. Additionally, the process of matching and replacing nodes to form the generalization introduces overhead, especially if the matching criteria are complex or if the structures have many commonalities at different levels, requiring intricate comparisons and substitutions.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 scroll-mt-12" ref={sectionRefs.resources} id="resources">
                                Further Resources
                            </h2>
                            <p className="mb-8">
                                Exploring anti-unification further can deepen your understanding and offer insights into its applications and theoretical foundations. Below are various resources, including scientific papers, online blogs, books, and videos, that you can access to learn more about anti-unification:
                            </p>
                            <ul className="mb-24">
                                <li className="mb-8">
                                    <p>Scientific Papers</p>
                                    <ul className="pl-4 list-disc">
                                        <li>
                                            <span className="italic">Generalization and Anti-Unification in the Sciences </span>
                                            - This scholarly article provides a deep dive into the concepts of generalization and anti-unification, emphasizing their roles in scientific research.
                                        </li>
                                        <li>
                                            <span className="italic">A Survey of Anti-unification </span>
                                            - A comprehensive review that explores different aspects and applications of anti-unification across various fields.
                                        </li>
                                    </ul>
                                </li>
                                <li className="mb-8">
                                    <p>Books</p>
                                    <ul className="pl-4 list-disc">
                                        <li>
                                            <span className="italic">Term Rewriting and All That</span>
                                            by Franz Baader and Tobias Nipkow - This book offers a chapter dedicated to unification and anti-unification, providing a solid theoretical foundation along with practical examples.
                                        </li>
                                        <li>
                                            <span className="italic">Inductive Logic Programming: Theory and Methods </span>
                                            - Although focused on ILP, this book delves into anti-unification as a fundamental concept in inductive logic programming, illustrating its significance in the field.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <nav className="sticky pl-8 z-10 flex-grow w-full top-0">
                        <p className="text-md pb-4 text-gray-700">Lesson Contents</p>
                        <ul>
                            <li className={`border-l-4 pb-1 ${activeSection === 'basics' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#basics">Basics of Anti-unification</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'examples' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#examples">Examples</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'applications' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#applications">Applications</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'algorithm' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#algorithm">Algorithm</a></li>
                            <li className={`border-l-4 pb-1 ${activeSection === 'resources' ? 'border-orange-500 bg-orange-50' : ''}`}><a className="pl-2 font-light text-sm" href="#resources">Further Resources</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
