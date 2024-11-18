import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '@/firebase/firebase';

const ScoresContext = createContext();

export function ScoresProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [userName, setUserName] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');

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

      const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}/firstname`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      const { firstname } = response.data;
      setUserName(firstname);
    } catch (error) {
      console.log('Error fetching user name', error);
    }
  };

  // Fetch the user's lasstname
  const fetchUserLastname = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}/lastname`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      const { lastName } = response.data;
      setUserLastname(lastName);
    } catch (error) {
      console.log('Error fetching user name', error);
    }
  };

  // Fetch the user's email
  const fetchUserEmail = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}/email`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      const { email } = response.data;
      setUserEmail(email);
      console.log(email);
    } catch (error) {
      console.log('Error fetching user email', error);
    }
  };

  const updateUserData = async (updates) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('User is not authenticated.');
      
      const response = await axios.put(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/users/${uid}`,
        updates,
          {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
          }
      );

      console.log("User data updated successfully:", response.data);

      if (updates.firstName) setUserName(updates.firstName);
      if (updates.lastName) setUserLastname(updates.lastName);
      if (updates.email) setUserEmail(updates.email);

      return response.data;

    } catch (error) {
      console.error('Error updating user data:', error);
      if (error.code === 'auth/requires-recent-login') {
          alert('Please log in again to update your email.');
      } else if (error.response?.data?.message) {
          console.error(error.response.data.message);
          alert(error.response.data.message);
      } else {
          alert('An error occurred while updating your profile.');
      }

      throw error;
    }
  };


  useEffect(()=>{
    fetchUserName();
    fetchUserLastname();
    fetchUserEmail();
  }, []);

  return (
    <ScoresContext.Provider value={{ scores, updateScore, userName, userLastname, userEmail, updateUserData }}>
      {children}
    </ScoresContext.Provider>
  );
}

export function useScores() {
  return useContext(ScoresContext,);
}
