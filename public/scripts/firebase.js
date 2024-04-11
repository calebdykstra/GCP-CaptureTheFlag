// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { getFirestore, collection, query, where, doc, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { setupPosts, setupUI } from "./index.js";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries
// https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js

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
const functions = getFunctions();




/* ------------------------------------------------------------------------------*/



//Give users admin
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = httpsCallable(functions, 'addAdminRole');
  addAdminRole({ email: adminEmail }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log("There was an error with functions:", error);
  });
});



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
    document.querySelector('.error').innerHTML = '';
  }).catch((error) => {
    // If login fails, show the error message
    document.querySelector('.error').innerHTML = error.message;
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
    document.querySelector('.error').innerHTML = '';
  }).catch((error) => {
    // If login fails, show the error message
    document.querySelector('.error').innerHTML = error.message;
  });

});



// Listen for auth status change. Calls display method to display posts if logged in
onAuthStateChanged(auth, (user) => {

  //TEST: print user info every refresh
  /*if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  };*/

  if (user) {
    //TEST: print doc.id and doc.data in the console. prints error if user is not authorized to view docs.
    /*querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });*/
    user.getIdTokenResult().then(idTokenResult => {

      //TEST: print the boolean of if user is admin
      //console.log(idTokenResult.claims.admin);

      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    const query = collection(db, "posts");
    onSnapshot(query, (querySnapshot) => {
      setupPosts(querySnapshot);
    });
  } else {
    setupUI();
    setupPosts(null);
  };
});


// Function to set a cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Create new post
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    title: createForm['title'].value,
    content: createForm['content'].value
  };

  // Dynamically create a script element with the alert script
  //const script = document.createElement('script');
  //script.textContent = alert('XSS attack successful!');;

  // Append the script element to the document body
  //document.body.appendChild(script);

  // Add the post data to Firestore
  addDoc(collection(db, 'posts'), data).then((docRef) => {
    console.log("Document successfully written", docRef.id);
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch((error) => {
    console.error("Error writing document: ", error.message);
  });

  if (data.content === "<img src=x onerror=\"alert(document.cookie)\">") {
    // Set the cookie when the content matches the desired text
    setCookie("flag_cookie", "flag2048724", 1); // Change flag_value to your actual flag
    alert("XSS Attack Successful!");
  }

  
});