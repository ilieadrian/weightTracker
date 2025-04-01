import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD3S7QjWcwvN9QPb-lWaV7EXyIKW-BOkv0",
    authDomain: "weight-tracker-2eee6.firebaseapp.com",
    projectId: "weight-tracker-2eee6",
    storageBucket: "weight-tracker-2eee6.firebasestorage.app",
    messagingSenderId: "415805786895",
    appId: "1:415805786895:web:db9a80ba5e44fa7bcf8c7a"
};

const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInButton');

// Firebase Initialization
const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized", app);

// Ensure Firebase auth and Firestore are initialized correctly
const auth = getAuth();
const db = getFirestore();

if (signUpBtn) {
    signUpBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent form submission refresh
        
        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();
        
        console.log("User Input:", name, email, password); // Debugging log
        
        if (!name || !email || !password) {
            showMessage("All fields are required!", "signUpMessage");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User Created:", user);

            // Store user data in Firestore
            const userData = { email, name };
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, userData);
            
            showMessage("Account Created Successfully", "signUpMessage");
            window.location.href = "dashboard.html"; // Redirect after successful signup
        } catch (error) {
            console.error("Error:", error);
            if (error.code === "auth/email-already-in-use") {
                showMessage("Email Address Already Exists!", "signUpMessage");
            } else {
                showMessage("Unable to create user", "signUpMessage");
            }
        }
    });
}