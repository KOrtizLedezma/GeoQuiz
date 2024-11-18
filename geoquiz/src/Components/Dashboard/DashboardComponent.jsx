"use client";
import React, { useState, useEffect } from 'react';
import "../../Styles/DashboardStyles/DashboardPageStyles.css";
import { ScoresProvider, useScores } from '@/Contexts/ProfileContext';
import ScoresChartComponent from './ScoresChartComponent';
import ActivityChartComponent from './ActivityChartComponent';
import AchievementsComponent from './AchievementsComponent';
import ActivityComponent from './ActivityComponent';
import ProfileComponent from './ProfileComponent';

function DashboardComponent() {
    const { userName, userLastname, scores, updateScore } = useScores();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className='page-container'>
            {"<h1 className='title'>Hi {userName}</h1>"}
            <div className='two-sides-container'>
                <div className='left-side'>
                    <div className='left-container'>
                        <h1 className='title'>Hi {userName}</h1>
                        <button className={`button ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
                            {/*Badges Chart*/}
                            Achievements
                        </button>
                        <button className={`button ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
                            {/*Recent Activity*/}
                            Activity
                        </button>
                        <button className={`button ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                            {/*Scores Chart*/}
                            Dashboard
                        </button>
                        <button className={`button ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            {/*Profile Information*/}
                            Profile
                        </button>
                        <button className={`button ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>
                            {/*Activity Chart*/}
                            Progress
                        </button>
                    </div>
                </div>
                <div className='right-side'>
                    {activeTab === "dashboard" ? (
                        <ScoresChartComponent dataset={scores} />
                    ) : activeTab === "progress" ? (
                        <ActivityChartComponent dataset={scores} />
                    ) : activeTab === "achievements" ? (
                        <AchievementsComponent />
                    ) : activeTab === "activity" ? (
                        <ActivityComponent />
                    ) : activeTab === "profile" ? (
                        <ProfileComponent />
                    ) : (
                        // Default case - will show dashboard or a logo
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent;
