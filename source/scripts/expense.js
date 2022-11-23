// file header

/**
 * 
 */
window.addEventListener('DOMContentLoaded', checkLocalStorage);

function checkLocalStorage() {
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        createBudget();
        loadExpenseTable();
    }
    else {
        document.querySelector(".save_budget_btn").style.display = "none";
    }
}

/**	
 * This function accomplishes the following five implementations:
 * 1. display the expense table
 * 2. display the "delete selected" button
 * 3. display the "delete budget" button
 * 4. display the "save budget" button
 * 5. hide the "create budget" button
 *  
 * @param none
 */
function createBudget() {
    document.getElementById("expensetable").style.display = "block";
    document.querySelector(".del_select_btn").style.display = "inline";
    document.querySelector(".del_budget_btn").style.display = "inline";
    document.querySelector(".save_budget_btn").style.display = "inline";
    document.querySelector(".create_btn").style.display = "none";
}

/**	
 * This function adds one complete row with empty data to the expense table. 
 *  
 * @param none
 */
function addRow() {
    // select the table element
    var tb = document.getElementById("expensetable");
    // store the number of rows in the variable rowCount
    var rowCount = tb.getElementsByTagName("tr").length;
    // store the index of the to-be-added row in the variable nextRowNum
    var nextRowNum = rowCount - 2;
    // add an additional row in the index specified by nextRowNum
    row = tb.insertRow(nextRowNum);
    // add the number cell: the index of this row
    noCol = row.insertCell();
    // add the check cell: whether this row is selected or not
    checkCol = row.insertCell();
    // add the date cell: the date that we bought the item
    dateCol = row.insertCell();
    // add the cost cell: the cost of the item
    costCol = row.insertCell();
    // add the item cell: the name of the item
    itemCol = row.insertCell();
    // add the label cell: the category of the item
    labelCol = row.insertCell();
    // set the innerHTML of the number cell with the correct index
    noCol.innerHTML = "<text id=\"no\">" + nextRowNum + "</text>";
    // set the innerHTML of the check, date, cost, item, label cells
    // with the unique id specified by the index
    // for the check cell, the input type is "checkbox"
    checkCol.innerHTML = `<input id=\"check${nextRowNum}\" type=\"checkbox\"/>`;
    // for the date cell, the input type is "date"
    dateCol.innerHTML = `<input id=\"date${nextRowNum}\" type=\"date\"/>`;
    // for the cost cell, the input type is "number"
    costCol.innerHTML = `<input id=\"cost${nextRowNum}\" type=\"number\"/>`;
    // for the item cell, the input type is "text"
    itemCol.innerHTML = `<input id=\"item${nextRowNum}\" type=\"text\"/>`;
    // for the label cell, it's a selection list with some categories
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

/**	
 * This function deletes the entire expense table. 
 *  
 * @param none
 */
function deleteBudget() {
    // hide all buttons except for the "create new budget" button
    document.getElementById("expensetable").style.display = "none";
    document.querySelector(".del_select_btn").style.display = "none";
    document.querySelector(".del_budget_btn").style.display = "none";
    document.querySelector(".save_budget_btn").style.display = "none";
    document.querySelector(".create_btn").style.display = "block";
    // select the table element
    var tb = document.getElementById("expensetable");
    // select the tr element, which means the rows of the table
    var rows = tb.getElementsByTagName("tr");
    // store the count of rows in rowCount
    var rowCount = rows.length;
    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rowCount - 2; i++) {
        // always delete the second row of the existing table
        // not the first row since the first row is the table header row
        tb.deleteRow(1);
    }
    // clear localStorage
    localStorage.clear();
    // update the total cost
    updateTotalCost();
}

/**	
 * This function calculates the total cost of all saved items in the expense table. 
 *  
 * @param none
 */
function updateTotalCost() {
    // set storage to be the localStorage of expenseData
    var storage = JSON.parse(localStorage.getItem('expenseData'));
    // if storage is null, set the total cost cell to be "$ 0"
    if (storage == null) {
        document.getElementById('total cost').innerHTML = `<td id="total cost">$ 0</td>`;
    }
    // otherwise
    else {
        // initialize totalCostVal to be 0
        var totalCostVal = 0;
        // for each row data stored in the storage
        for (var i = 0; i < storage.length; i++) {
            // if the corresponding cost value is not null
            if (storage[i].cost != null) {
                // add this cost to totalCostVal
                totalCostVal = totalCostVal + parseInt(storage[i].cost);
            }
        }
        // store totalCostVal into the item called totalCost in localStorage
        localStorage.setItem('totalCost', totalCostVal);
        // update the total cost cell with the current totalCostVal
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

/**	
 * This function saves the entire expense table. 
 *  
 * @param none
 */
function saveBudget() {
    //deleteInvalid();

    // alert the following message to the user when they save their budget
    alert("Your budget has been saved! Please Make sure to have all input fields filled if you did not do so.");
    // store the expense table data into local storage
    saveBudgetToLocal();
    // update the total cost
    updateTotalCost();
    // store the expense table innerHTML into local storage
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

/**	
 * This function saves all the row date in the expense table to the local storage. 
 *  
 * @param none
 */
function saveBudgetToLocal() {
    // create an empty array to store the row data
    var arr = new Array();
    // select the table element
    var tb = document.getElementById("expensetable");
    // select the tr element, which means the rows of the table
    var rows = tb.getElementsByTagName("tr");
    // store the count of rows in rowCount
    var rowCount = rows.length;
    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rowCount - 2; i++) {
        // format the IDs of each cell in the ith column
        const checkStr = 'check' + `${i}`;
        const dateStr = 'date' + `${i}`;
        const costStr = 'cost' + `${i}`;
        const itemStr = 'item' + `${i}`;
        const labelStr = 'label' + `${i}`;
        // push the data in the ith row into the array created before
        arr.push({
            check: document.getElementById(checkStr).checked,
            date: document.getElementById(dateStr).value,
            cost: parseInt(document.getElementById(costStr).value),
            item: document.getElementById(itemStr).value,
            label: document.getElementById(labelStr).options[document.getElementById(labelStr).selectedIndex].text,
        });
    }
    // store arr into the item called expenseData in localStorage
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