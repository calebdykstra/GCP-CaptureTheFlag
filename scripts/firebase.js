// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { setupPosts } from "./index.js";

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



/* ------------------------------------------------------------------------------*/



// Listen for auth status change. returns null if noone is logged in.
onAuthStateChanged(auth, (user) => {

  //TEST: print user info every refresh
  if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  }

});



//Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //TEST: print the signup credentials to the console
  //console.log(email, password);

  // sign up the user
  createUserWithEmailAndPassword(auth, email, password).then(cred => {

    //TEST: print user token
    //console.log(cred.user);

    // close the signup modal & reset form
    const signupForm = document.querySelector('#signup-form');
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    window.location.reload();
  })

});



//Signout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => {

    //TEST: print user signed out confirmation
    //console.log('user signed out');

    window.location.reload();
  })
});



//Login
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  const modal = document.querySelector('#modal-login');
  const loginForm = document.querySelector('#login-form');

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  //log the user in
  signInWithEmailAndPassword(auth, email, password).then((cred) => {

    //TEST: print user information when signed in
    console.log(cred);

    M.Modal.getInstance(modal).close();
    loginForm.reset();
    window.location.reload();
  })
});



// Firestore collection access
/*
collection('posts').get().then(snapshot => {
  setupPosts(snapshot.docs);
});*/
const querySnapshot = await getDocs(collection(db, "posts"));
setupPosts(querySnapshot);
//TEST: print doc.id and doc.data in the console. prints error if user is not authorized to view docs.
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});