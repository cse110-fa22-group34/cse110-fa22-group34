window.addEventListener('DOMContentLoaded', checkLocalStorage);
//window.location.reload();

function checkLocalStorage() {
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        createBudget();
        loadExpenseTable();
    }
}

function createBudget() {
    document.getElementById("expensetable").style.display = "block";
    document.querySelector(".del_select_btn").style.display = "inline";
    document.querySelector(".del_budget_btn").style.display = "inline";
    document.querySelector(".update_budget_btn").style.display = "inline";
    document.querySelector(".create_btn").style.display = "none";
}


function addRow() {
    var tb = document.getElementById("expensetable");
    var rowCount = tb.getElementsByTagName("tr").length;
    var nextRowNum = rowCount - 2;
    row = tb.insertRow(nextRowNum);
    noCol = row.insertCell();
    checkCol = row.insertCell();
    dateCol = row.insertCell();
    costCol = row.insertCell();
    itemCol = row.insertCell();
    labelCol = row.insertCell();
    noCol.innerHTML = "<text id=\"no\">" + nextRowNum + "</text>";
    checkCol.innerHTML = `<input id=\"check${nextRowNum}\" type=\"checkbox\"/>`;
    dateCol.innerHTML = `<input id=\"date${nextRowNum}\" type=\"date\"/>`;  
    costCol.innerHTML = `<input id=\"cost${nextRowNum}\" type=\"number\"/>`; 
    itemCol.innerHTML = `<input id=\"item${nextRowNum}\" type=\"text\"/>`;
    labelCol.innerHTML = `<select style=\"border:none\" id=\"label${nextRowNum}\">\
                            <option value=\"default\">--Please Select--</option>\
                            <option value=\"opt1\">Grocery</option>\
                            <option value=\"opt2\">Clothes</option>\
                            <option value=\"opt3\">Transportation</option>\
                            <option value=\"opt4\">Housing</option>\
                            <option value=\"opt5\">Monthly Membership</option>\
                            <option value=\"opt6\">Entertainment</option>\
                            <option value=\"opt7\">Other</option>\
                        </select>`;
}

