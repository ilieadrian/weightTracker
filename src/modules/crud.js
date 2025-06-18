import { userUid } from "./dashboard";
import { db, doc } from "./firebaseConfig";
import { getDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { validateEditRecord } from "./formValidation";
import { createEditDrawer, editModalControl, drawer } from "./drawer";
import { parseDDMMYYYY, currentPage, updateWeightsTable } from "./dashboard";

let dataToEdit = { id: "", data: {} }

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

      dataToEdit = await getCollection(id);

      document.body.insertAdjacentHTML("beforeend", createEditDrawer(dataToEdit));
      initFlowbite();
      const datePickerEdit = document.getElementById("datepicker-autohide-edit");
      const weightEdit = document.getElementById("weight-input-edit");
            
      datePickerEdit.addEventListener("changeDate", validateEditRecord);
      weightEdit.addEventListener("change", validateEditRecord);

      editModalControl();

      drawer.show();

       document.querySelector('[data-drawer-hide="drawer-edit"]')?.addEventListener("click", () => {
        drawer.hide();
      });
    }

    if (e.target.id.startsWith("remove-")) {
      const id = e.target.id.replace("remove-", "");
      handleDelete(id)
    }
  }
}

export async function handleEdit(){
  if (!dataToEdit) return;

    const datePickerValue = document.getElementById("datepicker-autohide-edit").value;
    const weightValue = document.getElementById("weight-input-edit").value.trim();
    const commentsValue = document.getElementById("comments-input-edit").value.trim();
    const weightEditBtn = document.getElementById("weight-edit-button");

    const id = dataToEdit.id;
    const dateObj = parseDDMMYYYY(datePickerValue);
    const timestamp = Timestamp.fromDate(dateObj);
    weightEditBtn.disabled = true;

    try {
      const weightDocRef = doc(db, "users", userUid, "weights", id);
      await updateDoc(weightDocRef, {
        timestamp: timestamp,
        date: datePickerValue,
        weight: weightValue,
        comments: commentsValue,
    });

    updateWeightsTable(userUid, currentPage)
    drawer.hide()
    
  } catch (error) {
    console.error("Error updating document.", error);
  }
}

async function handleDelete(id){
  const weightDocRef = doc(db, "users", userUid, "weights", id);

  try {
    await deleteDoc(weightDocRef)
    updateWeightsTable(userUid)
    console.log("record deleted")
  } catch(error){
    console.error("Error deleting record.", error)
  }
}

async function getCollection(id){
    const weightDocRef = doc(db, "users", userUid, "weights", id);

  try {
    const docSnap = await getDoc(weightDocRef);

    if (docSnap.exists()) {
      return { id, data: docSnap.data() };
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
    
}