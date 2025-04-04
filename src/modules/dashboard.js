import "../styles.css";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, getDocs, doc, collection, addDoc  } from "firebase/firestore";
import { initFlowbite } from 'flowbite';

console.log("Hello from dashboard")


function generateDashboardUi(){
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
          <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
          <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-2">
            
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white" id="mobile-menu-name"></div>
              <div class="text-sm font-medium text-gray-400" id="mobile-menu-email"></div>
            </div>
            
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" id="logout-link-mobile">Sign out</a>
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
    <div id="content-container" class="mx-auto max-w-7xl flex flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">

        

<!-- drawer init and toggle -->
<div class="text-center">
   <button class="overflow-y-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example">
   Show top drawer
   </button>
</div>

<!-- drawer component -->
<div id="drawer-top-example" class="fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-top-label">
    <h5 id="drawer-top-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>Top drawer</h5>
    <button type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close menu</span>
   </button>
    <p class="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a href="#" class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">limited-time sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.</p>
   <a href="#" class="px-4 py-2 me-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more</a>
   <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get access <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg></a>
</div>



    </div>
</main>
</div>
  `;

  container.innerHTML = html;
  console.log("the dashboard has rendered")
}

// function updateUserData(userData, useruid) {
//     document.getElementById("user-profile-link").textContent = userData.name || "Unknown User";
//     document.getElementById("mobile-menu-name").textContent = userData.name || "Unknown User";
//     document.getElementById("mobile-menu-email").textContent = userData.email || "No Email Available";
//     const contentContainer = document.getElementById("content-container");


//     const html = `
//     <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

//     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Wellcome to the app</h5>
//     <p class="font-normal text-gray-700 dark:text-gray-400">Name: ${userData.name}</p>
//     <p class="font-normal text-gray-700 dark:text-gray-400">Email: ${userData.email}</p>
//     </a>


//     `;
// //     

//       // contentContainer.innerHTML = '';
//       const card = document.createElement("div");
      
//       card.classList.add("block", "max-w-sm", "p-6", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow-sm", "hover:bg-gray-100", "dark:bg-gray-800", "dark:border-gray-700", "dark:hover:bg-gray-700");
//       contentContainer.appendChild(card);
//       contentContainer.innerHTML = html;

//     getWeightData(useruid).then((weights) => {
//       console.log("Weights for user:", weights);
//     });


//     console.log("the dashboard has RERENDERED")
// }

// async function updateUserData(userData, useruid) {
//   document.getElementById("user-profile-link").textContent = userData.name || "Unknown User";
//   document.getElementById("mobile-menu-name").textContent = userData.name || "Unknown User";
//   document.getElementById("mobile-menu-email").textContent = userData.email || "No Email Available";

//   const contentContainer = document.getElementById("content-container");
//   contentContainer.innerHTML = ""; // Clear previous content

//   // Create user welcome card
//   const welcomeCard = document.createElement("a");
//   welcomeCard.href = "#";
//   welcomeCard.className = "block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
//   welcomeCard.innerHTML = `
//     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome to the app</h5>
//     <p class="font-normal text-gray-700 dark:text-gray-400">Name: ${userData.name}</p>
//     <p class="font-normal text-gray-700 dark:text-gray-400">Email: ${userData.email}</p>
//   `;
//   contentContainer.appendChild(welcomeCard);

//   // Fetch and render weights
//   const weights = await getWeightData(useruid);

//   if (weights.length === 0) {
//     contentContainer.innerHTML += "<p class='text-gray-500 mt-4'>No weight entries found.</p>";
//     return;
//   }

//   weights.forEach((entry) => {
//     const weightCard = document.createElement("div");
//     weightCard.className = "mt-4 block max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700";

//     const date = entry.date?.toDate?.() || new Date(entry.date); // Convert Firestore timestamp if needed

//     weightCard.innerHTML = `
//       <p class="text-gray-800 dark:text-gray-200">Weight: <strong>${entry.weight} kg</strong></p>
//       <p class="text-gray-600 dark:text-gray-400 text-sm">Date: ${date.toLocaleDateString()}</p>
//     `;

//     contentContainer.appendChild(weightCard);
//   });

//   console.log("Dashboard rendered");
// }

// async function getWeightData(useruid) {
//   try {
//     const weightsCollectionRef = collection(db, "users", useruid, "weights");
//     const querySnapshot = await getDocs(weightsCollectionRef);
    
//     const data = [];
//     querySnapshot.forEach((doc) => {
//       data.push({ id: doc.id, ...doc.data() });
//     });

//     return data;
//   } catch (error) {
//     console.error("Error fetching weights:", error);
//     return [];
//   }
// }

onAuthStateChanged(auth, async (user) => {
  // console.log("user", user)
  if (!user) {
      console.log("No user is logged in");
      window.location.href = "/index.html";
      return;
  }

  try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      console.log(docSnap)

      if (docSnap.exists()) {
          const userData = docSnap.data();
          // updateUserData(userData, user.uid);
      } else {
          console.log("No document found matching id");
      }
  } catch (error) {
      console.error("Error getting document:", error);
  }
});

async function logOut() {
  try {
    await signOut(auth);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error Signing out:', error);
  }
}

generateDashboardUi()

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".md\\:hidden button"); 
  const menuOpenIcon = menuButton.querySelector("svg:first-of-type"); // First SVG (Menu open icon)
  const menuCloseIcon = menuButton.querySelector("svg:last-of-type"); // Second SVG (Menu close icon)
  const mobileMenu = document.getElementById("mobile-menu");
  const logoutButton=document.getElementById('logout-link');
  const logoutButtonMobile=document.getElementById('logout-link-mobile');

  logoutButton.addEventListener("click", logOut);
  logoutButtonMobile.addEventListener("click", logOut);

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });
});

//The code to add data
// const weightsCollectionRef = collection(db, "users", user.uid, "weights");
// console.log("Collection Path:", weightsCollectionRef.path);

// await addDoc(weightsCollectionRef, {
//     weight: 72,
//     date: new Date()
// });