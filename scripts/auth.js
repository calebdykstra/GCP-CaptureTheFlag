import { app, auth, signUp, signOut1 } from './firebaseConfig.js';

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;


    //TEST: print the signup credentials to the console
    //console.log(email, password);


    // sign up the user
    signUp(email, password);
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut1();
});

//login