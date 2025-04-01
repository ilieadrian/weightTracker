import "./styles.css";
import "./firebase";

const signUpLink = document.getElementById("signUpLink");
const signInLink = document.getElementById("signInLink");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");
const passwordReset = document.getElementById("passwordReset");

signUpLink.addEventListener("click", function () {
    console.log("SignUP clickd")
    signInForm.classList.add("hidden");
    signUpForm.classList.remove("hidden");
});

signInLink.addEventListener("click", function () {
    console.log("SignIN clickd")
    signUpForm.classList.add("hidden");
    signInForm.classList.remove("hidden");
});

passwordReset.addEventListener("click", function () {
    alert("Functionality to be implemented")
});
