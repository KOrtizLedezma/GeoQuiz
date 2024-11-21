"use client";
import React, { useState } from 'react';
import CollectionsComponent from '@/Components/Collections/CollectionsComponent';
import FlashcardsComponent from '@/Components/Flashcards/FlashcardsComponent';
import HeaderComponent from '@/Components/Header/HeaderComponent';
import { CollectionsProvider } from '@/Contexts/CollectionsContext';
import { AuthProvider } from '@/Contexts/AuthContext';
import '../../Styles/PagesStyles/FlashcardPageStyles.css';

function FlashcardPageComponent() {
  const [currentCollection, setCurrentCollection] = useState(null);

  return (
    <AuthProvider>
      <CollectionsProvider>
        <div>
          <HeaderComponent />
          <h1 className='title'>Flashcards</h1>
          <div className='two-sides-container'>
            <div className='left-side'>
              <CollectionsComponent setCurrentCollection={setCurrentCollection} />
            </div>
            <div className='right-side'>
              <FlashcardsComponent component={currentCollection} />
            </div>
          </div>
        </div>
      </CollectionsProvider>
    </AuthProvider>
  );
}

export default FlashcardPageComponent;
