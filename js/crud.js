const submitBtn = document.getElementById('submit-btn')

let currentId = 1;
let inputs = [];

submitBtn.addEventListener("click", addData)

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
    let inputsSerialized = JSON.stringify(inputs)
    console.log(inputsSerialized)

    localStorage.setItem("inputs", inputsSerialized)

    let inputsDeserialized = JSON.parse(localStorage.getItem("inputs"))
    console.log(inputsDeserialized)

}




// Form validation

// Store object to localhost

// generate the list from the object

// Delete inputs

// Store object to database


