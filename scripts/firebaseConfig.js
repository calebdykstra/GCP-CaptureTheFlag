// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAqXBnBtOdVHacdN2vfPpiU-RIDGuqY2ZM",

  authDomain: "fir-v2-4be27.firebaseapp.com",

  projectId: "fir-v2-4be27",

  storageBucket: "fir-v2-4be27.appspot.com",

  messagingSenderId: "779968149242",

  appId: "1:779968149242:web:b2aa479156fe8a9527fb43"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

