//Library Imports
import firebase from "firebase/app";
import "firebase/auth";

//Initializing Firebase Authentication App
const app = firebase.initializeApp({
    apiKey: process.env.React_APP_FIREBASE_API_KEY,
    authDomain: process.env.React_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.React_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.React_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.React_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.React_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.React_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;
