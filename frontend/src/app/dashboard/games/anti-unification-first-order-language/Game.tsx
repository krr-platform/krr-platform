/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

interface Question {
    text: string;
    choices: string[];
    correctChoiceIndex: number;
    body?: string;
    imageUrl?: string;
}

const questions: Question[] = [
    {
        text: 'Question 1?',
        choices: ['A', 'B', 'C', 'D'],
        correctChoiceIndex: 0,
    },
    // Add more questions here
];

// eslint-disable-next-line react/function-component-definition
const Game: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showCorrect, setShowCorrect] = useState(false);
    const [showIncorrect, setShowIncorrect] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (selectedChoiceIndex: number) => {
        if (selectedChoiceIndex === currentQuestion.correctChoiceIndex) {
            setScore(score + 10);
            setShowCorrect(true);
        } else {
            setShowIncorrect(true);
        }

        setTimeout(() => {
            setShowCorrect(false);
            setShowIncorrect(false);
            setCurrentQuestionIndex(currentQuestionIndex);
        }, 1500);
    };

    return (
        <div className="rounded-lg w-full p-8 shadow-lg border-2">
            <h1>
                {currentQuestion.text}
            </h1>
            <ul>
                {currentQuestion.choices.map((choice, index) => (
                    <li key={index} onClick={() => handleAnswer(index)}>
                        {choice}
                    </li>
                ))}
            </ul>
            {showCorrect && <div>Correct!</div>}
            {showIncorrect && <div>Incorrect!</div>}
            <div>
                Score:&nbsp;
                {score}
            </div>
        </div>
    );
};

export default Game;
