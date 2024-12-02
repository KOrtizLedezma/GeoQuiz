import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const TriviaContext = createContext();

export const TriviaProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BASE_URL = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

    // Fetch geography trivia questions
    const fetchGeographyQuestions = async (amount = 10, difficulty = 'medium') => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BASE_URL}/api/trivia/geography`, {
                params: { amount, difficulty },
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            console.error('Error fetching geography trivia questions:', err);
            setError(err.message);
            setLoading(false);
            return null;
        }
    };
    

    return (
        <TriviaContext.Provider value={{ loading, error, fetchGeographyQuestions }}>
            {children}
        </TriviaContext.Provider>
    );
};

export const useTrivia = () => useContext(TriviaContext);
