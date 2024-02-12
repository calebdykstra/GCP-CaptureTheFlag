import { app, auth, signUp, signOut1, login1 } from './firebaseConfig.js';

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
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //log the user in
    login1(email, password);
})