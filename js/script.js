
function handleData(date, weight, comment) {
    let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];

    console.log('Handling valid data:', date, weight, comment);

    const newData = {
        date: date,
        weight: weight,
        evolution: checkEvolution(weight, dataArray),
        comment: comment,
    };

    dataArray.push(newData);

    localStorage.setItem('dataArray', JSON.stringify(dataArray));

    updateDisplay(dataArray);

    return { dataArray };
}

function updateDisplay(dataArray) {
    
    if (dataArray.length > 0) {
        table.innerHTML = ""; // Clear the table only if there is data
        dataArray.forEach(function(data, index) {
            let listItem = document.createElement("li");
            listItem.classList = "table-row";
            listItem.setAttribute("table-row-index", index); 
            // <p id="row-id" class="table-item">${data.rowId}</p>
            listItem.innerHTML = `
                <p class="table-item">${data.date}</p>
                <p class="table-item">${data.weight}</p>
                <i class="fa-solid ${data.evolution} table-item"></i>
                <div class="icons table-item">
                    <i class="tooltip ${data.comment.length > 0 ? "fa-solid" : 'fa-regular'} fa-sharp fa-comment">
                        <span class="tooltiptext">${data.comment.length > 0 ? data.comment : 'No comment added'}</span>
                    </i>
                    <i class="fa-sharp fa-solid fa-trash delete-record" id="delete-${index}"></i>
                </div>
            `;
            table.appendChild(listItem);

            let deleteBtn = document.getElementById(`delete-${index}`);
            const itemIndex = listItem.getAttribute('table-row-index');

            deleteBtn.addEventListener('click', function() {
                renderModal(itemIndex);
            });
        });
    } 
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




