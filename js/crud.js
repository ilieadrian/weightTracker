let table = document.getElementById('table');
let dataArray = JSON.parse(localStorage.getItem('dataArray')) || [];
let deleteButton = document.getElementById("delete-local");

function updateDisplay() {
    
    if (dataArray.length > 0) {
        table.innerHTML = ""; // Clear the table only if there is data
        dataArray.forEach(function(data) {
            let listItem = document.createElement("li");
            listItem.classList = "table-row";
            listItem.innerHTML = `
                <p id="row-id" class="table-item">${data.rowId}</p>
                <p class="table-item">${data.date}</p>
                <p class="table-item">${data.weight}</p>
                <i class="fa-solid ${data.evolution} table-item"></i>
                <div class="icons table-item">
                    <i class="tooltip ${data.comment.length > 0 ? "fa-solid" : 'fa-regular'} fa-sharp fa-comment">
                        <span class="tooltiptext">${data.comment.length > 0 ? data.comment : 'No comment added'}</span>
                    </i>
                    <i class="fa-sharp fa-solid fa-trash delete-record"></i>
                </div>
            `;
            table.appendChild(listItem);
        });
    }
}

function addData(date, weight, comment) {
    let newId = checkRowId();
    let evolution = checkEvolution(weight);

    const newData = {
        rowId: newId,
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

updateDisplay();

deleteButton.addEventListener("click", () => localStorage.removeItem("dataArray"));
