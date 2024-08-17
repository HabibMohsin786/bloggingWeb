// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
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
let auth = getAuth();
let db = getFirestore();
let storage = getStorage();

// Get HTML Elements
let title = document.getElementById("title");
let content = document.getElementById("content");
let blogCategory = document.getElementById("blogCategory");
let blogImage = document.getElementById("blogImage");
let prog = document.getElementById("prog");

let uploads = () => {
  return new Promise((resolve, reject) => {
    let files = blogImage.files[0];
    console.log(files);
    const randomNum = Math.random().toString().slice(2);

    const storageRef = ref(storage, `blogImages/${randomNum}`);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        prog.value = progress;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        alert(error.message);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);

          resolve(downloadURL);
        });
      }
    );
  });
};

window.addBlog = async () => {
  let obj = {
    title: title.value,
    content: content.value,
    blogCategory: blogCategory.value,
  };
  console.log(obj);

  //   check validation

  await uploads()
    .then((url) => {
      obj.imageUrl = url;
      console.log(obj);

      // send to database
    })
    .catch((err) => {
      console.log(err);
    });

  const referance =  doc(collection(db, "blog"));
  await setDoc(referance, obj).then((res)=>{
    window.location.replace('../../index.html')
  }).catch((err)=>{
    alert(err.message);
    
  });
  
  
};
