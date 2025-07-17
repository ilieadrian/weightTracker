console.log("Hello from profile")
import "../styles.css";
import { auth, db, updateEmail, sendEmailVerification  } from "./firebaseConfig";
import {
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";


import { logOut } from "./dashboard";
import { getUidCookie } from "./cookie-utils";

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


async function updateUserEmail(newEmail) {
  const uId = getUidCookie(); // your custom function to get UID from cookie

  const docRef = doc(db, "users", uId); // reference to single document

  try {
    console.log("Try to updateUserEmail(newEmail)", newEmail)
    await updateDoc(docRef, {
      email: newEmail
    });
  } catch (error) {
    console.error("Error fetching user email:", error);
    return null;
  }
}



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
        <p id="profile-name"><span class="font-medium">Name: </span></p>
        <p id="profile-email"><span class="font-medium">Email: </span></p>
        <p id="profile-registered-on"><span class="font-medium">Account registered on: </span></p>
      </div>

      <!-- Change Email -->
      <form id="change-email-form" class="space-y-4">
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
          Update Email
        </button>
      </form>

      <!-- Change Password -->
      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button id="change-password-btn"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 
          focus:outline-none dark:focus:ring-blue-800">
          Change Password
        </button>
      </div>

    </div>
    </div>    
  `;
}

export function generateProfileContent(userData) {
  document.getElementById("profile-name").textContent +=
    userData.name || "Unknown user";
  document.getElementById("profile-email").textContent +=
    userData.email || "Unknown email";
  document.getElementById("profile-registered-on").textContent += getFormattedDate(userData.createdAt);
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



async function changeEmail(event) {
  event.preventDefault();

  const newEmailInput = document.getElementById("new-email").value.trim();

  try {
    await updateEmail(auth.currentUser, newEmailInput);
    updateUserEmail(newEmailInput)
    console.log("Email updated successfully");

    // Send verification email to the new address
    // await sendEmailVerification(auth.currentUser);
    // console.log("Verification email sent to new address");

    // alert("Email updated. Please verify your new email address.");

    // Optionally, update Firestore if you're storing the email there too
      //Display a mesaage


  } catch (error) {
    console.error("Error updating email:", error);
    alert(`Failed to update email: ${error.message}`);

    //research - on a new account
    //Failed to update email: Firebase: Error (auth/email-already-in-use).
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
  const updateEmailBtn = document.getElementById("update-email-btn") 
  

  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });

  updateEmailBtn.addEventListener("click", changeEmail);

  logoutButton.addEventListener("click", logOut);
  logoutButtonMobile.addEventListener("click", logOut);
});

