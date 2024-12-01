"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/Components/Header/HeaderComponent';
import { AuthProvider } from '@/Contexts/AuthContext';
import { ScoresProvider, useScores } from '@/Contexts/ProfileContext';
import { TriviaProvider } from '@/Contexts/TriviaContext';
import DashboardComponent from '@/Components/Dashboard/DashboardComponent';

function DashboardPage() {
  return (
    <AuthProvider>
      <ScoresProvider>
        <TriviaProvider>
          <Header />
          <DashboardComponent />
        </TriviaProvider>
      </ScoresProvider>
    </AuthProvider>
  );
}

export default DashboardPage;