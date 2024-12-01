const express = require('express');
const axios = require('axios');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const verifyToken = require('../verifyToken');

require('dotenv').config();
const TRIVIA_API_URL = process.env.NEXT_PUBLIC_TRIVIA_API_URL;

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { uid, email, firstName, lastName } = req.body;
    
        if (!uid || !email || !firstName || !lastName) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        const userRef = db.collection('users').doc(uid);

        const initialActivities = Array(10).fill(null).map(() => ({
            score: null,
            difficulty: null,
            date: null
        }));

        await userRef.set({
          email: email,
          firstname: firstName,
          lastName: lastName,
          collections: [],
          activities: initialActivities,
          scores: [{date: new Date().toISOString(), currentScore: 0}]
        });
    
        res.status(201).json({ message: 'User registered successfully', uid });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
      }
});

// Login user
router.post('/login', async (req, res) => {
    const { idToken } = req.body;

    try {
        if (!idToken) {
        return res.status(400).json({ message: 'Missing ID token' });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        res.status(200).json({ message: 'Login successful', uid });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

//Post Collection to a user
router.post('/users/:uid/collections', verifyToken, async (req, res) => {
    try {

        const {uid} = req.params;
        const {name} = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Collection name is required' });
        }

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({message: 'User not found'});
        }

        const newCollection = {
            flashcards: [],
        }

        await userRef.update({
            [`collections.${name}`]: newCollection,
        });

        res.status(201).json({message: 'Collection added successfully'});
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ message: 'Error creating collection', error });
    }
});

//Add Flashcard to Collection
router.post('/users/:uid/collections/:collectionName/flashcards',verifyToken, async (req, res) => {
    try {
        const { uid, collectionName } = req.params;
        const { question, answer, hint, image } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if(!userDoc.exists){
            return res.status(404).json({message: 'User not found'});
        }

        const userData = userDoc.data();
        const collection = userData.collections[collectionName];

        if(!collection){
            return res.status(404).json({message: 'Collection not found'});
        }

        collection.flashcards.push({
            question,
            answer,
            hint: hint || null,
            image: image || null,
        });

        await userRef.update({[`collections.${collectionName}.flashcards`]: collection.flashcards,});
        res.status(200).json({ message: 'Flashcard added successfully' });

    } catch (error) {
        console.error('Error adding flashcard:', error);
        res.status(500).json({ message: 'Error adding flashcard', error });
    }
});

//Get Collections - Only name
router.get('/users/:uid/collections', verifyToken, async (req, res) => {
    try {

        const {uid} = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if(!userDoc.exists){
            return res.status(404).json({message: 'User not found'});
        }

        const collections = userDoc.data().collections || {}

        const collectionNames = Object.keys(collections);

        res.status(200).json(collections);

    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Error fetching collections', error });
    }
});

//Get Collections by name
router.get('/users/:uid/collections/:collectionName', async (req, res) => {
    try {
        const { uid, collectionName } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const collections = userDoc.data().collections;

        const collection = collections[collectionName];

        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        res.status(200).json(collection);
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).json({ message: 'Error fetching collection', error });
    }
});

//Get Activities
router.get('/users/:uid/activities', async (req, res) => {
    try {
        const { uid } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const activities = userDoc.data().activities;

        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: 'No activities found' });
        }

        res.status(200).json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});

// Post Activity
router.post('/users/:uid/activities', async (req, res) => {
    try {
        const { uid } = req.params;
        const { score, difficulty, date } = req.body;

        if (!score || !difficulty || !date) {
            return res.status(400).json({ message: 'Missing required fields (score, difficulty, date)' });
        }

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        let activities = userDoc.data().activities || [];

        // Maintain the size of the activities array (maximum 10)
        if (activities.length >= 10) {
            activities.shift();
        }

        const newActivity = { score, difficulty, date };
        activities.push(newActivity);

        await userRef.update({ activities });

        res.status(201).json({ message: 'Activity added successfully', activities });
    } catch (error) {
        console.error('Error adding activity:', error);
        res.status(500).json({ message: 'Error adding activity', error: error.message });
    }
});


//Get user's name
router.get('/users/:uid/firstname', async (req, res) => {
    try {
        const { uid } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const firstname = userDoc.data().firstname;

        if (!firstname) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        res.status(200).json({firstname});
    } catch (error) {
        console.error('Error fetching name:', error);
        res.status(500).json({ message: 'Error fetching name', error });
    }
});

//Get user's lastname
router.get('/users/:uid/lastname', async (req, res) => {
    try {
        const { uid } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const lastName = userDoc.data().lastName;

        if (!lastName) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        res.status(200).json({lastName});
    } catch (error) {
        console.error('Error fetching lastname:', error);
        res.status(500).json({ message: 'Error fetching lastname', error });
    }
});

