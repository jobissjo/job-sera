import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAiPjXGXUMYWdBSRqEtztPAGl7S362xit4",

    authDomain: "sample-firebase-project-883bd.firebaseapp.com",

    databaseURL: "https://sample-firebase-project-883bd-default-rtdb.firebaseio.com",

    projectId: "sample-firebase-project-883bd",

    storageBucket: "sample-firebase-project-883bd.appspot.com",

    messagingSenderId: "944205289345",

    appId: "1:944205289345:web:1c720c0bf65349bda4ba80",

    measurementId: "G-NTD9MSZVFY"

  }
};

// Initialize Firebase

const app = initializeApp(environment.firebase);

const analytics = getAnalytics(app);