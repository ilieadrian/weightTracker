// Start to refactor to object aproach

function addData(date, weight, comment) {
    let evolution = checkEvolution(weight);

    return { }
}

let table = document.getElementById('table');
let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
let deleteButton = document.getElementById("modal-message-all");

function updateDisplay() {
    
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

function addData(date, weight, comment) {
    // let newId = checkRowId();
    let evolution = checkEvolution(weight);

    const newData = {
        // rowId: newId,
        date: date,
        weight: weight,
        evolution: evolution,
        comment: comment,
    };

    dataArray.unshift(newData);
    localStorage.setItem('dataArray', JSON.stringify(dataArray));
    updateDisplay();
}

function checkRowId() {
    if (dataArray.length == 0) {
        return 1;
    } else {
        let lastRowId = dataArray[0].rowId;
        return lastRowId + 1;
    }
}

function checkEvolution(weight) {
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

function checkDuplicateEntry(date, weight, comment){
    const duplicateError = document.getElementById("duplicate-error");
    const isDateDuplicate = dataArray.some(data => data.date === date);
    const isWeightDuplicate = dataArray.some(data => data.weight === weight);
    
    if(isDateDuplicate && isWeightDuplicate) {
            duplicateError.classList.add("error");
            return;
        } else {
            addData(date, weight, comment);
            duplicateError.classList.remove("error");
        }
}

function deleteArray() {
    if (confirm('Confirm permanent deletion for all the data!')) {
        localStorage.removeItem("dataArray");
        dataArray = [];
        modal.style.display = 'none';
        updateDisplay();
    } else {
        modal.style.display = 'none';
    }
}

updateDisplay();