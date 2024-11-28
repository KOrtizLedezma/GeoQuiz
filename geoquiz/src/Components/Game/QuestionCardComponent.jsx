import React from 'react';
import '../../Styles/GameStyles/Game.css';

const QuestionCardComponent = ({ 
    question, 
    answers, 
    selectedAnswer, 
    onAnswerSelect, 
    showAnswer 
}) => {
    return (
        <div className="question-card">
            <h2 className="question-text">{question.question}</h2>
            
            <div className="answer-container">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerSelect(answer)}
                        disabled={selectedAnswer !== null}
                        className={`answer-button ${
                            selectedAnswer === answer 
                                ? answer === question.correctAnswer
                                    ? 'correct'
                                    : 'incorrect'
                                : ''
                        }`}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            {showAnswer && (
                <div className="feedback-message">
                    <p>Correct answer: {question.correctAnswer}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionCardComponent;