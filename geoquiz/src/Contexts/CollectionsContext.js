import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '@/firebase/firebase';

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const [collectionNames, setCollectionNames] = useState([]);
  const [collectionDetails, setCollectionDetails] = useState({});

  const getIdToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  // Fetch all collection names for the authenticated user
  useEffect(() => {
    const fetchCollectionNames = async () => {
      try {
        const idToken = await getIdToken();
        const uid = auth.currentUser.uid;
        const response = await axios.get(`http://localhost:5000/api/users/${uid}/collections`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          }
        });

        const collectionNamesArray = Object.keys(response.data);
        setCollectionNames(collectionNamesArray);
        setCollectionDetails(response.data); 
      } catch (error) {
        console.log('Error fetching collection names', error);
      }
    };
    fetchCollectionNames();
  }, []);

  // Fetch specific collection details by name for the authenticated user
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      if (collectionNames.length > 0) {
        try {
          const idToken = await getIdToken();
          const uid = auth.currentUser.uid;

          const collectionDetailsPromises = collectionNames.map(async (collectionName) => {
            const response = await axios.get(`http://localhost:5000/api/users/${uid}/collections/${collectionName}`, {
              headers: {
                Authorization: `Bearer ${idToken}`,
              }
            });
            return {[collectionName]: response.data};
          });
          const detailsArray = await Promise.all(collectionDetailsPromises);
          const details = detailsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
          setCollectionDetails(details);
        } catch (error) {
          console.log('Error fetching collection details', error);
        }
      }
    };
    fetchCollectionDetails();
  }, [collectionNames]);

  // Add a new collection for the authenticated user
  const addCollection = async (newCollection) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser.uid;
      const response = await axios.post(`http://localhost:5000/api/users/${uid}/collections`, newCollection, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      setCollectionNames(prevNames => [...prevNames, newCollection.name]);
      setCollectionDetails(prevDetails => ({
        ...prevDetails,
        [newCollection.name]: { flashcards: [] }
      }));
    } catch (error) {
      console.log('Error adding collection', error);
    }
  };

  // Add a flashcard to a specific collection for the authenticated user
  const addFlashcard = async (collectionName, flashcard) => {
    try {
      const idToken = await getIdToken();
      const uid = auth.currentUser.uid;
      await axios.post(`http://localhost:5000/api/users/${uid}/collections/${collectionName}/flashcards`, flashcard, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      setCollectionDetails(prevDetails => ({
        ...prevDetails,
        [collectionName]: {
          ...prevDetails[collectionName],
          flashcards: [...(prevDetails[collectionName]?.flashcards || []), flashcard]
        }
      }));
    } catch (error) {
      console.log('Error adding flashcard', error);
    }
  };

  return (
    <CollectionsContext.Provider value={{ collectionNames, collectionDetails, addCollection, addFlashcard }}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  return useContext(CollectionsContext);
}
