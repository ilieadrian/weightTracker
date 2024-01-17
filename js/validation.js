const submitBtn = document.getElementById('submit-btn')
const form = document.getElementById('form-id');
// const date = document.getElementById('date-timepicker').valueAsDate;
// const weight = document.getElementById('weight').value;
const comment = document.getElementById('comment').value;


function checkRequired() {
    const date = document.getElementById('date-timepicker').value;
    const weight = document.getElementById('weight').value;

    const dateInput = document.getElementById('date-timepicker');
    const weightInput = document.getElementById('weight');

    if (weight.length === 0 && date.length === 0) {
        error('Both date and weight are required.', dateInput, weightInput);
    } else if (weight.length === 0) {
        error('Weight is required.', weightInput);
    } else if (date.length === 0) {
        error('Date is required.', dateInput);
    } else {
        success(weightInput); // Choose one of the input fields for success
    }
}

function error(errorMessage, ...inputs) {
    console.log("Error: " + errorMessage, ...inputs);
    inputs.forEach(input => {
        const formControl = input.parentElement;
        const spanEl = formControl.querySelector('.form-error');
        spanEl.textContent = errorMessage;  // Set the error message
        spanEl.classList.remove("hidden");
    });
}

function succes(input) {
    console.log("Succes")
    // const formControl = input.parentElement;
    // formControl.className = 'form-control';
}


submitBtn.addEventListener('click', e => {
    e.preventDefault()
    checkRequired()
})