function deleteSelectedRows() {
    var tb = document.getElementById("expensetable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    var removelist = [];
    var removeIndices = [];

    for (var i = 1; i < rowCount - 2; i++) {
        var cbox = rows[i].cells[1].getElementsByTagName("input")[0];
        if (cbox.checked) {
            removelist.push(rows[i]);
            removeIndices.push(i);
        }
    }

    /* delete corresponding localStorage
    var storage = JSON.parse(localStorage.getItem('expenseData'));
    if (storage != null) {
        for (var i = 0; i < removeIndices.length; i++) {
            storage.splice(removeIndices[i] - 1, 1);
        }
        localStorage.setItem("expenseData", JSON.stringify(storage));
        updateTotalCost();
    }
    */
    
    for (let elem of removelist) {
        elem.remove();
    }

    rows = tb.getElementsByTagName("tr");
    for (var i = 1; i < rows.length - 2; i++) {
        var num = rows[i].cells[0].getElementsByTagName("text")[0];
        num.innerHTML = i;
    }
    
    for (var i = 1; i < rows.length - 2; i++) {
        var checkIDNew = 'check' + `${i}`;
        rows[i].cells[1].getElementsByTagName("input")[0].id = checkIDNew;

        var dateIDNew = 'date' + `${i}`;
        rows[i].cells[2].getElementsByTagName("input")[0].id = dateIDNew;

        var costIDNew = 'cost' + `${i}`;
        rows[i].cells[3].getElementsByTagName("input")[0].id = costIDNew;

        var itemIDNew = 'item' + `${i}`;
        rows[i].cells[4].getElementsByTagName("input")[0].id = itemIDNew;

        var labelIDNew = 'label' + `${i}`;
        rows[i].cells[5].getElementsByTagName("select")[0].id = labelIDNew;
    }
}

function deleteBudget() {
    document.getElementById("expensetable").style.display = "none";
    document.querySelector(".del_select_btn").style.display = "none";
    document.querySelector(".del_budget_btn").style.display = "none";
    document.querySelector(".update_budget_btn").style.display = "none";
    document.querySelector(".create_btn").style.display = "block";
    var tb = document.getElementById("expensetable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    for (var i = 1; i < rowCount - 2; i++) {
        tb.deleteRow(1);
    }
    localStorage.clear();
    updateTotalCost();
}

function updateTotalCost() {
    var storage = JSON.parse(localStorage.getItem('expenseData'));
    if (storage == null) {
        document.getElementById('total cost').innerHTML = `<td id="total cost">$ 0</td>`;
    }
    else {
        var totalCostVal = 0;
        for (var i = 0; i < storage.length; i++) {
            if (storage[i].cost != null) {
                totalCostVal = totalCostVal + parseInt(storage[i].cost);
            }
        }
        localStorage.setItem('totalCost',totalCostVal);
        //storage.push({totalCost: totalCostVal});
        //localStorage.setItem("expenseData", JSON.stringify(storage));
        document.getElementById('total cost').innerHTML = `<td id="total cost">$ ${totalCostVal}</td>`;
    }
}

/*
function deleteInvalid() {
    // delete row
    var tb = document.getElementById("expensetable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    var removelist = [];
    var removeIndices = [];
    for (var i = 1; i < rowCount - 2; i++) {
        var checkDate = document.getElementById(`date${i}`).value == '';
        var checkCost = document.getElementById(`cost${i}`).value == '';
        var checkItem = document.getElementById(`item${i}`).value == '';
        var checkLabel = document.getElementById(`label${i}`).value == 'default';
        if (checkDate || checkCost || checkItem || checkLabel) {
            removelist.push(rows[i]);
            removeIndices.push(i);
        }
    }

    for(let elem of removelist) {
        elem.remove();
    }

    rows = tb.getElementsByTagName("tr");
    for (var i = 1; i < rows.length - 2; i++) {
        var num = rows[i].cells[0].getElementsByTagName("text")[0];
        num.innerHTML = i;
    }
    
    for (var i = 1; i < rows.length - 2; i++) {
        var checkIDNew = 'check' + `${i}`;
        rows[i].cells[1].getElementsByTagName("input")[0].id = checkIDNew;

        var dateIDNew = 'date' + `${i}`;
        rows[i].cells[2].getElementsByTagName("input")[0].id = dateIDNew;

        var costIDNew = 'cost' + `${i}`;
        rows[i].cells[3].getElementsByTagName("input")[0].id = costIDNew;

        var itemIDNew = 'item' + `${i}`;
        rows[i].cells[4].getElementsByTagName("input")[0].id = itemIDNew;

        var labelIDNew = 'label' + `${i}`;
        rows[i].cells[5].getElementsByTagName("select")[0].id = labelIDNew;
    }
}
*/

function saveBudget() {
    //deleteInvalid();
    alert("Your budget has been saved! Please Make sure to have all input fields filled if you did not do so.");
    saveBudgetToLocal();
    updateTotalCost();
    saveExpenseTable();
}

/*
function getBudget() {
    var budget = localStorage.getItem("expenseData");
    if (budget != null) {
        budget = JSON.parse(budget);
    }
    return budget;
}
*/

function saveBudgetToLocal() {
    var arr = new Array();
    var tb = document.getElementById("expensetable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    for (var i = 1; i < rowCount - 2; i++) {
        const checkStr = 'check' + `${i}`;
        const dateStr = 'date' + `${i}`;
        const costStr = 'cost' + `${i}`;
        const itemStr = 'item' + `${i}`;
        const labelStr = 'label' + `${i}`;
        arr.push({
            check: document.getElementById(checkStr).checked,
            date: document.getElementById(dateStr).value,
            cost: parseInt(document.getElementById(costStr).value),
            item: document.getElementById(itemStr).value,
            label: document.getElementById(labelStr).options[document.getElementById(labelStr).selectedIndex].text,
        });
    }
    localStorage.setItem("expenseData", JSON.stringify(arr));
}

function saveExpenseTable(){
    var tb = document.getElementById("expensetable");
    tbHTML = tb.innerHTML;
    localStorage.setItem("expenseTable",tbHTML);
}

function loadExpenseTable(){
    var tb = document.getElementById("expensetable");
    tb.innerHTML = localStorage.getItem("expenseTable");

    var arr = JSON.parse(localStorage.getItem("expenseData"));

    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    for (var i = 1; i < rowCount - 2; i++) {
        var checkStr = 'check' + `${i}`;
        var dateStr = 'date' + `${i}`;
        var costStr = 'cost' + `${i}`;
        var itemStr = 'item' + `${i}`;
        var labelStr = 'label' + `${i}`;
        document.getElementById(checkStr).checked = arr[i-1].check;
        document.getElementById(dateStr).value = arr[i-1].date;
        document.getElementById(costStr).value = parseInt(arr[i-1].cost);
        document.getElementById(itemStr).value = arr[i-1].item;
        document.getElementById(labelStr).options[document.getElementById(labelStr).selectedIndex].text = arr[i-1].label;
    }
}

//To Jiaxin: Please check line 2, 63-72, 129-130, 135-181, 184, 190-198 because I did not find them necessary.