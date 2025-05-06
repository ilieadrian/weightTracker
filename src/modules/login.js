import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
const passwordReset = document.getElementById("passwordReset");

signUpLink.addEventListener("click", function () {
  signInForm.classList.toggle("hidden");
  signUpForm.classList.toggle("hidden");
});

signInLink.addEventListener("click", function () {
  signInForm.classList.toggle("hidden");
  signUpForm.classList.toggle("hidden");
});

passwordReset.addEventListener("click", forgotPassword);

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
      if (error.code === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "signInMessage", "login");
      } else if (error.code === "auth/user-not-found") {
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

function showMessage(message, divId, login) {
  const messageDiv = document.getElementById("divId");
  const loginMessageDiv = document.getElementById("loginDivId");

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
}

function forgotPassword(){

  
  createPasswordResetModal()

  

  console.log("forgot password")
}

function createPasswordResetModal(){
  const html = `
    <!-- Main modal -->
      <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-md max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          Create New Product
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <!-- Modal body -->
                  <form class="p-4 md:p-5">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                          <div class="col-span-2">
                              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                              <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="">
                          </div>
                          <div class="col-span-2 sm:col-span-1">
                              <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                              <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="">
                          </div>
                          <div class="col-span-2 sm:col-span-1">
                              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                              <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                  <option selected="">Select category</option>
                                  <option value="TV">TV/Monitors</option>
                                  <option value="PC">PC</option>
                                  <option value="GA">Gaming/Console</option>
                                  <option value="PH">Phones</option>
                              </select>
                          </div>
                          <div class="col-span-2">
                              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                              <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                          </div>
                      </div>
                      <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                          Add new product
                      </button>
                  </form>
              </div>
          </div>
      </div> 
  `;
}
