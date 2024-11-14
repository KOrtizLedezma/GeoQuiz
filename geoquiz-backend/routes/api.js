const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const verifyToken = require('../verifyToken');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { uid, email, firstName, lastName } = req.body;
    
        if (!uid || !email || !firstName || !lastName) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        const userRef = db.collection('users').doc(uid);
        await userRef.set({
          email: email,
          firstname: firstName,
          lastName: lastName,
          collections: [],
          scores: [{date: "2024-10-22", currentScore: 0},{date: "2024-10-23", currentScore: 70},{date: "2024-10-24", currentScore: 100}]
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

//Get user's name
router.get('/users/:uid', async (req, res) => {
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

module.exports = router;
