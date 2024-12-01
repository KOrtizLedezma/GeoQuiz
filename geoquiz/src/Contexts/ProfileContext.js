import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '@/firebase/firebase';

const ScoresContext = createContext();

export function ScoresProvider({ children }) {
  const [scores, setScores] = useState([]);
  const [userName, setUserName] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activities, setActivities] = useState([]);
  const [badges, setBadges] = useState([]);

  const BASE_URL = `http://localhost:${process.env.NEXT_PUBLIC_PORT}`;

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

        const response = await axios.get(`${BASE_URL}/api/users/${uid}/scores`, {
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

      const response = await axios.post(`${BASE_URL}/api/users/${uid}/scores`,
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

      const response = await axios.get(`${BASE_URL}/api/users/${uid}/firstname`, {
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

      const response = await axios.get(`${BASE_URL}/api/users/${uid}/lastname`, {
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

      const response = await axios.get(`${BASE_URL}/api/users/${uid}/email`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      const { email } = response.data;
      setUserEmail(email);
    } catch (error) {
      console.log('Error fetching user email', error);
    }
  };
  
  // Update the data of the user ex. name, email or other fields
  const updateUserData = async (updates) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('User is not authenticated.');
      
      const response = await axios.put(`${BASE_URL}/api/users/${uid}`,
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

  // Fetch all activities
  const fetchActivities = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.get(`${BASE_URL}/api/users/${uid}/activities`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      setActivities(response.data);
    } catch (error) {
      console.log('Error fetching activities', error);
    }
  };

  // Post a new activity
  const postActivity = async (activity) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.post(`${BASE_URL}/api/users/${uid}/activities`,
        activity,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        }
      );

      setActivities(response.data.activities);
    } catch (error) {
      console.log('Error posting activity', error);
    }
  };

  // Fetch all badges
  const fetchBadges = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const response = await axios.get(`${BASE_URL}/api/users/${uid}/badges`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });

      setBadges(response.data);
    } catch (error) {
      console.log('Error fetching badges', error);
    }
  };

  // Update the user's badges
  const updateBadges = async () => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      
      const response = await axios.put(
        `${BASE_URL}/api/users/${uid}/badges`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        }
      );
  
      setBadges(response.data.badges);
    } catch (error) {
      console.log('Error updating badges', error);
    }
  };

  useEffect(()=>{
    fetchUserName();
    fetchUserLastname();
    fetchUserEmail();
    fetchActivities();
    fetchBadges();
  }, []);

  return (
    <ScoresContext.Provider value={{ scores, updateScore, userName, userLastname, userEmail, updateUserData, fetchActivities, postActivity, activities, badges, updateBadges }}>
      {children}
    </ScoresContext.Provider>
  );
}

export function useScores() {
  return useContext(ScoresContext,);
}
