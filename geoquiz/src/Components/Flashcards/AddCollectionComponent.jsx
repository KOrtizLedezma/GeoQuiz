import React from 'react';
import "../../Styles/FlashcardsStyles/AddCollectionStyles.css";

function AddCollectionComponent({ closeModal }) {
  return (
    <div className='container'>
      <h2 className='sub-title'>Collection&aposs name</h2>
      <textarea
        type="text"
        className='input-box'
        placeholder='Enter the name of your collection here'
      ></textarea>
      <div className="buttons-container">
        <button className="button" type="submit">
          Create Flashcard
        </button>
        <button className="button" type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCollectionComponent;
