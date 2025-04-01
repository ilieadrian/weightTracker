import "./styles.css";
import "./firebase";

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
