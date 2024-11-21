"use client";
import React, { useState } from 'react';
import '../../Styles/FlashcardsStyles/FlashcardsFormStyles.css';
import { useCollections } from '@/Contexts/CollectionsContext';

function FlashcardForm({ collectionName, closeModal }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const { addFlashcard } = useCollections();

  const handleAddFlashcard = async () => {
    if (!collectionName) {
      console.log('Collection name is not defined');
      return;
    }

    if (question.trim() && answer.trim()) {
      const newFlashcard = {
        question,
        answer,
        hint: hint.trim() || null,
        image: imagePreview || null,
      };
      await addFlashcard(collectionName, newFlashcard);
      setQuestion('');
      setAnswer('');
      setHint('');
      setImagePreview(null);
      closeModal();
    } else {
      console.log('Question and answer are required fields');
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      console.log('Only image files are allowed');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div>
      <h1 className='title'> Create a new Flashcard </h1>
      
      <h2 className='sub-title'>Question*</h2>
      <textarea 
        type="text" 
        className='input-box' 
        placeholder='Enter your question here'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      
      <h2 className='sub-title'>Answer*</h2>
      <textarea 
        type="text" 
        className='input-box' 
        placeholder='Enter your answer here'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>
      
      <h2 className='sub-title'>Hint</h2>
      <textarea 
        type="text" 
        className='input-box' 
        placeholder='Enter your hint here'
        value={hint}
        onChange={(e) => setHint(e.target.value)}
      ></textarea>
      
      <h2 className='sub-title'>Image</h2>
      <div 
        className="image-upload-section"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <div className="image-preview" id="imagePreview">
          {imagePreview ? (
            <img src={imagePreview} alt="Uploaded Preview" className="uploaded-image" />
          ) : (
            <p className='image-status'>Drag and drop an image here or click to select a file</p>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </div>

      <div className="buttons-container">
        <button className="button" type="submit" onClick={handleAddFlashcard}>
          Create Flashcard
        </button>

        <button className="button" type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default FlashcardForm;
