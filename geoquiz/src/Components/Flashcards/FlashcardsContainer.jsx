import React, { useState } from 'react';
import "../../Styles/FlashcardsStyles/FlashcardsContainerStyles.css";
import FlashcardsForm from './FlashcardsForm';
import EditFlashcardForm from './EditFlashcardForm';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCollections } from '@/Contexts/CollectionsContext';

function FlashcardContainer({ question, answer, hint, image, parameter, collectionName, index }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalEOpen, setModalEOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { deleteFlashcard } = useCollections();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalE= () => {
    setModalEOpen(true);
  };

  const closeModalE = () => {
    setModalEOpen(false);
  };  

  const handleFlip = () => {
    if (parameter === "user") {
      setIsFlipped(!isFlipped);
    }
  };

  const handleDelete = () => {
    deleteFlashcard(collectionName, index);
  }

  return (
    <div className='container'>
      {parameter === "user" ? (
        <div>
          <motion.div
            className="flashcard-flip"
            onClick={handleFlip}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d", position: "relative" }}
          >
            <motion.div
              className="flashcard-front"
              style={{
                position: 'absolute',
                width: '100%',
                backfaceVisibility: 'hidden',
                display: isFlipped ? 'none' : 'block',
              }}
            >
              <div className="content-wrapper">
                <h1 className='question'>{question}</h1>
                <h2 className='hint'>{hint}</h2>
                {image && <img src={image} alt="Flashcard Image" className="flashcard-image" />}
              </div>
            </motion.div>

            <motion.div
              className="flashcard-back"
              style={{
                position: 'absolute',
                width: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: isFlipped ? 'block' : 'none',
              }}
            >
              <h1 className='answer'>{answer}</h1>
            </motion.div>
          </motion.div>

          <div className="icons-container">
              <FaEdit className="icon edit-icon" onClick={openModalE}/>
              <FaTrash className="icon delete-icon" onClick={handleDelete}/>
          </div>
          
        </div>
      ) : parameter === "utility" ? (
        <h2 className='flashcard-utility' onClick={openModal}>+</h2>
      ) : null}

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <FlashcardsForm collectionName={collectionName} closeModal={closeModal} />
          </div>
        </div>
      )}

      {isModalEOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <EditFlashcardForm collectionName={collectionName} closeModal={closeModalE} question={question} answer={answer} hint={hint} index={index}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardContainer;