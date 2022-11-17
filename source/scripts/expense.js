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
    //budget = getBudget();
    var tb = document.getElementById("expensetable");
    var nextRowNum = tb.getElementsByTagName("tr").length - 2;
    row = tb.insertRow(nextRowNum);
    noCol = row.insertCell();
    checkCol = row.insertCell();
    dateCol = row.insertCell();
    costCol = row.insertCell();
    itemCol = row.insertCell();
    labelCol = row.insertCell();
    noCol.innerHTML = "<text id=\"no\">" + nextRowNum + "</text>";
    checkCol.innerHTML = "<input id=\"check\" type=\"checkbox\"/>";
    dateCol.innerHTML = "<input id=\"date\" required type=\"date\"/>";  
    costCol.innerHTML = "<input id=\"cost\" required type=\"number\"/>"; 
    itemCol.innerHTML = "<input id=\"item\" required type=\"text\"/>";
    labelCol.innerHTML = "<select id=\"label\">\
                            <option value=\"default\">--Please Select--</option>\
                            <option value=\"opt1\">Label 1</option>\
                            <option value=\"opt2\">Label 2</option>\
                            <option value=\"opt3\">Label 3</option>\
                        </select>";
    //saveBudgetToLocal();
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
    // delete selected localStorage
}

function deleteBudget() {
    document.getElementById("expensetable").style.display = "none";
    document.querySelector(".del_select_btn").style.display = "none";
    document.querySelector(".del_budget_btn").style.display = "none";
    document.querySelector(".update_budget_btn").style.display = "none";
    document.querySelector(".create_btn").style.display = "block";
    localStorage.clear();
}

function updateBudget() {
    saveBudgetToLocal();
}
function getBudget() {
    var budget = localStorage.getItem("expenseData");
    if (budget != null) {
        budget = JSON.parse(budget);
    }
    return budget;
}

function saveBudgetToLocal() {
    //budget = getBudget();
    var tb = document.getElementById("expensetable");
    var rows = tb.getElementsByTagName("tr");
    var rowCount = rows.length;
    for (var i = 1; i < rowCount - 2; i++) {
        console.log(rows[i]);
        var currRow = rows[i];
        arr.push({
            check:currRow.getElementById("check").checked,
            date:currRow.getElementById("date").value,
            cost:currRow.getElementById("cost").value,
            item:currRow.getElementById("item").value,
            labels:currRow.getElementById("label").options[document.getElementById("label").selectedIndex].text,
        });

    }
    localStorage.setItem("expenseData", JSON.stringify(arr));
}