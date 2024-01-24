const trashIcons = document.querySelectorAll('.delete-record');
const modal = document.getElementById('delete-modal');
const confirmBtn = document.getElementById('delete-confirm');
const cancelBtn = document.getElementById('delete-cancel');
const closeBtn = document.getElementById ('delete-mark')

// Add event listener to all trash icons
trashIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        modal.style.display = 'block';
        // console.log(icon); // 17.01.2023 - i check and the correct id for the coresponding line is present in modal
    })
})

//Delete record from database when confirm button is clicked
confirmBtn.addEventListener('click', () => {
  // Add reference to delete record from database code here
    // console.log('Record deleted from database');
    modal.style.display = 'none'
})

// Hide modal when cancel or close button is clicked
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})