
function createBudget() {
    window.location.href = './table.html';
}

function addRow()  
{  
    var tb = document.getElementById("budgettable");
    var nextRowNum = tb.getElementsByTagName("tr").length - 2;
    row = tb.insertRow(nextRowNum);
    noCol= row.insertCell();
    checkCol=row.insertCell();
    dateCol =row.insertCell();
    costCol =row.insertCell();
    itemCol =row.insertCell();
    labelsCol =row.insertCell();
    noCol.innerHTML = "<text>" + nextRowNum + "</text>";
    checkCol.innerHTML="<input type=\"checkbox\">";
    dateCol.innerHTML="<input/>";  
    costCol.innerHTML="<input/>"; 
    itemCol.innerHTML="<input/>";
    labelsCol.innerHTML="<select>\
                            <option value=\"default\">--Please Select--</option>\
                            <option value=\"opt1\">Label1</option>\
                            <option value=\"opt2\">Label2</option>\
                            <option value=\"opt3\">Label3</option>\
                        </select>";
} 

function deleteSelectedRows() {
    var tb = document.getElementById("budgettable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    var removelist = [];
    for (var i = 1; i < rowCount - 2; i++) {
        var cbox = rows[i].cells[1].getElementsByTagName("input")[0];
        if (cbox.checked) {
            removelist.push(rows[i])
        }
    }
    for(let elem of removelist) {
        elem.remove();
    }
}

function deleteBudget() {
    window.history.back(); 
}