import "../styles.css";
import { setupCrudListeners } from "./crud";
import { getEvolution } from "./evolution.js";
import { getBMI} from "./calculateBMI.js"
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  addDoc,
  orderBy,
  query,
  Timestamp
} from "firebase/firestore";
import {
  handleSubmit,
  validateWeightRecord,
  setSubmitButtonState,
  setDrawerFieldsState
} from './formValidation.js';
import { generateNewRecordDrawer } from "./drawer.js";
import { setCookie, deleteUidCookie } from "./cookie-utils.js";

export let userUid = null;
export let currentUserData;
const pageSize = 10;
export let currentPage = 1;
export let cachedWeights = [];
let pagesArr = []
let paginationListenerAttached = false;

console.log("Hello from dashboard");

function generateDashboardUi() {
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
                <a href="dashboard.html" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Dashboard</a>
                <a href="profile.html" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
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
          <!--<a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a> -->
        </div>
        <div class="border-t border-gray-700 pt-4 pb-3">
          <div class="flex items-center px-2">
            
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white" id="mobile-menu-name"></div>
              <div class="text-sm font-medium text-gray-400" id="mobile-menu-email"></div>
            </div>
            
          </div>
          <div class="mt-3 space-y-1 px-2">
            <a href="profile.html" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
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
      ${generateNewRecordDrawer()}

      ${generateRecordsTable()}

      <ul id="pagination-container" class="w-full flex justify-center items-center py-4 -space-x-px text-sm">

    </div>
</main>
</div>
  `;

  container.innerHTML = html;

  initFlowbite();
  console.log("the dashboard has rendered");
}

function generateRecordsTable() {
  const html = `
      <div class="relative shadow-md sm:rounded-lg mt-5">
      <table class="min-w-[700px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Weight
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Evolution
                  </th>
                  <th scope="col" class="px-6 py-3">
                      BMI
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Comments
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Actions
                  </th>
              </tr>
          </thead>
          <tbody id="t-body">
              
          </tbody>
        </table>
      </div>
  `;
  console.log("the recordsTable has rendered");
  return html;
}

export async function registerNewRecord(date, weight, comments) {
  try {
    console.log("Start adding input to DB");
    
    const weightsCollectionRef = collection(db, "users", userUid, "weights");
    const dateObj = parseDDMMYYYY(date);
    const timestamp = Timestamp.fromDate(dateObj);
    
    const docRef = await addDoc(weightsCollectionRef, {
      timestamp: timestamp,
      date: date,
      weight: weight,
      comments: comments,
    });
      console.log("Document written with ID: ", docRef.id);
      await updateWeightsTable(userUid, currentPage)

  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export function parseDDMMYYYY(dateString) {
  const [day, month, year] = dateString.split("-");
  return new Date(year, month - 1, day); // month is 0-based
}

export async function getWeightData(useruid) {
  const weightsRef = collection(db, "users", useruid, "weights");
  const weightsRefOrdered = query(weightsRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(weightsRefOrdered);

  const weights = [];

  querySnapshot.forEach((doc) => {
    weights.push({
      id: doc.id,
      ...doc.data(),
      evolution: null,
    });
  });

  return weights;
}

export async function updateWeightsTable(useruid, selectedPage){
  const table = document.getElementById("t-body");

  cachedWeights = await getWeightData(useruid);
  cachedWeights = getEvolution();
  
  table.innerHTML = "";

  if (cachedWeights.length === 0) {
      table.innerHTML += `<tr>
          <td colspan="5" class="text-center py-4">
            <p class="text-gray-500">No weight entries found.</p>
          </td>
        </tr>
        `;
  } else {
    if(!selectedPage){
      selectedPage = 1;
    }
    handlePagination(selectedPage);
    renderPage(table, selectedPage)
  }
  
  console.log("Table rendered from updateWeightsTable()");
  setupCrudListeners();
    //console.table(cachedWeights)
}

async function handlePagination(selectedPage){
  const paginationContainer = document.getElementById("pagination-container");
  if (paginationContainer) {
    paginationContainer.innerHTML = await generatePagination(selectedPage);
  }

  const paginatioContainerClick = document.getElementById("pagination-container");

  if (!paginationListenerAttached) {
      paginatioContainerClick.addEventListener("click", handlePaginationClick);
      paginationListenerAttached = true;
    }
}

function handlePaginationClick(){
  const target = event.target;
  const selectedPage = target.id;

  if((selectedPage === "prev-btn" || selectedPage === "next-btn")){
    handleNonNumericPagination(selectedPage)
  } else {
    updateWeightsTable(userUid, selectedPage)
  }
}

function handleNonNumericPagination(selectedPage){
  if(selectedPage === "next-btn" && currentPage < pagesArr.length ){
    currentPage++;
  } else if (selectedPage === "prev-btn" && currentPage > 1) {
    currentPage--;
  }

  updateWeightsTable(userUid, currentPage)
}


async function generatePagination(page){
  const html = `
      <li>
        <a href="#" id="prev-btn" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li>

      ${await paginationLogic(page)}   

      <li>
        <a href="#" id="next-btn" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
      </li>
  `;
  
  return html;
}

async function paginationLogic(page) {
  let pagesArr = [];
  let activePage = Number(page) || 1;
  let data = cachedWeights;

  //get controlls and container
    const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  //get the number of pages
  let navPages = calculatePages(data.length, pageSize)

  let liArr = [];
    // console.log("Fired paginationLogic(page) with page,", page, "active page", activePage)

  for (let i = 1; i <= navPages; i++) {
    const li = document.createElement("li");
    if(i === activePage){
      li.innerHTML = `
      <a href="#" id="${i}" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
        ${i}
      </a>`;
    } else { 
      li.innerHTML = `
      <a href="#" id="${i}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        ${i}
      </a>`
    }
    
    liArr.push(li);
  }
  const liHTML = liArr.map(el => el.outerHTML).join("");

  return liHTML;
}

function renderPage(table, selectedPage){
  currentPage = selectedPage; 
  const pageIndex = selectedPage - 1;

  splitIntoPages(selectedPage)

  if (!pagesArr.length || !pagesArr[pageIndex]) return;

    pagesArr[pageIndex].forEach((entry) => {
      const tableRow = document.createElement("tr");
      tableRow.className =
        "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600";
      tableRow.id = entry.id;

      tableRow.innerHTML = `
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      ${entry.date}
                  </th>
                  <td class="px-6 py-4">
                      ${entry.weight}
                  </td>
                  <td class="px-6 py-4">
                    <img src="${entry.evolution}" class="evolution-image"></img>
                  </td>
                  <td class="px-6 py-4">
                      BMI
                  </td>
                  <td class="px-6 py-4">
                      ${entry.comments}
                  </td>
                  <td class="crud-container flex items-center px-6 py-4">
                      <a href="#" id="edit-${entry.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" data-drawer-target="drawer-edit" data-drawer-show="drawer-edit" data-drawer-placement="top" aria-controls="drawer-edit">Edit</a>
                      <a href="#" id="remove-${entry.id}" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                  </td>
    `;
      table.appendChild(tableRow);
    });
  return table;
}

function splitIntoPages(page){
  pagesArr.length = 0;

  for (let i = 0; i < cachedWeights.length; i += pageSize) {
    const splitedIntoPages = cachedWeights.slice(i, i + pageSize);
    pagesArr.push(splitedIntoPages);
  }

  return pagesArr;
}

function calculatePages(length, pageSize){
  if(length < pageSize){
    return 1
  } else {
    return Math.ceil(length / pageSize); 
  }
}

async function updateUserData(userData, useruid) {
  document.getElementById("user-profile-link").textContent =
    userData.name || "Unknown User";
  document.getElementById("mobile-menu-name").textContent =
    userData.name || "Unknown User";
  document.getElementById("mobile-menu-email").textContent =
    userData.email || "No Email Available";

  const table = document.getElementById("t-body");
  
  if(table) {
    updateWeightsTable(useruid)
  }

  console.log("Dashboard rendered with user data");
}

async function getUserDBData(user){
  try {
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        userUid = await user.uid;
        currentUserData = userData;

        setCookie(userUid)
        
        updateUserData(userData, user.uid);
      } else {
        console.log("No document found matching id");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
}

onAuthStateChanged(auth, async (user) => {
  // console.log("user", user)
  if (!user) {
    console.log("No user is logged in");
    window.location.href = "/index.html";
    return;
  }

  getUserDBData(user);
});

export async function logOut() {
  try {
    await signOut(auth);
    window.location.href = "index.html";
    cachedWeights = [];
    deleteUidCookie();
  } catch (error) {
    console.error("Error Signing out:", error);
  }
}

generateDashboardUi();

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".md\\:hidden button");
  const menuOpenIcon = menuButton.querySelector("svg:first-of-type"); // First SVG (Menu open icon)
  const menuCloseIcon = menuButton.querySelector("svg:last-of-type"); // Second SVG (Menu close icon)
  const mobileMenu = document.getElementById("mobile-menu");
  const logoutButton = document.getElementById("logout-link");
  const logoutButtonMobile = document.getElementById("logout-link-mobile");
  const profileLink = document.getElementById("user-profile-link");

  logoutButton.addEventListener("click", logOut);
  logoutButtonMobile.addEventListener("click", logOut);

  const datePicker = document.getElementById("datepicker-autohide");
  const weight = document.getElementById("weight-input");

  datePicker.addEventListener("changeDate", validateWeightRecord);
  weight.addEventListener("change", validateWeightRecord);

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });
    console.log("About to add the link to profile page")

  profileLink.addEventListener("click", function () {
    window.location.href = "profile.html";
  });
});