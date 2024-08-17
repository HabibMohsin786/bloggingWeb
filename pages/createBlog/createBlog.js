// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
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
const db = getFirestore();
const storage = getStorage();

// Get HTML Elements
let title = document.getElementById("title")
let content = document.getElementById("content")
let category = document.getElementById("category")
let image = document.getElementById("image")

// Get Image URL
let uploads = () => {
    return new Promise((resolve, reject) => {
        let files = image.files[0];
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

// Add Blog Function
window.addPost = async () => {
    let obj = {
        title: title.value,
        content: content.value,
        category: category.value,
    }
    console.log(obj);
    //Add Image URL In Object 
    await uploads()
        .then((url) => {
            obj.blogImageURL = url
            console.log(obj);
        })
        .catch((err) => {
            alert(err.message)
        });

    const refrence = doc(collection(db, "blog"));
    await setDoc(refrence, obj)
        .then((res) => {
            window.location.replace("../../index.html")
        })
        .catch((err) => {
            alert(err.message)
        })
}