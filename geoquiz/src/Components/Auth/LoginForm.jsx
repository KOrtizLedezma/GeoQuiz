"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import {useAuth} from "../../Contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../../Styles/AuthStyles/LoginFormStyles.css";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { resetPassword } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);
      console.log('Token:', idToken);

      const response = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/login`, { idToken });

      if(response.status === 200){
        alert("Login successful!");

        router.push("/flashcardpage");
      }
      else{
        throw new Error('Login failed on backend');
      }
      

    } catch (error) {
      setError(error.message);
    }
  };

  
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      alert("Password reset email sent! Please check your inbox.");
      router.push('/loginpage'); 
    } catch (error) {
      alert("Error sending password reset email. Please try again.");
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="form-content">

      <h1 className="title">Login</h1>
      <form className="margin" onSubmit={handleLogin}>

        <h2 className="sub-title">
          Email
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <h2 className="sub-title">
          Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {error && <p className="error">{error}</p>}

        <button 
          type="submit"
          className="button"
        >
          Login
        </button> 
        <h2 className="forgotPassword" onClick={handleReset}>
          Forgot your password?
        </h2> 
      </form>
    </div>
  )
}

export default LoginForm;