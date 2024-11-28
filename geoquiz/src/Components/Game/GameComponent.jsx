import React, {useState, useEffect} from 'react'
import DifficultyComponent from './DifficultyComponent';
import { useTrivia } from '@/Contexts/TriviaContext';
import TimerComponent from './TimerComponent';
import QuestionCardComponent from './QuestionCardComponent';
import GameOverComponent from './GameOverComponent';
import '../../Styles/GameStyles/Game.css';

function GameComponent() {
    const [showPopup, setShowPopup] = useState(true);
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionsFetched, setQuestionsFetched] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    const { fetchGeographyQuestions, loading, error } = useTrivia();

    //Set initial timer
    useEffect(() => {
        if (difficulty) {
            const times = {
                'easy': 180,
                'medium': 120,
                'hard': 60
            };
            setTimeLeft(times[difficulty.toLowerCase()]);
        }
    }, [difficulty]);

    useEffect(() => {
        const getQuestions = async () => {
            if (difficulty && !questionsFetched) {
                try {
                    const fetchedQuestions = await fetchGeographyQuestions(10, difficulty.toLowerCase());
                    if (fetchedQuestions) {
                        // Prepare shuffled answers for each question
                        const questionsWithShuffledAnswers = fetchedQuestions.map(question => {
                            const answers = [...question.incorrectAnswers, question.correctAnswer]
                                .sort(() => Math.random() - 0.5);
                            return answers;
                        });
                        setShuffledAnswers(questionsWithShuffledAnswers);
                        setQuestions(fetchedQuestions);
                        setQuestionsFetched(true);
                    }
                } catch (err) {
                    console.error("Error fetching questions:", err);
                }
            }
        };
        getQuestions();
    }, [difficulty, questionsFetched, fetchGeographyQuestions]);

    const getCurrentQuestion = () => questions[currentQuestionIndex];

    const getCurrentAnswers = () => {
        return shuffledAnswers[currentQuestionIndex] || [];
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        const currentQuestion = getCurrentQuestion();
        
        if (answer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setSelectedAnswer(null);
                } else {
                    setGameOver(true);
                }
            }, 1000);
        } else {
            setShowAnswer(true);
            setTimeout(() => {
                setShowAnswer(false);
                setSelectedAnswer(null);
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                } else {
                    setGameOver(true);
                }
            }, 2000);
        }
    };

    const handlePlayAgain = () => {
        setShowPopup(true);
        setGameOver(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuestionsFetched(false);
        setQuestions([]);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setShuffledAnswers([]);
        setTimeLeft(() => {
            const times = {
                'easy': 180,
                'medium': 120,
                'hard': 60
            };
            return times[difficulty.toLowerCase()];
        });
    };

    return (
        <div className="game-container">
            {showPopup && (
                <DifficultyComponent setLevel={setDifficulty} setShowPopup={setShowPopup}/>
            )}

            {!showPopup && difficulty !== "" && !gameOver && questions.length > 0 &&( 
                <div>
                    <div className="game-header">
                        <div className="question-counter">
                            Question {currentQuestionIndex + 1}/{questions.length}
                        </div>
                        <TimerComponent 
                            timeLeft={timeLeft}
                            setTimeLeft={setTimeLeft}
                            gameOver={gameOver}
                            showAnswer={showAnswer}
                            setGameOver={setGameOver}
                        />
                    </div>

                    <QuestionCardComponent
                        question={getCurrentQuestion()}
                        answers={getCurrentAnswers()}
                        selectedAnswer={selectedAnswer}
                        onAnswerSelect={handleAnswerSelect}
                        showAnswer={showAnswer}
                    />
                </div>
            )}

            {gameOver && (
                <GameOverComponent 
                    score={score}
                    totalQuestions={questions.length}
                    onPlayAgain={handlePlayAgain}
                />
            )}
        </div>
    )
}

export default GameComponent