import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '@/firebase/firebase';

const ScoresContext = createContext();

export function ScoresProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [userName, setUserName] = useState('');

  // Function to get the ID token for authenticated requests
  const getIdToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  // Fetch all scores for the authenticated user
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const idToken = await getIdToken();
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}/scores`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        });

        console.log("Fetched scores:", response.data.scores);
        setScores(response.data.scores);
      } catch (error) {
        console.log('Error fetching scores', error);
      }
    };

    fetchScores();
  }, []);

  // Update the score
  const updateScore = async (scoreIncrement) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.post(
        `http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}/scores`,
        { scoreIncrement },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        }
      );

      console.log("Score updated:", response.data.scores);
      setScores(response.data.scores);
    } catch (error) {
      console.log('Error updating score', error);
    }
  };

   // Fetch the user's name
   const fetchUserName = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      console.log("Full response:", response);

      const { firstname } = response.data;
      console.log("Fetched user name:", firstname);
      setUserName(firstname);
    } catch (error) {
      console.log('Error fetching user name', error);
    }
  };

  useEffect(()=>{
    fetchUserName();
  }, []);

  return (
    <ScoresContext.Provider value={{ scores, updateScore, userName }}>
      {children}
    </ScoresContext.Provider>
  );
}

export function useScores() {
  return useContext(ScoresContext,);
}
