import React from 'react'
import Image from 'next/image';
import '../../Styles/GameStyles/DifficultyComponentStyles.css';

function DifficultyComponent({setLevel, setShowPopup }) {

    const handleDifficultySelection = (level) => {
        setLevel(level);
        setShowPopup(false);
      };
      
    return (
        <div className='popup-overlay'>
            <div className="popup">
                <h2>Select Difficulty</h2>
                    <Image
                        src="/images/earth.png"
                        alt="Earth Icon"
                        width={250}
                        height={250}
                        className="difficulty-image"
                    />
                    <button
                        onClick={() => handleDifficultySelection("Easy")}
                        className="difficulty-button"
                    >
                        Easy
                    </button>
                    <button
                        onClick={() => handleDifficultySelection("Medium")}
                        className="difficulty-button"
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => handleDifficultySelection("Hard")}
                        className="difficulty-button"
                    >
                        Hard
                    </button>
            </div>
        </div>
    )
}

export default DifficultyComponent