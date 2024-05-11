/* eslint-disable max-len */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import questions from './questions.json';

export default function Game() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);
    const [showIncorrect, setShowIncorrect] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (selectedChoiceIndex: number) => {
        if (selectedChoiceIndex === currentQuestion.correctChoiceIndex) {
            setScore(score + 10);
            setShowCorrect(true);
            setTimeout(() => {
                setShowCorrect(false);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 3000);
        } else {
            setShowIncorrect(true);
            setTimeout(() => {
                setShowIncorrect(false);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 3000);
        }
    };

    return (
        <div className="px-4">
            {currentQuestion === undefined
                ? (
                    <div className="rounded-lg w-full p-8 shadow-lg border-2">
                        <p className="text-center font-medium text-xl">
                            Well done, you have achieved a score of&nbsp;
                            {score}
                            !
                        </p>
                        <div className="flex justify-around mt-16">
                            <Link href="/dashboard/games">
                                <button
                                    className="border-2
                              hover:text-blue-500 hover:bg-blue-50
                              hover:border-blue-500 py-2 px-4
                                font-normal rounded-lg
                                transition-colors duration-300 max-w-x"
                                >
                                    Other Games
                                </button>
                            </Link>
                            <button
                                onClick={() => { setCurrentQuestionIndex(0); setScore(0); }}
                                className="bg-blue-500 border-2
                                    text-white rounded-lg py-2 px-4
                                    hover:bg-blue-700 mt-2 text-bold
                                    font-medium transition-colors
                                    duration-300"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg w-full p-8 shadow-lg border-2">
                        <div
                            className="md:grid md:grid-cols-10 border-b-2
                            pb-2 mb-8 flex flex-col-reverse"
                        >
                            <div className="text-center md:col-span-9 ">
                                <h1
                                    className="text-lg font-medium pt-2"
                                >
                                    {currentQuestion.text}
                                </h1>
                                <p className="pt-2 text-lg whitespace-pre-line">
                                    {currentQuestion.body}
                                </p>
                                {currentQuestion.imgURL && (
                                    <Image
                                        className="mx-auto"
                                        width="500"
                                        height="300"
                                        src={`/question${currentQuestion.id + 1}.png`}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div
                                className="text-right mb-4 md:col-span-1
                        flex justify-between md:block"
                            >
                                <div>
                                    Question&nbsp;
                                    {currentQuestion.id + 1}
                                </div>
                                <div>
                                    Score:&nbsp;
                                    {score}
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            {showCorrect && (
                                <span
                                    className="flex items-center justify-center text-lg"
                                >
                                    Correct!
                                    <HandThumbUpIcon
                                        className="w-10 h-10 text-green-500 ml-4"
                                    />
                                </span>
                            )}
                            {showIncorrect && (
                                <span
                                    className="flex items-center justify-center text-lg"
                                >
                                    Incorrect!
                                    <HandThumbDownIcon
                                        className="w-10 h-10 text-red-500 ml-4"
                                    />
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {currentQuestion.choices.map((choice, index) => (
                                <button
                                    className="border-2
                            hover:text-blue-500 hover:bg-blue-50
                            hover:border-blue-500
                            font-normal p-4 rounded-lg
                            transition-colors duration-300 max-w-x
                            disabled:cursor-default disabled:text-slate-500
                            disabled:border-slate-200 disabled:hover:bg-slate-50
                            disabled:hover:border-slate-200"
                                    disabled={showCorrect || showIncorrect}
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
}
