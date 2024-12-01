"use client";
import React, { useState } from 'react';
import { AuthProvider } from '@/Contexts/AuthContext';
import GameComponent from '@/Components/Game/GameComponent';
import Header from '@/Components/Header/HeaderComponent';
import { TriviaProvider } from '@/Contexts/TriviaContext';
import { ScoresProvider } from '@/Contexts/ProfileContext';

function LearningPageComponent() {

  return (
    <AuthProvider>
      <TriviaProvider>
        <ScoresProvider>
          <Header />
          <GameComponent/>
        </ScoresProvider>
      </TriviaProvider>
    </AuthProvider>
  );
}

export default LearningPageComponent;
