// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
    getFirestore,
    doc,
    getDocs,
    collection
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
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
const auth = getAuth();
const db = getFirestore();

//Get HTML Elements
let dashboard =document.getElementById("dashboard")
let signIn =document.getElementById("signIn")
let signOut =document.getElementById("signOut")

