const submitBtn = document.getElementById('submit-btn');
const recordsList = document.querySelector('ul');
const form = document.getElementById('form-id');

function checkRequired() {
    const formElementsIDs = ['date-timepicker', 'weight'];
    let hasErrors = false;
    const date = document.getElementById('date-timepicker').value;
    const weight = document.getElementById('weight').value.trim();
    const comment = document.getElementById('comment').value.trim();

    formElementsIDs.forEach(elementId => {
        const inputElement = document.getElementById(elementId);
        const errorTxtElement = document.getElementById(`${elementId}-form-error`);
        const value = inputElement.value.trim();

        if (value.length === 0) {
            inputElement.classList.add("error");
            errorTxtElement.classList.add("error");
            hasErrors = true;
        } else {
            inputElement.classList.remove("error");
            errorTxtElement.classList.remove("error");
        }
    });

    if (!hasErrors) {
        succes(date, weight, comment);
    }
}

function succes(...args) {

    const date = args[0];
    // console.log(normalArray)
    console.log(date)
    // console.log(...args[0]);
    // console.log(...args[1]);
    // console.log(...args[2]);
}

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    checkRequired()
})