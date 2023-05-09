
const submitBtn = document.getElementById('submit-btn')

let currentId = 1;
let inputs = [];

submitBtn.addEventListener("click", addData); 

function addData() {
    event.preventDefault()
    
    const date = document.getElementById('date-timepicker').value
    const weight = document.getElementById('weight').value
    const comments = document.getElementById('comments').value
    
    // Add the user input to the data object
    const newInput = {
        id: currentId,
        date: date,
        weight: weight,
        comments: comments
    }
    inputs.push(newInput)
    currentId++

    console.log(inputs)
}


// 


