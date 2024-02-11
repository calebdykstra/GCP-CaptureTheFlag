// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCG2JUqNI5IgB94VSDcGdBl3hIvWTS_xlY",

  authDomain: "fir-v1-d6ac4.firebaseapp.com",

  projectId: "fir-v1-d6ac4",

  storageBucket: "fir-v1-d6ac4.appspot.com",

  messagingSenderId: "594317482980",

  appId: "1:594317482980:web:4e3bb7b42f3cbe16ff05f1",

  measurementId: "G-F7V7B952WB"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);