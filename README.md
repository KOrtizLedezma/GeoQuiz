# GeoQuiz Project

## Overview

GeoQuiz is an innovative educational platform designed to make learning geography engaging and enjoyable. By incorporating gamification elements, collaborative tools, and customizable flashcard creation, GeoQuiz transforms the traditional study experience into an interactive and goal-oriented journey.

### Key Features

1. **Interactive Question Mini-Game**

   - Test your geography knowledge through a fun and competitive game format.

2. **Flashcard Creation & Collections**

   - Create your own flashcards, organize them into collections, and share them with others for collaborative learning.

3. **Badge System & Progress Tracking**

   - Earn achievements, level up, and track your progress as you complete activities and challenges.

4. **Collaborative Flashcard Sharings**

   - Share flashcards with peers, fostering a collaborative and engaging study environment.

5. **Dashboard Tabs**

   - Organized interface for accessing activities, achievements, progress tracking, and user profiles.

6. **CRUD Operations**

   - Fully implemented Create, Read, Update, Delete functionality for quizzes and flashcards.

7. **Virtual Geography Tasks**

   - Participate in map-based games and other geography activities to enhance learning and retention.

### Project Vision

## **FOR**

- Students seeking an engaging and collaborative way to enhance their geographical knowledge.
  
## **WHO**

- Individuals who find it challenging to prepare for geography quizzes or wish to study in a fun, competitive environment.
  
## **THAT**

- Provides a platform for creating, collaborating, and testing each other through interactive quizzes and customizable flashcards.
  
## **UNLIKE**

- Conventional online study tools that lack incentives, rewards, and interactive map-based games.
  
## **OUR PRODUCT**

- GeoQuiz leverages gamification, collaborative features, and visual tools to make geography education dynamic, enjoyable, and competitive.

## **How to get Started**

This project is divided into two parts: the **Frontend** and the **Backend**. Each section below explains the necessary steps to set up and run the application.

---

## Frontend

### Setup

1. **Navigate to the Frontend Directory:**
   The frontend code is located in the `geoquiz` directory.

   ```bash
   cd geoquiz
   ```

2. **Install Dependencies:**
   Make sure to install the required dependencies using `npm`.

   ```bash
   npm install
   ```

3. **Environment Variables:**
   You will need to create a `.env` file at the root of the `geoquiz` directory with your Firebase configuration details.

   Example `.env` file:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   NEXT_PUBLIC_PORT=5000
   ```

4. **Running the Frontend:**
   To start the frontend application, run:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

5. **Notes**
   - If you get a Network Error, try changing the port number in both Frontend and Backend.
   - Make sure that your `NEXT_PUBLIC_PORT` has the same value in both Frontend and Backend.

---

## Backend

### Setup-Backend

1. **Navigate to the Backend Directory:**
   The backend code is located in the `geoquiz-backend` directory.

   ```bash
   cd geoquiz-backend
   ```

2. **Install Dependencies:**
   Install the necessary dependencies using `npm`:

   ```bash
   npm init -y
   ```

   ```bash
   npm install
   ```

3. **Service Account Key:**
   You will need to include the `serviceAccountKey.json` file from Firebase for accessing Firebase Admin features. Make sure the `serviceAccountKey.json` file is placed in the `geoquiz-backend` directory. This file contains sensitive information, so be sure **not** to commit it to your repository.

4. **Environment Variables:**
   You will need to create a `.env` file on the backend and add the following line of code to the file.

   ```bash
   NEXT_PUBLIC_PORT=5000
   NEXT_PUBLIC_TRIVIA_API_URL=https://the-trivia-api.com/api/questions
   ```

5. **Running the Backend:**
   To run the backend with `nodemon` for automatic restarts, use the following command:

   ```bash
   nodemon server.js
   ```

   If the server gets any error while deploying, try changing the port on the `.env` to `5001, 5002, ...`

---

### Notes

- Ensure that both the frontend and backend are running simultaneously for the full functionality of the application.
- Be careful not to expose sensitive credentials like your Firebase config or `serviceAccountKey.json` publicly.
- If you are unable to see certain buttons or elements, please try reducing the zoom level in your browser.