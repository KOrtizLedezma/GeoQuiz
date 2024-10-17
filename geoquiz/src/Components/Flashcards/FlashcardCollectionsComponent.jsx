"use client";
import '../../Styles/FlashcardsStyles/FlashcardCollectionStyles.css';
import CollectionContainer from './CollectionContainer';
import React from 'react';

function FlashcardCollectionsComponent({ setCurrentCollection }) {
  // Collection for testing purposes
  const collections = [
    "Continents of the World",
    "Mountain Ranges",
    "World Capitals",
    "Rivers and Oceans",
    "Deserts of the World",
    "Countries and Flags",
    "Geographical Landmarks",
    "Climate Zones",
    "World Map Quizzes",
    "Famous Islands"
  ];

  return (
    <div className='form-container'>
      <h1 className='title'>Collections</h1>
      <div className='collection-list'>
        {collections.map((collection, index) => (
          <CollectionContainer
            key={index}
            name={collection}
            parameter="user"
            setCurrentCollection={setCurrentCollection}
          />
        ))}
        <CollectionContainer name="Add new" parameter="utility" />
      </div>
    </div>
  );
}

export default FlashcardCollectionsComponent;
