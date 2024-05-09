/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import questions from './questions.json';

// interface Question {
//     id: number;
//     text: string;
//     choices: string[];
//     correctChoiceIndex: number;
//     body?: string;
//     imageUrl?: string;
// }

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
            }, 1500);
        } else {
            setShowIncorrect(true);
            setTimeout(() => {
                setShowIncorrect(false);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 1500);
        }
    };

    return (
        <div className="px-4">
            <div className="rounded-lg w-full p-8 shadow-lg border-2">
                <div className="text-right">
                    Score:&nbsp;
                    {score}
                </div>
                <h1 className="text-center font-medium text-lg pb-4 mb-8 border-b-2">
                    {currentQuestion.text}
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.choices.map((choice, index) => (
                        <button
                            className="border-2
                            hover:text-blue-500 hover:bg-blue-50
                            hover:border-blue-500 text-bold
                            font-medium p-2 rounded-lg
                            transition-colors duration-300 max-w-x"
                            key={index}
                            onClick={() => handleAnswer(index)}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
                {showCorrect && <div>Correct!</div>}
                {showIncorrect && <div>Incorrect!</div>}
            </div>
        </div>
    );
}
