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
      console.log("Clicked inside .crud-container", container);

      if (e.target.id.startsWith("edit-")) {
        const id = e.target.id.replace("edit-", "");
        console.log("Edit clicked", id);
      }

      if (e.target.id.startsWith("remove-")) {
        const id = e.target.id.replace("remove-", "");
        console.log("Remove clicked", id);
      }
    }
}


