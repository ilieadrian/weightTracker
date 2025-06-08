import { userUid } from "./dashboard";
import { db, doc } from "./firebaseConfig";
import { collection, getDoc, query } from "firebase/firestore";

export function setupCrudListeners() {
  console.log("Setting up CRUD listeners");

  const table = document.getElementById("t-body");

  if (!table) {
    console.warn("t-body not found yet");
    return;
  }
  table.removeEventListener("click", getClickedElement);
  table.addEventListener("click", getClickedElement);
}

function getClickedElement(e){
  const container = e.target.closest(".crud-container");

    if (container) {
      // console.log("Clicked inside .crud-container", container);

      if (e.target.id.startsWith("edit-")) {
        const id = e.target.id.replace("edit-", "");


        launchEditDrawer(id);

        // console.log("Edit clicked", id);
      }

      if (e.target.id.startsWith("remove-")) {
        const id = e.target.id.replace("remove-", "");
        // console.log("Remove clicked", id);
      }
    }
}

function launchEditDrawer(id){

  const html = `
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

  console.log("the EDIT drawer has rendered");

  return html;
  // getCollection(id)
}

async function getCollection(id){
    const weightDocRef = doc(db, "users", userUid, "weights", id);

 try {
    const docSnap = await getDoc(weightDocRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
    
}


