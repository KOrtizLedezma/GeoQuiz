"use client";
import React, { useState } from 'react';
import { AuthProvider } from '@/Contexts/AuthContext';
import GameComponent from '@/Components/Game/GameComponent';
import Header from '@/Components/Header/HeaderComponent';
import { TriviaProvider } from '@/Contexts/TriviaContext';

function LearningPageComponent() {

  return (
    <AuthProvider>
      <TriviaProvider>
        <Header />
        <GameComponent/>
      </TriviaProvider>
    </AuthProvider>
  );
}

export default LearningPageComponent;
