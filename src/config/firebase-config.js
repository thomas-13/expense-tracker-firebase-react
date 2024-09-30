// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_xm3L9GJnqTjWi01RBu0V8e5X5PoAkt4",
    authDomain: "expense-tracker-90aa1.firebaseapp.com",
    projectId: "expense-tracker-90aa1",
    storageBucket: "expense-tracker-90aa1.appspot.com",
    messagingSenderId: "865904414688",
    appId: "1:865904414688:web:c4529d0917cb2072386585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

//Commands to connect db
// firebase login
// firebase init
// firebase deploy