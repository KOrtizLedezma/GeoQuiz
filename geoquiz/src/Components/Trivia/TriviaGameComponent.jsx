import React, { useState, useEffect } from 'react';
import { useTrivia } from '@/Contexts/TriviaContext';
import "../../Styles/DashboardStyles/TabsStyles.css";

const TriviaGameComponent = ( {difficulty} ) => {
    const { fetchGeographyQuestions, loading, error } = useTrivia();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (difficulty) {
                const data = await fetchGeographyQuestions(10, difficulty);
                if (data) {
                    setQuestions(data);
                }
            }
        };

        fetchQuestions();
    }, [difficulty, fetchGeographyQuestions]);

    return (
        <div className='content-container'>
            <h2 className="title">{difficulty?.toUpperCase()}</h2>
        </div>
    );
};

export default TriviaGameComponent;
