import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3S7QjWcwvN9QPb-lWaV7EXyIKW-BOkv0",
    authDomain: "weight-tracker-2eee6.firebaseapp.com",
    projectId: "weight-tracker-2eee6",
    storageBucket: "weight-tracker-2eee6.firebasestorage.app",
    messagingSenderId: "415805786895",
    appId: "1:415805786895:web:db9a80ba5e44fa7bcf8c7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };