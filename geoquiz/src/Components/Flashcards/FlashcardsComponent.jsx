import React from 'react';
import "../../Styles/FlashcardsStyles/FlashcardsComponentStyles.css";
import FlashcardContainer from './FlashcardContainer';

function FlashcardsComponent({ component }) {

    const flashcards = [
        {
          question: "What is the capital of France?",
          answer: "Paris",
          hint: "It's known as the city of lights."
        },
        {
          question: "Which planet is known as the Red Planet?",
          answer: "Mars",
          hint: "This planet is the fourth from the Sun."
        },
        {
          question: "What is the largest ocean on Earth?",
          answer: "Pacific Ocean",
          hint: "It covers more than 60 million square miles."
        },
        {
          question: "What is the tallest mountain in the world?",
          answer: "Mount Everest",
          hint: "It is located in the Himalayas."
        },
        {
          question: "Who wrote 'Romeo and Juliet'?",
          answer: "William Shakespeare",
          hint: "He is often called the Bard of Avon."
        }
      ];
      
    return (
        <div className='flashcard-container'>
          {component === null ? (
            <p className='null-component-message'>Pick or Create a new Collection</p>
            ) : (
            <div>
                <h2 className='title'>{component}</h2>
                <div className='flashcard-list'>
                  {flashcards.map((flashcard, index) => (
                    <FlashcardContainer
                      key={index}
                      question={flashcard.question}
                      answer={flashcard.answer}
                      hint={flashcard.hint}
                      parameter="user"
                    />
                  ))}
                  <FlashcardContainer parameter="utility"/>
                </div>
            </div>
          )}
        </div>
    );
}

export default FlashcardsComponent;
