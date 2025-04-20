// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8ayp5FwqtWhLlfIGdh7WGUjiPnZsLQpI",
    authDomain: "doc-hive.firebaseapp.com",
    projectId: "doc-hive",
    storageBucket: "doc-hive.firebasestorage.app",
    messagingSenderId: "830048191692",
    appId: "1:830048191692:web:6469bdcd119b7b49f9ae69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default { auth, db };