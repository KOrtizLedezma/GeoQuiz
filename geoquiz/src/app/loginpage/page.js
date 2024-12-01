"use client";
import React, { useState } from 'react';
import HeaderComponent from '@/Components/Header/HeaderComponent';
import { AuthProvider } from '@/Contexts/AuthContext';
import LoginForm from '@/Components/Auth/LoginForm';

export default function Home() {
  return (
    <AuthProvider>
        <div>
          <HeaderComponent />
          <LoginForm />
        </div>
    </AuthProvider>
  );
}
