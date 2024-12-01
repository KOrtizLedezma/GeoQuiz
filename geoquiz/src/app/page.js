"use client";

import Title from "../Components/HomePage/Title";
import Header from "@/Components/Header/HeaderComponent";
import Footer from "@/Components/HomePage/Footer";
import { AuthProvider } from "@/Contexts/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Title />
        <Footer />
      </div>
    </AuthProvider>
  );
}
