const submitBtn = document.getElementById('submit-btn');
const recordsList = document.querySelector('ul');
const form = document.getElementById('form-id');

function checkRequired() {
    const formElementsIDs = ['date-timepicker', 'weight'];

    formElementsIDs.forEach(elementId => {
        const inputElement = document.getElementById(elementId);
        const errorTxtElement = document.getElementById(`${elementId}-form-error`);
        const value = inputElement.value.trim();
        
        if (value.length === 0) {
            inputElement.classList.add("error");
            errorTxtElement.classList.add("error");
        } else {
            inputElement.classList.remove("error");
            errorTxtElement.classList.remove("error");
            const date = document.getElementById('date-timepicker').value;
            const weight = +document.getElementById('weight').value;
            const comment = document.getElementById('comment').value.trim();
            addData(date, weight, comment);
        }
    });

}

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    checkRequired();
});