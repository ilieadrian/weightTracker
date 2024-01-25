let table = document.getElementById('table');
let dataArray = [];

function updateDisplay() {
    let listItem;

    if(dataArray.length !== 0) { // prevents apartion of an empty row if not data is present in array
        listItem = document.createElement("li");
        listItem.classList = "table-row";
        table.appendChild(listItem);
    }

    dataArray.forEach(function(data) {
        listItem.innerHTML = `
        <p id="row-id" class="table-item">${data.rowId}</p>
        <p class="table-item">${data.date}</p>
        <p class="table-item">${data.weight}</p>
        <i class="fa-solid ${data.evolution} table-item"></i>
        <div class="icons table-item">
            <i class="tooltip ${data.comment.length > 0 ? "fa-solid" : 'fa-regular'} fa-sharp fa-comment">
            <span class="tooltiptext">${data.comment.length > 0 ? data.comment : 'No comment added'}</span></i>
            <i class="fa-sharp fa-solid fa-trash delete-record"></i>
        </div>
        `;
    });
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

    dataArray.push(newData);
    updateDisplay();
}

function checkRowId() {
    if (dataArray.length == 0) {
        return 1;
    } else {
        let lastRowId = dataArray[dataArray.length - 1].rowId;
        return lastRowId + 1;
    }
}

function checkEvolution(weight) {
    if (dataArray.length === 0) {
        return 'fa-grip-lines';
    }

    let lastWeight = dataArray[dataArray.length - 1].weight;

    if (weight === lastWeight) {
        return 'fa-grip-lines';
    } else if (weight < lastWeight) {
        return 'fa-angles-down';
    } else if (weight > lastWeight) {
        return 'fa-angles-up';
    }
}

updateDisplay();