import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInButton');

const firebaseConfig = {
    apiKey: "AIzaSyD3S7QjWcwvN9QPb-lWaV7EXyIKW-BOkv0",
    authDomain: "weight-tracker-2eee6.firebaseapp.com",
    projectId: "weight-tracker-2eee6",
    storageBucket: "weight-tracker-2eee6.firebasestorage.app",
    messagingSenderId: "415805786895",
    appId: "1:415805786895:web:db9a80ba5e44fa7bcf8c7a"
};


const app = initializeApp(firebaseConfig);
console.log("Firebase Initialized", app);

const auth = getAuth();
const db = getFirestore();

if (signUpBtn) {
    signUpBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 

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
            
            showMessage("Account created successfully", "signUpMessage", "succesMessage");
            window.location.href = "dashboard.html"; // Redirect after successful signup
            //to be added
        } catch (error) {
            console.error("Error:", error);
            if (error.code === "auth/email-already-in-use") {
                showMessage("Email address already exists!", "signUpMessage", null);
            } else if(error.code === "auth/weak-password"){
                showMessage(" Password should be at least 6 characters!", "signUpMessage", null);
            }            
            else {
                showMessage("Unable to create user", "signUpMessage", null);
            }
        }
    });
}

function showMessage(message, divId, succesMessage){
    const messageDiv = document.getElementById('divId');
    
    if(succesMessage !== null) {
        messageDiv.classList.add("bg-teal-100", "border", "border-teal-500", "text-teal-900", "px-4", "py-3", "rounded", "relative")
    } else {
        messageDiv.classList.add("bg-red-100", "border", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative")
    }
 
    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity=1;

}