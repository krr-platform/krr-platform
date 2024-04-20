'use client';

/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import Link from 'next/link';
import { InformationCircleIcon, Bars3Icon, XMarkIcon }
    from '@heroicons/react/24/outline';
import React, { useState, useRef, Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';
import computeAntiUnificationFOL from '../../../../../pages/api/AntiUnificationFOLCalculator';
import Token from '../../../../../lib/Token';
import TreeNode from '../../../../../lib/TreeNode';
import { getDisplayValue } from '../../../../../lib/CalculatorUtils';
import TreeVisualizer from '@/app/components/dashboard/tree-visualizer';

interface Result {
    data: string[];
    tokens: Token[][];
    trees: TreeNode[];
    generalization: TreeNode;
}

function renderNode(node: TreeNode): React.ReactNode {
    if (!node || !node.type) {
        return null;
    }

    if (!node.children || node.children.length === 0) {
        return <span>{node.value}</span>;
    }

    return (
        <span>
            {getDisplayValue(node)}
            (
            {node.children && node.children.map((child, index) => (
                <React.Fragment key={index}>
                    {renderNode(child)}
                    {index !== node.children!.length - 1 && ', '}
                </React.Fragment>
            ))}
            )
        </span>
    );
}

export default function CalculatorPage() {
    const MIN_STATEMENTS = 2;
    const MAX_STATEMENTS = 5;
    const [inputs, setInputs] = useState(['', '']);
    const [result, setResult] = useState<Result | null>(null);
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    const onDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        position: number,
    ) => {
        e.dataTransfer.setData('text/plain', position.toString());
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (
        e: React.DragEvent<HTMLDivElement>,
        newPosition: number,
    ) => {
        const position = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const updatedInputs = [...inputs];
        const itemDragged = updatedInputs.splice(position, 1)[0];
        updatedInputs.splice(newPosition, 0, itemDragged);
        setInputs(updatedInputs);
    };

    const addInputField = () => {
        if (inputs.length >= MIN_STATEMENTS
            && inputs.length <= MAX_STATEMENTS - 1) {
            setInputs([...inputs, '']);
        }
    };

    const removeInputField = (idx: number) => {
        if (idx > 0 && idx < inputs.length) {
            setInputs([
                ...inputs.slice(0, idx),
                ...inputs.slice(idx + 1),
            ]);
        }
        if (idx === 0 && inputs.length > MIN_STATEMENTS) {
            setInputs([...inputs.slice(1)]);
        }
    };

    const transformInput = (input: string) => input.replace(/\\and/g, '∧')
        .replace(/\\or/g, '∨')
        .replace(/\\not/g, '¬')
        .replace(/\\equals/g, '↔')
        .replace(/\\implies/g, '→')
        .replace(/\\forall/g, '∀')
        .replace(/\\exists/g, '∃');

    const populateField = (idx: number, value: string) => {
        if (idx > -1 && idx < inputs.length) {
            const newInputs = [...inputs];
            newInputs[idx] = value;
            newInputs[idx] = transformInput(value);
            setInputs(newInputs);
        }
    };

    const handleCalculate = async () => {
        try {
            const jsonInputs: string[] = [];
            for (let idx = 0; idx < inputs.length; idx += 1) {
                const value = inputs[idx];
                if (value === '') {
                    toast.error(`Input #${idx + 1} is empty.`);
                    return;
                }
                jsonInputs.push(value);
            }
            setResult(computeAntiUnificationFOL(jsonInputs));
        } catch (error) { // Mark error as unknown type
            // First check if error is an instance of AxiosError
            // if (axios.isAxiosError(error)) {
            // Check if error has a response with the data property and errors array

            // if (error.response && error.response.data && 'errors' in error.response.data) {
            //     // Safely access the errors array and message
            //     const { errors } = error.response.data;
            //     if (errors.length > 0 && errors[0].message) {
            //         toast.error(errors[0].message);
            //     } else {
            //         toast.error('Error during computation.');
            //     }
            // } else {
            //     // Handle cases where the error format is not as expected
            //     toast.error('Unexpected error format from server.');
            // }

            // } else {
            // Handle non-Axios errors (could be network issues, or other unexpected errors)
            // toast.error('Network or unknown error occurred.');
            // }
        }
    };

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
                                    href="/dashboard/calculators"
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
                                    Calculators
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

                        <div className="
                        rounded-lg
                        w-full p-8
                        mt-12
                        shadow-lg
                        border-2"
                        >
                            <div className="flex items-center mb-4 justify-between">
                                <p className="font-medium text-center">
                                    Calculate anti-unification to first-order
                                    language statements
                                </p>
                                <button
                                    type="button"
                                    className="border-2 border-transparent
                                    text-blue-500 hover:bg-blue-50
                                    hover:border-blue-500 text-bold
                                    font-medium p-2 rounded-lg
                                    transition-colors duration-300"
                                    onClick={() => { setOpen(true); }}
                                >
                                    <div className="flex items-center">
                                        <InformationCircleIcon
                                            className="w-5 h-5"
                                        />
                                        <p className="ml-2">Usage</p>
                                    </div>
                                </button>
                            </div>
                            <div className="flex items-center mb-4 justify-end">
                                <Transition.Root show={open} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                >
                                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <InformationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                                                                </div>
                                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                        Calculator Usage
                                                                    </Dialog.Title>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-900">
                                                                            You can input from 2 to 5 first-order logic statements.
                                                                        </p>
                                                                        <br />
                                                                        <p className="text-sm font-medium text-gray-950">
                                                                            Regular inputs:
                                                                        </p>
                                                                        <ul className="text-sm text-gray-900">
                                                                            <li>Variables: lower-case letters, might be followed by numbers </li>
                                                                            <li>Constants: upper-case letters, might be followed by numbers </li>
                                                                            <li>Functions: lower-case letters, might be followed by numbers, must be followed by a parentheses </li>
                                                                            <li>Predicates: upper-case letters, might be followed by numbers, must be followed by a parentheses </li>
                                                                        </ul>
                                                                        <br />
                                                                        <p className="text-sm font-medium text-gray-950">
                                                                            Special inputs:
                                                                        </p>
                                                                        <ul className="text-sm text-gray-900">
                                                                            <li>Universal quantifier: \forall </li>
                                                                            <li>Existential quantifier: \exists </li>
                                                                            <li>Logical Implication: \implies </li>
                                                                            <li>Logical Equivalence: \equals </li>
                                                                            <li>Logical Disjunction: \or </li>
                                                                            <li>Logical Conjunction: \and </li>
                                                                            <li>Logical Negation: \not </li>
                                                                            <li>Grouping: use square brackets [ ]</li>
                                                                        </ul>
                                                                        <br />
                                                                        <p className="text-sm font-medium text-gray-950">
                                                                            Example:
                                                                        </p>
                                                                        <p className="text-sm text-gray-900">
                                                                            ∀ var5 [ function1(var5) ∧ PREDICATE99(var5, CONST101) ]
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="button"
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                onClick={() => setOpen(false)}
                                                                ref={cancelButtonRef}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition.Root>
                            </div>
                            <div className="">
                                {inputs.map((input, index) => (
                                    <div
                                        key={index}
                                        draggable
                                        onDragStart={
                                            (e) => onDragStart(e, index)
                                        }
                                        onDragOver={(e) => onDragOver(e)}
                                        onDrop={(e) => onDrop(e, index)}
                                        className="flex justify-between"
                                    >
                                        <input
                                            onChange={
                                                (event) => populateField(
                                                    index,
                                                    event.target.value,
                                                )
                                            }
                                            value={inputs[index]}
                                            placeholder={
                                                'Input first-order'
                                                + `statement #${index + 1}`
                                            }
                                            className="
                                            w-10/12 rounded-lg my-2 p-2
                                            border-2 focus:border-blue-300
                                            focus:bg-blue-50
                                            hover:border-blue-300
                                            active:border-blue-300
                                            transition-colors duration-300
                                            focus:outline-none
                                            focus:ring-blue-500"
                                        />
                                        <Bars3Icon
                                            className="
                                            w-7 h-7 my-4 px-1 hover:bg-blue-50
                                            hover:text-blue-500 rounded-full
                                            align-middle transition-colors
                                            duration-300 cursor-grab
                                            active:cursor-grabbing"
                                        />
                                        <button
                                            type="button"
                                            onClick={
                                                () => removeInputField(index)
                                            }
                                            disabled={
                                                inputs.length === MIN_STATEMENTS
                                            }
                                            className="w-7 h-7 my-4 px-1
                                            hover:bg-red-50 hover:text-red-500
                                            rounded-full align-middle
                                            transition-colors duration-300
                                            disabled:text-slate-500
                                            disabled:hover:bg-slate-100
                                            disabled:cursor-not-allowed"
                                        >
                                            <XMarkIcon className="" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    data-tooltip-target="tooltip-default"
                                    onClick={addInputField}
                                    disabled={!(inputs.length >= MIN_STATEMENTS
                                        && inputs.length <= MAX_STATEMENTS - 1)}
                                    type="button"
                                    className="disabled:border-slate-200
                                disabled:bg-slate-50 disabled:text-slate-500
                                border-2 border-blue-300 text-blue-500
                                hover:bg-blue-50 hover:border-blue-500
                                text-bold font-medium py-2 px-4 my-4 rounded
                                transition-colors duration-300"
                                >
                                    Add Statement
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { handleCalculate(); }}
                                    className="bg-blue-500 border-2
                                    text-white rounded-lg py-2 px-4
                                    hover:bg-blue-700 mt-2 text-bold
                                    font-medium transition-colors
                                    duration-300"
                                >
                                    Calculate
                                </button>
                            </div>
                        </div>
                        {result && (
                            <div className="bg-orange-50 rounded-lg
                            w-full p-8 mt-12 shadow-lg border-2"
                            >
                                {result?.generalization && (
                                    <div>
                                        <div>
                                            <h2>Generalization:</h2>
                                            <p>
                                                {renderNode(result.generalization)}
                                            </p>
                                            <br />
                                        </div>
                                        <TreeVisualizer />
                                        <br />
                                    </div>
                                )}
                                {result?.data && (
                                    <div>
                                        <h2>Data:</h2>
                                        {result.data.map((item, idx) => (
                                            <p key={idx}>{item}</p>
                                        ))}
                                    </div>
                                )}
                                {result?.tokens && (
                                    <div>
                                        <h2>Tokens:</h2>
                                        {/* For each statement */}
                                        {result.tokens.map((
                                            tokenArray,
                                            arrayIndex,
                                        ) => (
                                            <div key={arrayIndex}>
                                                {/* For each token in statement */}
                                                {tokenArray.map((
                                                    token,
                                                    tokenIndex,
                                                ) => (
                                                    <p
                                                        key={tokenIndex}
                                                        style={
                                                            { marginLeft: '20px' }
                                                        }
                                                    >
                                                        {`Type: ${token.type}`}
                                                        {token.value ? `, Value: ${token.value}` : ''}
                                                    </p>
                                                ))}
                                                <p>---</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {result?.trees && (
                                    <div>
                                        <h2>trees:</h2>
                                        {result.trees.map((
                                            treeNode,
                                            treeNodeIndex,
                                        ) => (
                                            <div key={treeNodeIndex}>
                                                <p
                                                    key={treeNodeIndex}
                                                    style={{ marginLeft: '20px' }}
                                                >
                                                    {renderNode(treeNode)}
                                                </p>
                                                <p
                                                    style={{ marginLeft: '20px' }}
                                                >
                                                    ---
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
