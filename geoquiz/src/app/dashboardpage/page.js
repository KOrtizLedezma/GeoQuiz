"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/Components/Header/HeaderComponent';
import { AuthProvider } from '@/Contexts/AuthContext';
import { ScoresProvider, useScores } from '@/Contexts/ScoresContext';
import DashboardComponent from '@/Components/Dashboard/DashboardComponent';

function DashboardPage() {
  return (
    <AuthProvider>
      <ScoresProvider>
        <Header />
        <DashboardComponent />
      </ScoresProvider>
    </AuthProvider>
  );
}

export default DashboardPage;