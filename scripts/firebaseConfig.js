// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);


export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password).then(cred => {

    //TEST: print user token
    //console.log(cred.user);

    // close the signup modal & reset form
    const signupForm = document.querySelector('#signup-form');
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  })};

export const signOut1 = () => {
  signOut(auth).then(() => {

    //TEST: print user signed out confirmation
    //console.log('user signed out');
    
  })
};
