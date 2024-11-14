import React, {useState} from 'react'
import "../../Styles/FlashcardsStyles/EditFlashcardFormStyles.css";
import { useCollections } from '@/Contexts/CollectionsContext';

function EditFlashcardForm({collectionName, closeModal, question, answer, hint, index}) {

    const [questionE, setQuestionE] = useState(question);
    const [answerE, setAnswerE] = useState(answer);
    const [hintE, setHintE] = useState(hint);
    const [imagePreviewE, setImagePreviewE] = useState(null);
    const { editFlashcard } = useCollections();

    const handleEditFlashcard = async () => {
        const updatedFlashcard = {
            question: questionE,
            answer: answerE,
            hint: hintE,
            image: imagePreviewE || null,
        };
      
        await editFlashcard(collectionName, index, updatedFlashcard);
        closeModal();
    };
    const handleFileUpload = (file) => {
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreviewE(e.target.result);
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
            <h1 className='title'> Edit Flashcard </h1>
        
            <h2 className='sub-title'>Question*</h2>
            <textarea 
                type="text" 
                className='input-box' 
                placeholder={questionE}
                value={questionE}
                onChange={(e) => setQuestionE(e.target.value)}
            ></textarea>
            
            <h2 className='sub-title'>Answer*</h2>
            <textarea 
                type="text" 
                className='input-box' 
                placeholder={answerE}
                value={answerE}
                onChange={(e) => setAnswerE(e.target.value)}
            ></textarea>
            
            <h2 className='sub-title'>Hint</h2>
            <textarea 
                type="text" 
                className='input-box' 
                placeholder={hintE}
                value={hintE}
                onChange={(e) => setHintE(e.target.value)}
            ></textarea>
            
            <h2 className='sub-title'>Image</h2>
            <div 
                className="image-upload-section"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
            >
                <div className="image-preview" id="imagePreview">
                    {imagePreviewE ? (
                        <img src={imagePreviewE} alt="Uploaded Preview" className="uploaded-image" />
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
                <button className="button" type="submit" onClick={handleEditFlashcard}>
                    Edit Flashcard
                </button>

                <button className="button" type="submit" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditFlashcardForm