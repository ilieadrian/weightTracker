console.log("Hello from profile")
import "../styles.css";
import { auth, db, updateEmail, updatePassword } from "./firebaseConfig";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { logOut } from "./dashboard";
import { getUidCookie } from "./cookie-utils";

let status;

function generateProfileUI() {
  let container = document.querySelector(".dashboard-container");
  const htmlTag = document.getElementsByTagName("html")[0];
  const bodyTag = document.body;
  htmlTag.classList.add("h-full", "bg-gray-100");
  bodyTag.classList.add("h-full");

  if (!container) {
    container = document.createElement("div");
    container.classList.add("min-h-full");
    container.id = "dashboardContainer";
    document.body.appendChild(container);
  }
    return `
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img class="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="dashboard.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
                <a href="profile.html" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Profile</a>
                </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile -->
                <div class="flex rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5" role="menu" aria-orientation="horizontal" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-profile-link"></a>
                    <p class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">|</p>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="logout-link">Sign out</a>
                </div> 
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button" class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-controls="mobile-menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="md:hidden hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a href="dashboard.html" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-2">
            
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white" id="mobile-menu-name"></div>
              <div class="text-sm font-medium text-gray-400" id="mobile-menu-email"></div>
            </div>
            
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a href="profile.html" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Your Profile</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" id="logout-link-mobile">Sign out</a>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Your profile</h1>
      </div>
    </header>
      <div id="content-container" class="mx-auto max-w-7xl flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-5 max-w-md w-full mx-auto p-6 space-y-6 text-gray-800 dark:text-white">

      <!-- Profile Info -->
      
      <div class="space-y-2">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">Profile Information</h2>
        <p id="profile-name-container">Name: <span class="font-medium" id="profile-name"></span></p>
        <p id="profile-email-container">Email: <span class="font-medium" id="profile-email"></span></p>
        <p id="profile-weight-container">Height: <span class="font-medium" id="profile-height"></span> (cm)</p>
        <p id="profile-registered-on-container">Account registered on: <span class="font-medium" id="profile-registered-on"></span></p>
      </div>

    <div class="pt-4 border-t border-gray-200 dark:border-gray-700">


    <!-- Change account data accordion -->

      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="false" aria-controls="accordion-collapse-body-1">
            <span>Change name</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <form id="change-name-form" class="space-y-4">
              <div id="name-notification-container"></div>
              <div>
                <label for="new-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="text" id="new-name" required placeholder="Change name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <button type="submit" id="update-name-btn"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800">
                Update name
              </button>
            </form>
          </div>
        </div>

        <h2 id="accordion-collapse-heading-2">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
            <span>Change email</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <form id="change-email-form" class="space-y-4">
              <div id="email-notification-container"></div>
              <div>
                <label for="new-email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="email" id="new-email" required placeholder="Change email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <button type="submit" id="update-email-btn"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800">
                Update email
              </button>
            </form>
          </div>
        </div>

        <h2 id="accordion-collapse-heading-3">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
            <span>Change height</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <form id="change-height-form" class="space-y-4">
              <div id="height-notification-container"></div>
              <div>
                <label for="new-height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="text" id="new-height" required placeholder="Change height (centimeters)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <button type="submit" id="update-height-btn"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800">
                Update height
              </button>
            </form>
          </div>
        </div>

        <h2 id="accordion-collapse-heading-4">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-4" aria-expanded="false" aria-controls="accordion-collapse-body-4">
            <span>Change password</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-4" class="hidden" aria-labelledby="accordion-collapse-heading-4">
          <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
          <form id="change-password-form" class="space-y-4">
              <div id="password-notification-container"></div>
              <div>
                <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="password" id="new-password" required placeholder="New password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input type="password" id="confirm-password" required placeholder="Confirm new password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <button type="submit" id="update-password-btn"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800">
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <!--<div class="pt-4 border-t border-gray-200 dark:border-gray-700"> Change name
        <button id="change-password-btn"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
          focus:outline-none dark:focus:ring-blue-800">
          Change Password
        </button>
        -->


      </div>

    </div>
    </div>    
  `;
}

export function generateProfileContent(userData) {
  document.getElementById("profile-name").textContent =
    userData.name || "Unknown user";
  document.getElementById("profile-email").textContent =
    userData.email || "Unknown email";
    document.getElementById("profile-height").textContent =
    userData.height || "No height added yet.";
  document.getElementById("profile-registered-on").textContent = getFormattedDate(userData.createdAt);
}

function getFormattedDate(createdAt){
  const timestamp = createdAt;

  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  } else {
    return "Unknown date";
  }
}

