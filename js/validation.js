const form = document.getElementById('form-id');
const date = document.getElementById('date-timepicker').valueAsDate;
const weight = document.getElementById('weight').value;
const comment = document.getElementById('comment').value;
const submitBtn = document.getElementById('submit-btn');


function checkRequired () {

    console.log(typeof date, date, typeof date, weight, typeof comment, comment)
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
        error(input)
        } else {
        succes(input)
        }   
    })
}

function error(input) {
    console.log("Error");
    const formControl = input.parentElement;
    const inputEl = formControl.querySelector('.form-control');
    const spanEl = formControl.querySelector('.form-error');
    // const formControl = input.parentElement;
    // formControl.className = 'form-control error';
    spanEl.classList.remove("hidden")
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