// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, query, where, doc, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { setupPosts, setupUI } from "./index.js";

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







//Signup
const signupForm = document.querySelector('#signup-form');
const signupErrorMessage = document.getElementById('signup-error-message');
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
  }).catch((error) => {
    // If login fails, show the error message
    signupErrorMessage.style.display = 'block';
    console.error('signup error', error);
  });

});



//Signout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => {

    //TEST: print user signed out confirmation
    //console.log('user signed out');
  })
});



//Login
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  const modal = document.querySelector('#modal-login');
  const loginForm = document.querySelector('#login-form');
  const loginErrorMessage = document.getElementById('login-error-message');

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  //log the user in
  // Attempt to sign in with email and password
  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    //TEST: print user information when signed in
    //console.log(cred);
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch((error) => {
    // If login fails, show the error message
    loginErrorMessage.style.display = 'block';
    console.error('login error', error);
  });

});



// Listen for auth status change. Calls display method to display posts if logged in
onAuthStateChanged(auth, (user) => {

  //TEST: print user info every refresh
  /*if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  }*/

  if (user) {
    //TEST: print doc.id and doc.data in the console. prints error if user is not authorized to view docs.
    /*querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });*/
    const query = collection(db, "posts");
    getDocs(query).then((querySnapshot) => {
      setupPosts(querySnapshot);
      setupUI(user);
    }).catch((error) => {
      console.error("Error fetching posts: ", error);
      setupPosts(null);
    });
  } else {
    setupUI();
    setupPosts(null);
  }
});



//create new post
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = {
    title: createForm['title'].value,
    content: createForm['content'].value
  };

  addDoc(collection(db, 'posts'), data).then((docRef) => {
    console.log("Document successfully written", docRef.id);
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch((error) => {
    console.error("Error writing document: ", error.message);
  });

});