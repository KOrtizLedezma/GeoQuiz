
# GeoQuiz Project

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
   Make sure to install the required dependencies using `npm` or `yarn`.

   ```bash
   npm install
   ```

3. **Required Packages:**
   The following packages need to be installed:
   - **Firebase** for authentication and Firestore interaction.
   - **Framer Motion** for animations.

   These are already listed in `package.json`, but you can manually install them if needed:

   ```bash
   npm install firebase
   ```

   ```bash
   npm install framer-motion
   ```

4. **Environment Variables:**
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
   ```

5. **Running the Frontend:**
   To start the frontend application, run:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

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
   npm install
   ```

3. **Required Packages:**
   The following packages are required:
   - **Firebase Admin SDK** for managing Firebase authentication and Firestore access.
   - **Nodemon** for automatically restarting the server during development.

   You can install them manually if needed:

   ```bash
   npm install firebase-admin nodemon
   ```

   ```bash
   npm install nodemon
   ```

4. **Service Account Key:**
   You will need to include the `serviceAccountKey.json` file from Firebase for accessing Firebase Admin features. Make sure the `serviceAccountKey.json` file is placed in the `geoquizbackend` directory. This file contains sensitive information, so be sure **not** to commit it to your repository.

5. **Running the Backend:**
   To run the backend with `nodemon` for automatic restarts, use the following command:

   ```bash
   nodemon server.js
   ```

---

### Notes

- Ensure that both the frontend and backend are running simultaneously for the full functionality of the application.
- Be careful not to expose sensitive credentials like your Firebase config or `serviceAccountKey.json` publicly.
