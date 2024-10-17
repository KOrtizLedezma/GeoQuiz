import React, { useState } from 'react';
import "../../Styles/FlashcardsStyles/FlashcardContainerStyles.css";
import NewFlashcardComponentForm from './NewFlashcardComponentForm';
import { motion } from 'framer-motion';

function FlashcardContainer({ question, answer, hint, parameter }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const handleFlip = () => {
    if (parameter === "user") {
      setIsFlipped(!isFlipped); // Toggle the flip state
    }
  };

  return (
    <div className='container'>
      {parameter === "user" ? (
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
            <h1 className='question'>{question}</h1>
            <h2 className='hint'>{hint}</h2>
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
      ) : parameter === "utility" ? (
        <h2 className='flashcard-utility' onClick={openModal}>+</h2>
      ) : null}

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal'>
            <NewFlashcardComponentForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardContainer;