const trashIcons = document.querySelectorAll('.delete-record');
const modalContainer = document.getElementById('delete-modal');
const confirmBtn = document.getElementById('delete-confirm');
const cancelBtn = document.getElementById('delete-cancel');
const closeBtn = document.getElementById ('delete-mark')

// Add event listener to all trash icons

function renderModal(itemIndex) {
    let modal = document.createElement("div");
    modal.classList = "modal-content";
    modalContainer.style.display = "block"


    modal.innerHTML = `
    <i class="fa-sharp fa-solid fa-rectangle-xmark fa-xl" id="delete-mark"></i>
                    <p class="modal-message">Are you sure you want to delete this record?</p>
                    <div class="modal-buttons">
                        <button class="delete-confirm" id="modal-delete-${itemIndex}">Delete</button>
                        <button id="delete-cancel">Cancel</button>
                    </div>
        <p class="modal-message" id="modal-message-all"><span>Click here</span> to bulk delete all the records! </p>
    `;
    modalContainer.appendChild(modal)

    let modalDeleteBtn = document.getElementById(`modal-delete-${itemIndex}`);
    console.log(modalDeleteBtn, itemIndex)

    modalDeleteBtn.addEventListener('click', function() {
        deleteFromList(itemIndex);
        console.log(itemIndex);
    });
    
}

function deleteFromList(itemIndex) {
    delete dataArray [itemIndex];
    // localStorage.setItem('dataArray', JSON.stringify(dataArray));
    modalContainer.innerHTML = "";
    modalContainer.style.display = "none";

    updateDisplay()
}

