import "../styles.css";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, getDocs, doc, collection, addDoc, orderBy, query } from "firebase/firestore";
import { initFlowbite } from "flowbite";

let userUid;

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
      ${generateNewRecordDrawer()}

      ${generateRecordsTable()}  
     
    </div>
</main>
</div>
  `;

  container.innerHTML = html;

  initFlowbite();
  console.log("the dashboard has rendered");
}

function validateWeightRecord(){
  console.log("validateWeightRecord FIRED")
  const datePicker = document.getElementById('datepicker-autohide');
  const weight = document.getElementById('weight-input');
  const comments = document.getElementById('comments-input').value.trim()
  const datePickerValue = datePicker.value
  const weightValue = weight.value.trim();

  console.log(datePickerValue, weightValue)

  if(datePickerValue && weightValue){
    registerNewRecord(datePicker, weight, comments)
    setSubmitButtonState("active")
    setDrawerFieldsState("valid")

  } else {
    console.log("input is not valid");
    setSubmitButtonState()
    setDrawerFieldsState()
    return;
  }
}

function setSubmitButtonState(active){
  const weightRecordSubmitBtn = document.getElementById("weight-submit-button");
  const activeButtonClasses = [
    "text-white",
    "bg-blue-700",
    "hover:bg-blue-800",
  ];
  const disabledButtonClasses = [
    "bg-gray-100",
    "border",
    "border-gray-300",
    "text-gray-400",
    "cursor-not-allowed",
  ];

  if(active){
    weightRecordSubmitBtn.classList.remove(...disabledButtonClasses);
    weightRecordSubmitBtn.classList.add(...activeButtonClasses);
    weightRecordSubmitBtn.disabled = false;
  } else {
    weightRecordSubmitBtn.classList.remove(...activeButtonClasses);
    weightRecordSubmitBtn.classList.add(...disabledButtonClasses);
    weightRecordSubmitBtn.disabled = true;

  }
}

function setDrawerFieldsState(valid) {
  const datePicker = document.getElementById('datepicker-autohide');
  const weight = document.getElementById('weight-input');

  
  if(valid){
    console.log("Fields are valid")
  } else {
    console.log("fields are unvalid")
  }
}

async function registerNewRecord(datePicker, weight, comments){
  console.log("registerNewRecord FIRED")

  try {
    console.log("Adding input to DB temporary disabled")
    // const weightsCollectionRef = collection(db, "users", userUid, "weights");

    // const docRef = await addDoc(weightsCollectionRef, {
    //   date: datePicker,
    //   weight: weight,
    //   comments: comments,
    // });
    //   console.log("Closing Drawer")
    //   generateRecordsTable();
    //   console.log("Document written with ID: ", docRef.id);
  } catch (e) {
      console.error("Error adding document: ", e);
  }

}

function generateNewRecordDrawer() {
  const html = `
  <!-- drawer init and toggle -->
  <div class="text-center">
    <button class="overflow-y-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-top-example" data-drawer-show="drawer-top-example" data-drawer-placement="top" aria-controls="drawer-top-example">
    Add new record
    </button>
  </div>

  <!-- drawer component -->
    <div id="drawer-top-example" class="text-center fixed top-0 left-0 right-0 z-40 w-full p-4 transition-transform -translate-y-full bg-white dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-top-label">
        <h5 id="drawer-top-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>Add new record</h5>
        <button type="button" data-drawer-hide="drawer-top-example" aria-controls="drawer-top-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close menu</span>
      </button>
        
      <form class="max-w-sm mx-auto">
      
      <div class="relative max-w-sm mb-5">

        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
          </svg>
        </div>
        <input id="datepicker-autohide" datepicker datepicker-autohide datepicker-format="dd-mm-yyyy" datepicker-buttons datepicker-autoselect-today type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date *" required />
        </div>

        
        <div class="mb-5" id="weight-input-container">
          <label for="weight-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight *</label>
          <input type="number" id="weight-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

        <div class="mb-5">
          <label for="comments-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments </label>
          <input type="text" id="comments-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        
        <button type="button" data-drawer-hide="drawer-top-example" id="weight-submit-button" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-flex items-center p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>Add record</button>      
        
        </form>
        
    </div>
  `;

  console.log("the drawer has rendered");

  return html;
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

async function getWeightData(useruid) {
  const weightsRef = collection(db, "users", useruid, "weights");
  const weightsRefOrdered = query(weightsRef, orderBy("date", "desc"));
  const querySnapshot = await getDocs(weightsRefOrdered);

  const weights = [];

  querySnapshot.forEach((doc) => {
    weights.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return weights;
}

async function updateUserData(userData, useruid) {
  document.getElementById("user-profile-link").textContent =
    userData.name || "Unknown User";
  document.getElementById("mobile-menu-name").textContent =
    userData.name || "Unknown User";
  document.getElementById("mobile-menu-email").textContent =
    userData.email || "No Email Available";
  const table = document.getElementById("t-body");

  const weights = await getWeightData(useruid);

  if (weights.length === 0) {
    table.innerHTML +=
      `<tr>
        <td colspan="4" class="text-center py-4">
          <p class="text-gray-500">No weight entries found.</p>
        </td>
      </tr>
      `;
  } else {

  weights.forEach((entry) => {
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
                      To be added
                  </td>
                  <td class="flex items-center px-6 py-4">
                      <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                  </td>
    `;

    table.appendChild(tableRow);
  });
}

  console.log("Dashboard rendered with user data");
}

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

    // console.log(docSnap)

    if (docSnap.exists()) {
      const userData = docSnap.data();
      userUid = user.uid;
      updateUserData(userData, user.uid);
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
    window.location.href = "index.html";
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
  const weightRecordSubmitBtn = document.getElementById("weight-submit-button");


  logoutButton.addEventListener("click", logOut);
  logoutButtonMobile.addEventListener("click", logOut);

  const datePicker = document.getElementById('datepicker-autohide')
  const weight = document.getElementById('weight-input')

  datePicker.addEventListener("change", validateWeightRecord)
  weight.addEventListener("change", validateWeightRecord)
  weightRecordSubmitBtn.addEventListener("click", validateWeightRecord)
  

  menuButton.addEventListener("click", function () {
    menuOpenIcon.classList.toggle("hidden");
    menuCloseIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("hidden");
  });
});


