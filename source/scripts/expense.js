/**
 * This file is the javascript for the expense table section of the website.
 * It includes the implementation of creating a new table, adding entries to
 * the table, updating entries in the table, deleting entries in the table,
 * and storing table data into the local storage.
 * 
 * References: MDN Web Docs
 */


/**
 * call the checkLocalStorage function whenever we loads the page
 */
window.addEventListener('DOMContentLoaded', checkLocalStorage);

/**	
 * This function checks the local storage of the website and performs different
 * actions based on the status of local storage.
 *  
 * @param none
 */
function checkLocalStorage() {
    // if the expense data storage is not null
    if (JSON.parse(localStorage.getItem('expenseData')) != null) {
        // call the creatBudget() function and load the existing expense table
        createBudget();
        loadExpenseTable();
    }
    // if the expense data storage is null
    else {
        // show the "create budget" button
        document.querySelector(".create_btn").style.display = "inline";
        // hide the "save budget", "delete budget", "delete selected" buttons, and the table
        document.querySelector(".save_budget_btn").style.display = "none";
        document.getElementById("expensetable").style.display = "none";
        document.querySelector(".del_select_btn").style.display = "none";
        document.querySelector(".del_budget_btn").style.display = "none";
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

/**	
 * This function deletes rows that are selected by the users. 
 *  
 * @param none
 */
function deleteSelectedRows() {
    // select the table element
    var tb = document.getElementById("expensetable");
    // select the tr element, which means the rows of the table
    var rows = tb.getElementsByTagName("tr");
    // store the count of rows in rowCount
    var rowCount = rows.length;
    // create an empty list to store the rows to be removed
    var removeList = [];

    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rowCount - 2; i++) {
        // select the first user input, the checkbox cell of the row
        var cbox = rows[i].cells[1].getElementsByTagName("input")[0];
        // if checkbox is checked
        if (cbox.checked) {
            // push this row in to the remove list
            removeList.push(rows[i]);
        }
    }
    
    // remove each row in the remove list
    for (let elem of removeList) {
        elem.remove();
    }

    // select the tr element, which means the rows of the table after deletion
    rows = tb.getElementsByTagName("tr");
    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rows.length - 2; i++) {
        // get the first column, No. column
        var num = rows[i].cells[0].getElementsByTagName("text")[0];
        // reset the number index after deleting some rows to the correct index
        num.innerHTML = i;

        // format the IDs of each cell in the current row with the row number
        var checkIDNew = 'check' + `${i}`;
        var dateIDNew = 'date' + `${i}`;
        var costIDNew = 'cost' + `${i}`;
        var itemIDNew = 'item' + `${i}`;
        var labelIDNew = 'label' + `${i}`;

        // reset the IDs to the new IDs after deleting some rows
        rows[i].cells[1].getElementsByTagName("input")[0].id = checkIDNew;
        rows[i].cells[2].getElementsByTagName("input")[0].id = dateIDNew;
        rows[i].cells[3].getElementsByTagName("input")[0].id = costIDNew
        rows[i].cells[4].getElementsByTagName("input")[0].id = itemIDNew;
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
    // clear the following items associated with the expense table in localStorage
    localStorage.removeItem('expenseData');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('expenseTable');
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

/**	
 * This function saves the entire expense table. 
 *  
 * @param none
 */
function saveBudget() {
    // alert the following message to the user when they save their budget
    alert("Your budget has been saved! Please Make sure to have all input fields filled if you did not do so.");
    // store the expense table data into local storage
    saveBudgetToLocal();
    // update the total cost
    updateTotalCost();
    // store the expense table innerHTML into local storage
    saveExpenseTable();
    // call the showCalendar function to update the color in calendar when we save the budget
    showCalendar();
}

/**	
 * This function saves all the row date in the expense table to the local storage. 
 *  
 * @param none
 */
function saveBudgetToLocal() {
    // create an empty array to store the row data
    var expenseData = new Array();
    // select the table element
    var tb = document.getElementById("expensetable");
    // select the tr element, which means the rows of the table
    var rows = tb.getElementsByTagName("tr");
    // store the count of rows in rowCount
    var rowCount = rows.length;
    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rowCount - 2; i++) {
        // format the IDs of each cell in the ith row with the row number
        const checkStr = 'check' + `${i}`;
        const dateStr = 'date' + `${i}`;
        const costStr = 'cost' + `${i}`;
        const itemStr = 'item' + `${i}`;
        const labelStr = 'label' + `${i}`;
        // push the data in the ith row into the array created before
        expenseData.push({
            check: document.getElementById(checkStr).checked,
            date: document.getElementById(dateStr).value,
            cost: parseInt(document.getElementById(costStr).value),
            item: document.getElementById(itemStr).value,
            label: document.getElementById(labelStr).options[document.getElementById(labelStr).selectedIndex].text,
        });
    }
    // store arr into the item called expenseData in localStorage
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
}

/**	
 * This function saves all the row date in the expense table to the local storage. 
 *  
 * @param none
 */
function saveExpenseTable(){
    // select the table element
    var tb = document.getElementById("expensetable");
    // store the innerHTML of the expense table into local storage
    tbHTML = tb.innerHTML;
    localStorage.setItem("expenseTable",tbHTML);
}

/**	
 * This function loads the saved expense table. 
 *  
 * @param none
 */
function loadExpenseTable(){
    // select the table element
    var tb = document.getElementById("expensetable");
    // set the innerHTML of the table to be the one stored in the local storage
    tb.innerHTML = localStorage.getItem("expenseTable");

    // extract the expense data from the local storage
    var expenseData = JSON.parse(localStorage.getItem("expenseData"));

    // select the tr element, which means the rows of the table
    var rows = tb.getElementsByTagName("tr");
    // store the count of rows in rowCount
    var rowCount = rows.length;
    // iterate through all the inner rows except for the header and footer row,
    // which is why loop through rowCount - 2 times
    for (var i = 1; i < rowCount - 2; i++) {
        // format the IDs of each cell in the ith row with the row number
        var checkStr = 'check' + `${i}`;
        var dateStr = 'date' + `${i}`;
        var costStr = 'cost' + `${i}`;
        var itemStr = 'item' + `${i}`;
        var labelStr = 'label' + `${i}`;
        // copy all the row data in the expense table to the innerHTML of the expense table
        document.getElementById(checkStr).checked = expenseData[i - 1].check;
        document.getElementById(dateStr).value = expenseData[i - 1].date;
        document.getElementById(costStr).value = parseInt(expenseData[i - 1].cost);
        document.getElementById(itemStr).value = expenseData[i - 1].item;
        document.getElementById(labelStr).options[document.getElementById(labelStr).selectedIndex].text = expenseData[i - 1].label;
    }
}