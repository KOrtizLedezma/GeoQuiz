import React from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import '../../Styles/HomePage/HeaderStyles.css';
import { useRouter } from "next/navigation";

function Header() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      alert('You have successfully signed out!');
      router.push("/");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header-container">
      <div className="logo">
        <h1>GQ</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><a href="/">Home</a></li>
          {!user ? (
            <>
              <li><a href="/signuppage">Sign up</a></li>
              <li><a href="/loginpage">Log In</a></li>
            </>
          ) : (
            <>
              <li><a href="/flashcardpage">Flashcards</a></li>
              <li><a href="/dashboardpage">Dashboard</a></li>
              <li><a href="/" onClick={handleLogout}>Sign out</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
