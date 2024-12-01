"use client";
import React, { useState } from 'react';
import "../../Styles/CollectionsStyles/CollectionsFormStyles.css";
import { useCollections } from '@/Contexts/CollectionsContext';

function AddCollectionComponent({ closeModal }) {
  const { addCollection } = useCollections();
  const [collectionName, setCollectionName] = useState('');

  const handleAddCollection = async () => {
    if (collectionName.trim()) {
      const newCollection = { name: collectionName };
      await addCollection(newCollection);
      setCollectionName('');
      closeModal();
    }
  };

  return (
    <div className='container'>
      <h2 className='sub-title'>Collection&apos;s name</h2>
      <textarea
        type="text"
        className='input-box'
        placeholder='Enter the name of your collection here'
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      ></textarea>
      <div className="buttons-container">
        <button className="button" type="submit" onClick={handleAddCollection}>
          Create Collection
        </button>
        <button className="button" type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCollectionComponent;
