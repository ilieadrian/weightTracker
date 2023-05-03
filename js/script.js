// Delete record modal control

const trashIcons = document.querySelectorAll('.delete-record');
const modal = document.getElementById('delete-modal');
const confirmBtn = document.getElementById('delete-confirm');
const cancelBtn = document.getElementById('delete-cancel');

// Add event listener to all trash icons
trashIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        modal.style.display = 'block';
        console.log(trashIcons)
    });
});

// Hide modal when cancel button is clicked
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Code to delete record from database when confirm button is clicked
confirmBtn.addEventListener('click', () => {
  // Add code to delete record from database here
    console.log('Record deleted from database');
    modal.style.display = 'none';
});

// End Delete record modal control