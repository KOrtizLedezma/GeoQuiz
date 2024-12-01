"use client";
import React, { useState } from 'react';
import HeaderComponent from '@/Components/Header/HeaderComponent';
import { AuthProvider } from '@/Contexts/AuthContext';
import RegistrationForm from '@/Components/Auth/RegistrationForm';

export default function Home() {
  return (
    <AuthProvider>
        <div>
          <HeaderComponent />
          <RegistrationForm />
        </div>
    </AuthProvider>
  );
}
