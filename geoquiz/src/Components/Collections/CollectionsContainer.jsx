"use client";
import React, { useState } from 'react';
import "../../Styles/CollectionsStyles/CollectionsContainerStyles.css";
import CollectionsForm from './CollectionsForm';

function CollectionContainer({ name, parameter, setCurrentCollection }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCollectionClick = () => {
    setCurrentCollection(name);
  };

  return (
    <div className='collection-form-container'>
      {parameter === "user" ? (
        <h2 className='collection-user' onClick={handleCollectionClick}>
          {name}
        </h2>
      ) : parameter === "utility" ? (
        <h2 className='collection-utility' onClick={openModal}>+</h2>
      ) : null}

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <CollectionsForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionContainer;
