import React, { useEffect, useState } from 'react';
import "../../Styles/FlashcardsStyles/FlashcardsComponentStyles.css";
import FlashcardsContainer from './FlashcardsContainer';
import { useCollections } from '@/Contexts/CollectionsContext';

function FlashcardsComponent({ component }) {
  const { collectionDetails } = useCollections();
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    if (component) {
      const collection = collectionDetails?.[component];
      setSelectedCollection(collection);
    }
  }, [component, collectionDetails]);

  return (
    <div className='flashcard-container'>
      {component === null ? (
        <p className='null-component-message'>Pick or Create a new Collection</p>
      ) : (
        <div>
          <h2 className='title'>{component}</h2>
          <div className='flashcard-list'>
            {selectedCollection?.flashcards?.map((flashcard, index) => (
              <FlashcardsContainer
                key={index}
                question={flashcard.question}
                answer={flashcard.answer}
                hint={flashcard.hint}
                image={flashcard.image}
                collectionName={component}
                parameter="user"
                index={index}
              />
            ))}
            <FlashcardsContainer parameter="utility" collectionName={component} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardsComponent;
