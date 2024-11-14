"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import "../../Styles/AuthStyles/RegisterFormStyles.css";

function RegistrationForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const response = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/register`, {
        uid,
        email,
        firstName,
        lastName,
      });

      if(response.status === 201){
        alert("Account created successfully!");

        router.push("/flashcardpage");
      }
      else{
        throw new Error('Registration failed on backend');
      }

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="form-content">

      <h1 className="title">Register</h1>
      <form className="margin" onSubmit={handleRegister}>
        <h2 className="sub-title">
          First Name
        </h2>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />

        <h2 className="sub-title">
          Last Name
        </h2>

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />

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
        <button 
          type="submit"
          className="button"
        >
          Register
        </button> 
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegistrationForm