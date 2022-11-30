// Set up variables for the calendar based on the current date
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

// Get the DOM elements for the calendar (updated with event listeners)
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
monthAndYear = document.getElementById("monthAndYear");

// Array of months to display in the calendar
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Main function to run and display the calendar
showCalendar(currentMonth, currentYear);

/**
 * Function to update the calendar to the next month when the next button is 
 * clicked. Determine the next month and year based on the current month and 
 * some logic to determine if the next month is in the next year (current 
 * month is December).
 */
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

/**
 * Function to update the calendar to the previous month when the previous
 * button is clicked. Determine the previous month and year based on the
 * current month and some logic to determine if the previous month is in the
 * previous year (current month is January).
 */
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

/**
 * Function to update the calendar when the user selects a new year or month
 * from the dropdown menus 
 * 
 * Not Used in Current Implementation
 */
function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

/**
 * @param {number} month - The month to display in the calendar
 * @param {number} year - The year to display in the calendar
 * 
 * Function to display the calendar based on the month and year passed in
 */ 
function showCalendar(month, year) {

    // Get the first day of the month to determine where to start the calendar.
    let firstDay = (new Date(year, month)).getDay();

    // Main DOM element to display the calendar 
    tbl = document.getElementById("calendar-body"); // body of the calendar.

    // Clear the calendar before displaying the new month.
    tbl.innerHTML = "";

    // Fill data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // Create the cells of the calendar one row at a time.
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // Create a table row
        let row = document.createElement("tr");

        // Create individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            // Empty cell if the date is before the first day of the month
            // or is 0.
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // If the date is after the last day of the month, exit loop.
            else if (date > daysInMonth(month, year)) {
                break;
            }
            // Otherwise, create a cell with the correct date. Get data for 
            // expenses from the local storage and color the cell based on
            // the budget. Color current day with a different color and don't
            // color the cell if the date is in the future.
            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);

                // Color today's cell.
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                    cell.classList.add("today");
                }
                // Color the cell based on the budget.
                else {
                    let color = colorCell(dayToString(date, month, year), month, year);
                    if (color) {
                        cell.classList.add(`bg-info-${color}`);
                    }   
                }
                
                // Append cellText to the cell and the cell to the row.
                // Move to the next day.
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

/** 
 * @param {number} month - The month given.
 * @param {number} year - The year given.
 *
 * Function to determine the number of days in a month given the month and year.
 */
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function dayToString(day, month, year) {
    if (day < 10) {
        day = "0" + day;
    }
    month = month + 1;
    if (month < 10) {
        month = "0" + month;
    }
    return `${year}-${month}-${day}`;
}

/**
 * @param {number} dayInString - The date in the string format.
 * @param {number} month - The date to check.
 * @param {number} year - The date to check.
 * 
 * Function to determine the color of the cell based on the budget.
 * If the date is in the future, return neutral.
 * If the date is today, return ____. @TODO
 * If the date is in the past, return "danger" if the budget is exceeded.
 */
function colorCell(dayInString, month, year) {
    // let colors = ["light-green", "dark-green", "dark-red", "light-red"];
    // let rand = Math.floor(Math.random() * 4);
    // let color = colors[rand];
    let color = "";

    // Get the expenses data from the localstorage.
    let expensesData = JSON.parse(localStorage.getItem("expenseData"));
    let totalBudget = localStorage.getItem("Total Budget");

    let dayTotalSpent = 0;
    let dailyBudget = totalBudget / daysInMonth(month, year);

    for (let idx = 0; idx < expensesData.length; idx++) {
        let expense = expensesData[idx];
        let date = expense['date'];
        let cost = expense['cost'];

        console.log("Date from localStorage:" + date)
        console.log("Day passed in:" + dayInString)

        // If it's the same day (same day,month, and year), increment to the day's total.
        if (date === dayInString) {
            dayTotalSpent += cost;
        }
    }

    let calc = dayTotalSpent / dailyBudget;

    // Dark-Red Case
    if (calc > 1.2) {
        color = "dark-red";
    }
    // Light-Red Case
    else if (calc > 1) {
        color = "light-red";
    }
    // Light-Green Case
    else if (calc > 0.8) {
        color = "light-green";
    }
    // Dark-Green Case
    else if (calc > 0) {
        color = "dark-green";
    }
    

    return color;
}

window.onclick = function(event) {
    showCalendar(currentMonth, currentYear);
}

    