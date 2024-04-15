'use client';

/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import Link from 'next/link';
import { InformationCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import axios from 'axios';

interface Token {
    type: string;
    value: string;
}

interface Result {
    data: string[];
    tokens: Token[][];
}

export default function CalculatorPage() {
    const MIN_STATEMENTS = 2;
    const MAX_STATEMENTS = 5;
    const [inputs, setInputs] = useState(['', '']);
    const [result, setResult] = useState<Result | null>(null);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        e.dataTransfer.setData('text/plain', position.toString());
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>, newPosition: number) => {
        const position = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const updatedInputs = [...inputs];
        const itemDragged = updatedInputs.splice(position, 1)[0];
        updatedInputs.splice(newPosition, 0, itemDragged);
        setInputs(updatedInputs);
    };

    const addInputField = () => {
        if (inputs.length >= MIN_STATEMENTS && inputs.length <= MAX_STATEMENTS - 1) {
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

    const populateField = (idx: number, value: string) => {
        if (idx > -1 && idx < inputs.length) {
            const newInputs = [...inputs];
            newInputs[idx] = value;
            setInputs(newInputs);
        }
    };

    const handleCalculate = async () => {
        try {
            const jsonInputs: string[] = [];
            inputs.forEach((value) => {
                jsonInputs.push(value);
            });
            const response = await axios.post('http://localhost:5000/compute/anti-unification-fol', jsonInputs);
            setResult(response.data);
        } catch (error) {
            console.error('Error during computation', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto flex w-full border-black pt-4">
            <div className="flex">
                <div className="flex flex-col flex-grow w-9/12">
                    <nav className="flex px-4" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <Link
                                    href="/dashboard/calculators"
                                    className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors duration-300"
                                >
                                    Calculators
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
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

                        <div className="rounded-lg w-full p-8 mt-12 shadow-lg border-2">
                            <p className="font-medium text-center mb-4"> Calculate anti-unification to first-order language statements </p>
                            <div className="flex items-center mb-4">
                                <p className="mr-2">Usage</p>
                                <button type="button" aria-label="Usage Help" className="hover:text-blue-500">
                                    <InformationCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="">
                                {inputs.map((input, index) => (
                                    // input container
                                    <div
                                        key={index}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, index)}
                                        onDragOver={(e) => onDragOver(e)}
                                        onDrop={(e) => onDrop(e, index)}
                                        className="flex justify-between"
                                    >
                                        <input
                                            onChange={(event) => populateField(index, event.target.value)}
                                            value={inputs[index]}
                                            placeholder={`Input first-order statement #${index + 1}`}
                                            className="w-10/12 rounded-lg my-2 p-2 border-2 focus:border-blue-300 focus:bg-blue-50 hover:border-blue-300 active:border-blue-300 transition-colors duration-300 focus:outline-none focus:ring-blue-500"
                                        />
                                        <Bars3Icon className="w-7 h-7 my-4 px-1 hover:bg-blue-50 hover:text-blue-500 rounded-full align-middle transition-colors duration-300 cursor-grab active:cursor-grabbing" />
                                        <button type="button" onClick={() => removeInputField(index)} disabled={inputs.length === MIN_STATEMENTS} className="w-7 h-7 my-4 px-1 hover:bg-red-50 hover:text-red-500 rounded-full align-middle transition-colors duration-300 disabled:text-slate-500 disabled:hover:bg-slate-100 disabled:cursor-not-allowed">
                                            <XMarkIcon className="" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button data-tooltip-target="tooltip-default" onClick={addInputField} disabled={!(inputs.length >= MIN_STATEMENTS && inputs.length <= MAX_STATEMENTS - 1)} type="button" className="disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 border-2 border-blue-300 text-blue-500 hover:bg-blue-50 hover:border-blue-500 text-bold font-medium py-2 px-4 my-4 rounded transition-colors duration-300"> Add Statement </button>
                            <div className="flex justify-end items-center">
                                <button type="button" onClick={() => { handleCalculate(); }} className="bg-blue-500 border-2 text-white rounded-lg py-2 px-4 hover:bg-blue-700 mt-2 text-bold font-medium transition-colors duration-300">Calculate</button>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-lg w-full p-8 mt-12 shadow-lg border-2">
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
                                    {result.tokens.map((tokenArray, arrayIndex) => (
                                        <div key={arrayIndex}>
                                            {/* For each token in statement */}
                                            {tokenArray.map((token, tokenIndex) => (
                                                <p key={tokenIndex} style={{ marginLeft: '20px' }}>
                                                    Type:
                                                    {token.type || 'N/A'}
                                                    , Value:
                                                    {token.value || 'N/A'}
                                                </p>
                                            ))}
                                            <p>---</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
