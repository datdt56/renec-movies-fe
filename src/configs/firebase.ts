// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "@firebase/auth";
import {collection, getFirestore, orderBy, query, where} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuhITB31itgU5XFRcZoUZlbo2risU4YKo",
    authDomain: "funny-movies-c7515.firebaseapp.com",
    projectId: "funny-movies-c7515",
    storageBucket: "funny-movies-c7515.appspot.com",
    messagingSenderId: "144404869159",
    appId: "1:144404869159:web:e6d2e822d2aebfbe3d9e02",
    measurementId: "G-65EXBKR4YD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// auth.onAuthStateChanged((user) => {
//     console.log('auth change', user)
//     if (!user) userProxy.logout() // Logged out
//     else userProxy.login(user)
// });

const db = getFirestore(app);
const videosCollRef = query(collection(db, "videos"), orderBy("createdAt", "desc"))

export {
    auth,
    videosCollRef
}