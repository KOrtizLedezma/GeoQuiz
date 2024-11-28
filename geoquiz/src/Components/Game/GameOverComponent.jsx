import React from 'react';
import '../../Styles/GameStyles/Game.css';

const GameOverComponent = ({ score, totalQuestions, onPlayAgain }) => {
    return (
        <div className="game-over">
            <h2 className="game-over-title">Game Over!</h2>
            <p className="final-score">Final Score: {score}/{totalQuestions}</p>
            <button 
                onClick={onPlayAgain}
                className="play-again-button"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameOverComponent;