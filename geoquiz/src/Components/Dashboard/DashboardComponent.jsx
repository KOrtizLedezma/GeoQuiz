"use client";
import React, { useState, useEffect } from 'react';
import "../../Styles/DashboardStyles/DashboardPageStyles.css";
import { ScoresProvider, useScores } from '@/Contexts/ScoresContext';
import ScoresChartComponent from './ScoresChartComponent';
import ActivityChartComponent from './ActivityChartComponent';

function DashboardComponent() {
    const { userName, scores, updateScore } = useScores();
    const [selectedChart, setSelectedChart] = useState("scores"); // "scores" or "activity"

    useEffect(() => {
        console.log('Fetched scores:', scores);
    }, [scores]);

    return (
        <div className='page-container'>
            <h1 className='title'>Hi {userName}</h1>
            <div className='two-sides-container'>
                <div className='left-side'>
                    <div className='container'>
                        <h2>Your Scores</h2>
                        {scores && scores.length > 0 ? (
                            <ul>
                                {scores.map((score, index) => (
                                    <li key={index}>
                                        {score.date}: {score.currentScore}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No scores available</p>
                        )}
                    </div>
                </div>
                <div className='right-side'>
                    <div className='container'>
                      <div className='chart-selection'>
                        <button 
                          onClick={() => setSelectedChart("scores")} 
                          className={`chart-button ${selectedChart === "scores" ? "active" : ""}`}
                          >
                          View Scores Chart
                        </button>
                        <button 
                          onClick={() => setSelectedChart("activity")} 
                          className={`chart-button ${selectedChart === "activity" ? "active" : ""}`}
                          >
                          View Activity Chart
                        </button>
                      </div>
                      {selectedChart === "scores" ? (
                          <ScoresChartComponent dataset={scores} />
                      ) : (
                          <ActivityChartComponent dataset={scores} />
                      )}
                    </div>
                </div>
            </div>
            <button 
                onClick={() => updateScore(10)} 
                className="bg-blue-500 text-black px-4 py-2 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300"
            >
                Increase Score by 10
            </button>
        </div>
    );
}

export default DashboardComponent;
