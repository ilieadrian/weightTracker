let table = document.getElementById('table');
let dataArray = [
{ rowId: 1, date: "22.09.2023", value: 97.5, evolution: 0, comment: "Start of recording"},
{ rowId: 2, date: "27.09.2023", value: 98.2, evolution: 1, comment:""},
{ rowId: 3, date: "29.09.2023", value: 99.0, evolution: -1, comment:""},
{ rowId: 4, date: "29.09.2023", value: 98.0, evolution: -1, comment:"Doooonw"},
{ rowId: 5, date: "29.09.2023", value: 98.0, evolution: 0, comment:"Za saim"},
{ rowId: 3, date: "29.09.2023", value: 100.0, evolution: 1, comment:""},
];

dataArray.forEach(function(data) {
    let listItem = document.createElement("li");
    listItem.classList = "table-row";

    // Chech for evolution icons
    let iconClass = "fa-grip-lines";
    if (data.evolution === 1) {
        iconClass = "fa-angles-up";
    } else if (data.evolution === -1){
        iconClass = "fa-angles-down";
    }

    listItem.innerHTML = `
    <p id="row-id" class="table-item">${data.rowId}</p>
    <p class="table-item">${data.date}</p>
    <p class="table-item">${data.value}</p>
    <i class="fa-solid ${iconClass} table-item"></i>
    <div class="icons table-item">
        <i class="tooltip ${data.comment.length > 0 ? "fa-solid" : 'fa-regular'} fa-sharp fa-comment">
        <span class="tooltiptext">${data.comment.length > 0 ? data.comment : 'No comment added'}</span></i>
        <i class="fa-sharp fa-solid fa-trash delete-record"></i>
    </div>
    `;


    table.appendChild(listItem)
});