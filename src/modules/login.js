import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDoc, doc, collection, addDoc } from "firebase/firestore";

console.log("hello from login.js");

//  onAuthStateChanged(auth, async (user) => {

//     console.log("user", user)
//     if (user) {
//         console.log("User is still logged in");
//         window.location.href = "/dashboard.html";
//         return;
//     }
// });

const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInButton");
const signUpLink = document.getElementById("signUpLink");
const signInLink = document.getElementById("signInLink");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");
const passwordResetBtn = document.getElementById("email-pswd-rest-btn");

signUpLink.addEventListener("click", function () {
  signInForm.classList.toggle("hidden");
  signUpForm.classList.toggle("hidden");
});

signInLink.addEventListener("click", function () {
  signInForm.classList.toggle("hidden");
  signUpForm.classList.toggle("hidden");
});

passwordResetBtn.addEventListener("click", checkEmailToReset);

if (signUpBtn) {
  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signUpName").value.trim();
    const email = document.getElementById("signUpEmail").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();

    if (!name || !email || !password) {
      showMessage("All fields are required!", "signUpMessage", null);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const userData = {
        name: name,
        email: email,
        createdAt: new Date(),
      };
      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, userData);

      const weightsCollectionRef = collection(db, "users", user.uid, "weights");
      console.log("Collection Path:", weightsCollectionRef.path);

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
      if (error.code === "auth/email-already-in-use") {
        showMessage("Email address already exists!", "signUpMessage", null);
      } else if (error.code === "auth/weak-password") {
        showMessage(
          " Password should be at least 6 characters!",
          "signUpMessage",
          null,
        );
      } else {
        console.error("Sign in error:", error);
        showMessage("Unable to create user", "signUpMessage", null);
      }
    }
  });
}

if (signInBtn) {
  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signInEmail").value.trim();
    const password = document.getElementById("signInPassword").value.trim();

    if (!email || !password) {
      showMessage("All fields are required!", "signInMessage");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      window.location.href = "/dashboard.html";
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        showMessage("Invalid email", "signInMessage", "login");
      } else if(error.code === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "signInMessage", "login");
      }
        else if (error.code === "auth/user-not-found") {
        showMessage(
          "No account found with this email",
          "signInMessage",
          "login",
        );
      } else if (error.code === "auth/too-many-requests") {
        showMessage(
          "Too many failed attempts. Try again later.",
          "signInMessage",
          "login",
        );
      } else {
        console.error("Sign in error:", error);
        showMessage(
          "Something went wrong. Please try again.",
          "signInMessage",
          "login",
        );
      }
    }
  });
}

function showMessage(message, divId, login, pswReset) {
  const messageDiv = document.getElementById("divId");
  const loginMessageDiv = document.getElementById("loginDivId");
  const resetEmailDivId = document.getElementById("resetEmailDivId");

  if (login !== null) {
    loginMessageDiv.classList.add(
      "bg-red-100",
      "border",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
    );
    loginMessageDiv.style.display = "block";
    loginMessageDiv.innerHTML = message;
    loginMessageDiv.style.opacity = 1;
  } else {
    messageDiv.classList.add(
      "bg-red-100",
      "border",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
    );
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
  }

  if(pswReset){
    resetEmailDivId.classList.add(
      "bg-red-100",
      "border",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
      "col-span-2",
    );
    resetEmailDivId.style.display = "block";
    resetEmailDivId.innerHTML = pswReset;
    resetEmailDivId.style.opacity = 1;
  } 
}

function checkEmailToReset() {
  const email = document.getElementById("reset-email").value.trim();
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(email) == false) {
    console.log(email)
    showMessage(null, null, null, "Invalid Email Address");
    return;
    } else {
    //closes the modal by simulating a click on it  
    document.querySelector('[data-modal-toggle="crud-modal"]').click();
    forgotPassword(email);
  }
}

function forgotPassword() {
  const email = document.getElementById("reset-email").value.trim();

  console.log("Email to be reseted", email.value);

  console.log(auth)
  sendPasswordResetEmail(auth, email)
    .then(() => {

      // Password reset email sent!
      // ..
      alert("Email is sent")

    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)


      showMessage(null, null, null, errorMessage)
      // ..
    });

  


}
