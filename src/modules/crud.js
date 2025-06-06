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
        getCollection(id)

        // console.log("Edit clicked", id);
      }

      if (e.target.id.startsWith("remove-")) {
        const id = e.target.id.replace("remove-", "");
        // console.log("Remove clicked", id);
      }
    }
}

async function getCollection(id){
    const weightDocRef = doc(db, "users", userUid, "weights", id);

 try {
    const docSnap = await getDoc(weightDocRef);

    if (docSnap.exists()) {
      console.table(docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
    
}


