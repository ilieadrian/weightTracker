import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

console.log("hello from login.js")

const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInButton');
const signUpLink = document.getElementById("signUpLink");
const signInLink = document.getElementById("signInLink");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");
const passwordReset = document.getElementById("passwordReset");

signUpLink.addEventListener("click", function () {
    signInForm.classList.toggle("hidden");
    signUpForm.classList.toggle("hidden");
});

signInLink.addEventListener("click", function () {
    signInForm.classList.toggle("hidden");
    signUpForm.classList.toggle("hidden");
});

passwordReset.addEventListener("click", function () {
    alert("Functionality to be implemented")
});

const firebaseConfig = {
    apiKey: "AIzaSyD3S7QjWcwvN9QPb-lWaV7EXyIKW-BOkv0",
    authDomain: "weight-tracker-2eee6.firebaseapp.com",
    projectId: "weight-tracker-2eee6",
    storageBucket: "weight-tracker-2eee6.firebasestorage.app",
    messagingSenderId: "415805786895",
    appId: "1:415805786895:web:db9a80ba5e44fa7bcf8c7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

if (signUpBtn) {
    signUpBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 

        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();
        
        if (!name || !email || !password) {
            showMessage("All fields are required!", "signUpMessage", null);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User Created:", user);

            const userData = { email, name };
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, userData);
            
            window.location.href = "index.html"; 
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

if (signInBtn) {
    signInBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 

        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();
        
        if (!email || !password) {
            showMessage("All fields are required!", "signInMessage");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
                    
            showMessage("Successfully logged in", "signInMessage", "successMessage");
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = "/dashboard.html"; 
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                showMessage("Incorrect Email or Password", "signInMessage", "login");
            } else if (error.code === "auth/user-not-found") {
                showMessage("No account found with this email", "signInMessage", "login");
            } else if (error.code === "auth/too-many-requests") {
                showMessage("Too many failed attempts. Try again later.", "signInMessage",  "login");
            } else {
                showMessage("Something went wrong. Please try again.", "signInMessage", "login");
            }
        }
    });
}

function showMessage(message, divId, login){
    const messageDiv = document.getElementById('divId');
    const loginMessageDiv = document.getElementById('loginDivId');
        
    if(login !== null) {
        loginMessageDiv.classList.add("bg-red-100", "border", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative");
        loginMessageDiv.style.display="block";
        loginMessageDiv.innerHTML = message;
        loginMessageDiv.style.opacity=1;
    } else {
        messageDiv.classList.add("bg-red-100", "border", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative");
        messageDiv.style.display="block";
        messageDiv.innerHTML = message;
        messageDiv.style.opacity=1;
    } 
}