async function getUserProfileDBData(){
  const uId = getUidCookie();
  try {
        const docRef = doc(db, "users", uId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          generateProfileContent(userData) 
        } else {
          console.log("No document found matching id");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
}

async function changeName(newName) {
  event.preventDefault();
  const uId = getUidCookie(); 
  const docRef = doc(db, "users", uId); 

  try {
    await updateDoc(docRef, {
      name: newName
    });

    status = "valid"
    displayUpdateMessage(status, "Name updated successfully", "name")
    getUserProfileDBData();
  } catch (error) {
    status = "error"
    displayUpdateMessage(status, error.message, "name")
  }
}

async function changeEmail(email) {
  event.preventDefault();
  try {
    await updateEmail(auth.currentUser, email);
    await updateUserEmail(email);
    status = "valid"
    displayUpdateMessage(status, "Email updated successfully", "email")
    getUserProfileDBData();
  } catch (error) {
    status = "error"
    displayUpdateMessage(status, error.message, "email")
  }
}

async function changeHeight(newHeight) {
  event.preventDefault();
  const uId = getUidCookie(); 
  const docRef = doc(db, "users", uId); 

  try {
    await updateDoc(docRef, {
      height: newHeight
    });

    status = "valid"
    displayUpdateMessage(status, "Height updated successfully", "height")
    getUserProfileDBData();
  } catch (error) {
    status = "error"
    displayUpdateMessage(status, error.message, "height")
  }
}

async function updateUserEmail(newEmail) {
  const uId = getUidCookie(); 
  const docRef = doc(db, "users", uId); 

  try {
    await updateDoc(docRef, {
      email: newEmail
    });
  } catch (error) {
    status = error;
    displayUpdateMessage(status, error.message, "email")
    return null;
  }
}

async function updateUserPassword(newPassword){
  const user = auth.currentUser;

  await updatePassword(user, newPassword).then(() => {
    status = "valid";
      displayUpdateMessage(status, "Password successfully updated", "password");
    }).catch((error) => {
      status = "error";
      displayUpdateMessage(status, error.message, "password");
    });
}

function displayUpdateMessage(status, message, field){
const containers = {
    name: document.getElementById("name-notification-container"),
    email: document.getElementById("email-notification-container"),
    height: document.getElementById("height-notification-container"),
    password: document.getElementById("password-notification-container")
  };

  const succesCode = 
    `
    <div id="alert-border-3" class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
          <div class="ms-3 text-sm font-medium">
            ${message}
          </div>
    </div>
    `;
  const errorCode = 
  `
    <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
        <div class="ms-3 text-sm font-medium">
          Error: ${message}.
      </div>
    </div>
  `;

  if(status === "valid"){
    containers[field].innerHTML = succesCode;
  } else {
    containers[field].innerHTML = errorCode;
  }
}

function checkEmailToChange() {
  event.preventDefault();
  const newEmailInput = document.getElementById("new-email").value.trim();
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(newEmailInput) === false) {
    status = "error";
    displayUpdateMessage(status, "Invalid Email Address", "email");
    return;
  } else {
    changeEmail(newEmailInput);
  }
}

function checkNameToChange(){
  event.preventDefault();
  const newNameInput = document.getElementById("new-name").value.trim();
  let reg = /^[\p{L} '’-]+$/u;

  if (!newNameInput) {
      status = "error";
      displayUpdateMessage(status, "Name cannot be empty", "name");
    } else if (!reg.test(newNameInput)) {
      status = "error"
      displayUpdateMessage(status, "Name contains invalid characters", "name");
      console.log("Name contains invalid characters");
    } else {
      changeName(newNameInput)
  }
}

function checkPasswordToChange(){
  event.preventDefault();
  const newPasswordInput = document.getElementById("new-password").value.trim();
  const confirmPasswordInput = document.getElementById("confirm-password").value.trim();

  let passwordReg = /^\S+$/;

  if (!newPasswordInput || !confirmPasswordInput ) {
      status = "error";
      displayUpdateMessage(status, "Please fill all the fields", "password");
    } else if (!passwordReg.test(newPasswordInput) || !passwordReg.test(confirmPasswordInput)) {
      status = "error"
      displayUpdateMessage(status, "Password cannot contain spaces", "password");
    } else if(newPasswordInput !== confirmPasswordInput){
      status = "error";
      displayUpdateMessage(status, "New passwords are not the same", "password");
    } else {
      updateUserPassword(newPasswordInput)
  }
}

function checkHeightToChange(){
  event.preventDefault();
  const newHeightInput = document.getElementById("new-height").value.trim();

  let reg = /^\d+([.,]\d{1,2})?$/;

  if (!newHeightInput) {
      status = "error";
      displayUpdateMessage(status, "Field cannot be empty", "height");
    } else if (!reg.test(newHeightInput)) {
      status = "error"
      displayUpdateMessage(status, "Input expects: Numbers (0-9), example 183 for 1.83 meters height", "height");
    } else {
      changeHeight(newHeightInput)
  }
}

getUserProfileDBData()

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = generateProfileUI();
  const menuButton = document.querySelector(".md\\:hidden button");
  const menuOpenIcon = menuButton.querySelector("svg:first-of-type"); // First SVG (Menu open icon)
  const menuCloseIcon = menuButton.querySelector("svg:last-of-type"); // Second SVG (Menu close icon)
  const logoutButton = document.getElementById("logout-link");
  const logoutButtonMobile = document.getElementById("logout-link-mobile");
  const updateEmailBtn = document.getElementById("update-email-btn");
  const updateNameBtn = document.getElementById("update-name-btn");
  const updatePasswordBtn = document.getElementById("update-password-btn");
  const updateHeightBtn = document.getElementById("update-height-btn");
  
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });

  updateEmailBtn.addEventListener("click", checkEmailToChange);
  updateNameBtn.addEventListener("click", checkNameToChange);
  updatePasswordBtn.addEventListener("click", checkPasswordToChange);
  updateHeightBtn.addEventListener("click", checkHeightToChange);

  logoutButton.addEventListener("click", logOut);
  logoutButtonMobile.addEventListener("click", logOut);
});