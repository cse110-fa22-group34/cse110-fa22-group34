window.addEventListener('DOMContentLoaded', init);

function init() {
    // let recipes = getRecipesFromStorage();
    // addRecipesToDocument(recipes);
    // initFormHandler();
    // console.log(localStorage.getItem("tr"));
  }

var arr = new Array();

function createBudget() {
    document.getElementById("expensetable").style.display = "block";
    document.querySelector(".del_select_btn").style.display = "inline";
    document.querySelector(".del_budget_btn").style.display = "inline";
    document.querySelector(".update_budget_btn").style.display = "inline";
    document.querySelector(".create_btn").style.display = "none";
}

function addRow() {
    var tb = document.getElementById("expensetable");
    var nextRowNum = tb.getElementsByTagName("tr").length - 2;
    row = tb.insertRow(nextRowNum);
    noCol = row.insertCell();
    checkCol = row.insertCell();
    dateCol = row.insertCell();
    costCol = row.insertCell();
    itemCol = row.insertCell();
    labelsCol = row.insertCell();
    noCol.innerHTML = "<text id=\"no\">" + nextRowNum + "</text>";
    checkCol.innerHTML="<input id=\"check\" type=\"checkbox\"/>";
    dateCol.innerHTML="<input id=\"date\" type=\"date\"/>";  
    costCol.innerHTML="<input id=\"cost\" type=\"number\"/>"; 
    itemCol.innerHTML="<input id=\"item\" />";
    labelsCol.innerHTML="<select>\
                            <option value=\"default\">--Please Select--</option>\
                            <option value=\"opt1\">Label 1</option>\
                            <option value=\"opt2\">Label 2</option>\
                            <option value=\"opt3\">Label 3</option>\
                        </select>";
}

function deleteSelectedRows() {
    var tb = document.getElementById("expensetable");
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
    document.getElementById("expensetable").style.display = "none";
    document.querySelector(".del_select_btn").style.display = "none";
    document.querySelector(".del_budget_btn").style.display = "none";
    document.querySelector(".update_budget_btn").style.display = "none";
    document.querySelector(".create_btn").style.display = "block";
    localStorage.clear();
}

function getBudget() {
    var budget = localStorage.getItem("budgetData");
    if (budget != null) {
        budget = JSON.parse(budget);
    }
}

function saveBudgetToLocal() {
    getBudget();
    arr.push({
        name:document.getElementById("").value,
        check:document.getElementById("").value,
        date:document.getElementById("").value,
        cost:document.getElementById("").value,
        item:document.getElementById("").value,
        labels:document.getElementById("").value,
    });
    localStorage.setItem("budgetData", JSON.stringify(arr));
}