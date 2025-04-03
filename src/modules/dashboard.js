import "../styles.css";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

console.log("Hello from dashboard")

function generateDashboardUi(){
    console.log("auth.currentUser", auth.user)
    let container = document.querySelector('.dashboard-container');
    const htmlTag = document.getElementsByTagName("html")[0];
    const bodyTag = document.body;
    htmlTag.classList.add("h-full","bg-gray-100");
    bodyTag.classList.add("h-full");

    if (!container) {
      container = document.createElement("div");
      container.classList.add("min-h-full");
      container.id = 'dashboardContainer'
      document.body.appendChild(container);
    }
    //dashboard source https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/stacked
    const html = `
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
                <a href="#" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
                <!-- Profile -->
                <div class="flex rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5" role="menu" aria-orientation="horizontal" aria-labelledby="user-menu-button" tabindex="-1">
                    <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Ionel Sofronea</a>
                    <p class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">|</p>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
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
          <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-2">
            
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white">Tom Cook</div>
              <div class="text-sm font-medium text-gray-400">tom@example.com</div>
            </div>
            
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
          </div>
        </div>
      </div>
    </nav>

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main class="min-h-full">
    <div class="mx-auto max-w-7xl flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
      <p id="pending-message">Getting data! Please wait</p>

    </div>
</main>
</div>
  `;

  container.innerHTML = html;
  console.log("the dashboard has rendered")
}

// function updateUserData(name, email) {
//     document.getElementById("userName").textContent = name || "Unknown User";
//     document.getElementById("userEmail").textContent = email || "No Email Available";
// }

onAuthStateChanged(auth, async (user) => {
  if (!user) {
      console.log("No user is logged in");
      window.location.href = "/index.html";
      return;
  }

  try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          const userData = docSnap.data();
          // updateUserData(userData.name, userData.email);
      } else {
          console.log("No document found matching id");
      }
  } catch (error) {
      console.error("Error getting document:", error);
  }
});

// const logoutButton=document.getElementById('logout');

// logoutButton.addEventListener('click',()=>{
//   localStorage.removeItem('loggedInUserId');
//   signOut(auth)
//   .then(()=>{
//       window.location.href='index.html';
//   })
//   .catch((error)=>{
//       console.error('Error Signing out:', error);
//   })
// })

generateDashboardUi()

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".md\\:hidden button"); 
  const menuOpenIcon = menuButton.querySelector("svg:first-of-type"); // First SVG (Menu open icon)
  const menuCloseIcon = menuButton.querySelector("svg:last-of-type"); // Second SVG (Menu close icon)
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });
});
