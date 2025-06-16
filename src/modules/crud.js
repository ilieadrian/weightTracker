import { userUid } from "./dashboard";
import { db, doc } from "./firebaseConfig";
import { collection, getDoc, query } from "firebase/firestore";
import { validateEditRecord } from "./formValidation";
import { createEditDrawer, editModalControl, drawer } from "./drawer";

// let currentCollection;


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

async function getClickedElement(e) {
  const container = e.target.closest(".crud-container");

  if (container) {
    if (e.target.id.startsWith("edit-")) {
      const id = e.target.id.replace("edit-", "");

      const oldDrawer = document.getElementById("drawer-edit");
      if (oldDrawer) {
        oldDrawer.remove();
      }

      const dataToEdit = await getCollection(id);


      document.body.insertAdjacentHTML("beforeend", createEditDrawer(dataToEdit));
      initFlowbite()
      const datePickerEdit = document.getElementById("datepicker-autohide-edit");
      const weightEdit = document.getElementById("weight-input-edit");
            
      datePickerEdit.addEventListener("changeDate", validateEditRecord);
      weightEdit.addEventListener("change", validateEditRecord);

      // Re-initialize drawer
      editModalControl();

      // Fetch data and populate form

      // Show drawer
      drawer.show();
    }

    if (e.target.id.startsWith("remove-")) {
      const id = e.target.id.replace("remove-", "");
    }
  }
}

export function handleEdit(){
  const datePickerValue = document.getElementById("datepicker-autohide-edit").value;
    const weightValue = document.getElementById("weight-input-edit").value.trim();
    const commentsValue = document.getElementById("comments-input").value.trim();
    const weightEditBtn = document.getElementById("weight-edit-button");

  
    console.log("edit fired" )
}

async function getCollection(id){
    const weightDocRef = doc(db, "users", userUid, "weights", id);

 try {
    const docSnap = await getDoc(weightDocRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
    
}