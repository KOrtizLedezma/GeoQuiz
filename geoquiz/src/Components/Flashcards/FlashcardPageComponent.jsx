"use client";
import React, { useState } from 'react';
import FlashcardCollectionsComponent from './FlashcardCollectionsComponent';
import FlashcardsComponent from './FlashcardsComponent';
import '../../Styles/FlashcardsStyles/FlashcardPageStyles.css';

function FlashcardPageComponent() {
  const [currentCollection, setCurrentCollection] = useState(null);

  return (
    <div>
      <h1 className='title'>Flashcards</h1>
      <div className='two-sides-container'>
        <div className='left-side'>
          <FlashcardCollectionsComponent setCurrentCollection={setCurrentCollection} />
        </div>
        <div className='right-side'>
          <FlashcardsComponent component={currentCollection} />
        </div>
      </div>
    </div>
  );
}

export default FlashcardPageComponent;
