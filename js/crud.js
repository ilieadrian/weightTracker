var table = document.getElementById('table');
var dataArray = [
{ rowId: 1, date: "22.09.2023", value: 97.5, comment: "Start of recording"},
{ rowId: 2, date: "27.09.2023", value: 98.2, comment:""},
];

dataArray.forEach(function(data) {
    var listItem = document.createElement("li");
    listItem.classList = "table-row";

    listItem.innerHTML = `
    <p id="row-id" class="table-item">${data.rowId}</p>
    <p class="table-item">${data.date}</p>
    <p class="table-item">${data.value}</p>
    <i class="fa-solid fa-grip-lines table-item"></i>
    <div class="icons table-item">
        <i class="tooltip fa-solid fa-sharp fa-comment">
        <span class="tooltiptext">${data.comment}</span></i>
        <i class="fa-sharp fa-solid fa-trash delete-record"></i>
    </div>
    `;


    table.appendChild(listItem)
});