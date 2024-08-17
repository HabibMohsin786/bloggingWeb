// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBApvChVf12Kvn8w_e3sPDaBt9B7KGmzWc",
  authDomain: "hackathonblogging.firebaseapp.com",
  projectId: "hackathonblogging",
  storageBucket: "hackathonblogging.appspot.com",
  messagingSenderId: "964885571650",
  appId: "1:964885571650:web:027ea89b24b3370bbc65db",
  measurementId: "G-YLG51XKBSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const aith = getAuth();

// Get HTML Elements
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signIn = () => {
  let obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);
};
