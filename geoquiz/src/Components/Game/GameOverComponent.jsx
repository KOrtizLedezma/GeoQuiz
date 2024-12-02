import React, { useEffect, useState } from 'react';
import '../../Styles/GameStyles/Game.css';
import { useScores } from '@/Contexts/ProfileContext';

const GameOverComponent = ({ score, totalQuestions, onPlayAgain, difficulty }) => {
    const { updateScore, postActivity, updateBadges } = useScores();
    const [gameState, setGameState] = useState(true);

    useEffect(() => {
        const handleGameOver = async () => {
            if (!gameState) return;

            if (score === 10) {
                switch (difficulty) {
                    case 'Easy':
                        await updateScore(10);
                        break;
                    case 'Medium':
                        await updateScore(20);
                        break;
                    case 'Hard':
                        await updateScore(30);
                        break;
                    default:
                        console.warn('Unknown difficulty:', difficulty);
                        break;
                }
            }

            const newActivity = {
                score,
                difficulty,
                date: new Date().toISOString(),
            };

            await postActivity(newActivity);
            await updateBadges();
            setGameState(false);
        };

        handleGameOver();
    }, []);

    const handlePlayAgain = () => {
        onPlayAgain();
        setGameState(false);
    };

    return (
        <div className="game-over">
            <h2 className="game-over-title">Game Over!</h2>
            <p className="final-score">Final Score: {score}/{totalQuestions}</p>
            <button 
                onClick={handlePlayAgain}
                className="play-again-button"
            >
                Play Again
            </button>
        </div>
    );
};

export default GameOverComponent;
