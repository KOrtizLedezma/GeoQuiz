"use client";
import '../../Styles/CollectionsStyles/CollectionsComponentStyles.css';
import CollectionsContainer from './CollectionsContainer';
import React from 'react';
import { useCollections } from '@/Contexts/CollectionsContext';

function CollectionsComponent({ setCurrentCollection }) {
  
  const { collectionNames } = useCollections();

  return (
    <div className='form-container'>
      <h1 className='title'>Collections</h1>
      <div className='collection-list'>
        {collectionNames.map((collection, index) => (
          <CollectionsContainer
            key={index}
            name={collection}
            parameter="user"
            setCurrentCollection={setCurrentCollection}
          />
        ))}
        <CollectionsContainer name="Add new" parameter="utility" />
      </div>
    </div>
  );
}

export default CollectionsComponent;
