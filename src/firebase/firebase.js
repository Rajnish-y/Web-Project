import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8ayp5FwqtWhLlfIGdh7WGUjiPnZsLQpI",
    authDomain: "doc-hive.firebaseapp.com",
    projectId: "doc-hive",
    storageBucket: "doc-hive.firebasestorage.app",
    messagingSenderId: "830048191692",
    appId: "1:830048191692:web:6469bdcd119b7b49f9ae69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default { auth, db };