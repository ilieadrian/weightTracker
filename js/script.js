function handleData(date, weight, comment) {
    // Your logic for handling valid data goes here
    console.log('Handling valid data:', date, weight, comment);
    // let evolution = ;
    let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];

    const newData = {
        date: date,
        weight: weight,
        evolution: checkEvolution(weight, dataArray),
        comment: comment,
    };

    dataArray.push(newData)
    console.log(dataArray)
    return { dataArray }
    
}

function checkEvolution(weight, dataArray) {
    if (dataArray.length === 0) {
        return 'fa-grip-lines';
    }

    let lastWeight = dataArray[0].weight;

    if (weight === lastWeight) {
        return 'fa-grip-lines';
    } else if (weight < lastWeight) {
        return 'fa-angles-down';
    } else if (weight > lastWeight) {
        return 'fa-angles-up';
    }
}

// const newData = handleData();
// console.log(newData);

const FormModule = (function () {
    function handleSubmit(e) {
        e.preventDefault();

        const formElementsIDs = ['date-timepicker', 'weight'];
        let isError = false;

        formElementsIDs.forEach(elementId => {
            const inputElement = document.getElementById(elementId);
            const errorTxtElement = document.getElementById(`${elementId}-form-error`);
            const value = inputElement.value.trim();

            if (value.length === 0) {
                inputElement.classList.add("error");
                errorTxtElement.classList.add("error");
                isError = true;
            } else {
                inputElement.classList.remove("error");
                errorTxtElement.classList.remove("error");
            }
        });

        if (!isError) {
            const date = document.getElementById('date-timepicker').value;
            const weight = +document.getElementById('weight').value;
            const comment = document.getElementById('comment').value.trim();

            handleData(date, weight, comment);
        } else {
            console.log('Form validation failed. Cannot proceed.');
            return null;
        }
    }

    function initializeForm() {
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.addEventListener('click', handleSubmit);
    }

    return { initializeForm };
})();

FormModule.initializeForm();




