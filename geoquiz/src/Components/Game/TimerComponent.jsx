import React, { useEffect } from 'react';
import '../../Styles/GameStyles/Game.css';

const TimerComponent = ({ timeLeft, setTimeLeft, gameOver, showAnswer, setGameOver }) => {
    useEffect(() => {
        let timer;
        if (timeLeft > 0 && !gameOver && !showAnswer) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft, gameOver, showAnswer, setGameOver, setTimeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return <div className="timer">Time: {formatTime(timeLeft)}</div>;
};

export default TimerComponent;