//Get user's email
router.get('/users/:uid/email', async (req, res) => {
    try {
        const { uid } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const email = userDoc.data().email;

        if (!email) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        res.status(200).json({email});
    } catch (error) {
        console.error('Error fetching email:', error);
        res.status(500).json({ message: 'Error fetching email', error });
    }
});

// Get all scores for a user
router.get('/users/:uid/scores', verifyToken, async(req, res) => {
    try {
        const { uid } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if(!userDoc.exists){
            return res.status(404).json({message: 'User not found'});
        }

        const userData = userDoc.data();
        const scores = userData.scores || [];

        res.status(200).json({scores});
    } catch (error)  {
        console.error('Error fetching scores:', error);
        res.status(500).json({ message: 'Error fetching scores', error });
    }
});

//Update user scores
router.post('/users/:uid/scores', verifyToken, async(req, res) => {
    try{
        const {uid} = req.params;
        const {scoreIncrement} = req.body;
        const today = new Date().toISOString().split('T')[0];

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if(!userDoc.exists){
            return res.status(404).json({ message: 'User not found' }); 
        }

        const userData = userDoc.data();
        const scores = userData.scores || [];

        const todayScoreIndex = scores.findIndex(score => score.date === today);

        if(todayScoreIndex !== -1){
            scores[todayScoreIndex].currentScore += scoreIncrement;
        } 
        else{

            const lastScore = scores.length > 0 ? scores[scores.length - 1].currentScore : 0;

            scores.push({
                date: today,
                currentScore: lastScore + scoreIncrement
            });
        }

        await userRef.update({ scores });

        res.status(200).json({ message: 'Score updated successfully', scores });
    } catch(error){
        console.error('Error updating scores:', error);
        res.status(500).json({ message: 'Error updating scores', error: error.message });
    }
}) 

// Delete a flashcard from a specific collection
router.delete('/users/:uid/collections/:collectionName/flashcards/:flashcardIndex', verifyToken, async (req, res) => {
    try {
        const { uid, collectionName, flashcardIndex } = req.params;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        const collection = userData.collections[collectionName];

        if (!collection || !collection.flashcards) {
            return res.status(404).json({ message: 'Collection or flashcards not found' });
        }

        const flashcards = collection.flashcards;
        if (flashcardIndex < 0 || flashcardIndex >= flashcards.length) {
            return res.status(400).json({ message: 'Invalid flashcard index' });
        }

        flashcards.splice(flashcardIndex, 1);

        await userRef.update({ [`collections.${collectionName}.flashcards`]: flashcards });
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        res.status(500).json({ message: 'Error deleting flashcard', error });
    }
});

// Update a flashcard in a specific collection
router.put('/users/:uid/collections/:collectionName/flashcards/:flashcardIndex', verifyToken, async (req, res) => {
    try {
        const { uid, collectionName, flashcardIndex } = req.params;
        const { question, answer, hint, image } = req.body;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        const collection = userData.collections[collectionName];

        if (!collection || !collection.flashcards) {
            return res.status(404).json({ message: 'Collection or flashcards not found' });
        }

        if (flashcardIndex < 0 || flashcardIndex >= collection.flashcards.length) {
            return res.status(400).json({ message: 'Invalid flashcard index' });
        }

        collection.flashcards[flashcardIndex] = {
            question,
            answer,
            hint: hint || null,
            image: image || null,
        };

        await userRef.update({ [`collections.${collectionName}.flashcards`]: collection.flashcards });
        res.status(200).json({ message: 'Flashcard updated successfully' });
    } catch (error) {
        console.error('Error updating flashcard:', error);
        res.status(500).json({ message: 'Error updating flashcard', error });
    }
});

// Update user profile fields, including Firebase Authentication email
router.put('/users/:uid', verifyToken, async (req, res) => {
    try {
        const { uid } = req.params;
        const { firstName, lastName, email } = req.body;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updates = {};
        if (firstName) updates.firstname = firstName;
        if (lastName) updates.lastName = lastName;
        if (email) updates.email = email;

        if (Object.keys(updates).length > 0) {
            await userRef.update(updates);
        }

        if (email) {
            await admin.auth().updateUser(uid, { email });
        }

        res.status(200).json({ message: 'Profile updated successfully', updates });
    } catch (error) {
        console.error('Error updating user profile:', error);

        if (error.code === 'auth/email-already-exists') {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
});

// Fetch geography questions
router.get('/trivia/geography', async (req, res) => {
    const { amount = 10, difficulty = 'medium' } = req.query; // Accept difficulty from query
    try {
        const response = await axios.get(TRIVIA_API_URL, {
            params: {
                categories: 'geography',
                limit: amount,
                difficulty,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching geography questions:', error.message);
        res.status(500).json({ message: 'Failed to fetch geography questions', error: error.message });
    }
});



module.exports = router;
