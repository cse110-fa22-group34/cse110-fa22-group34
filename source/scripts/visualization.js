/**
 * A Javascript file which deals with drawing selected visualizations.
 * It includes implementations for drawing pie chart, line graph visualizations
 * for the given budget data. It used Google Charts Library to draw the said visualizations.
 * 
 * References: 
 *          Google Charts Library Docs
 *          MDN Web Docs
 */

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

function init() {
  // Get reference to the visualization type selector.
  let select_change = document.getElementById('visualization_type');
  // Add listener to the visualization type selector to draws the selected visualzation.
  select_change.addEventListener('change', showSelectedVisualization);

  // Get reference to the total budget input field.
  let total_budget_update_button = document.getElementById('total-budget');
  // If previous total budget value already exists in the localStorage then, fetch and populate it.
  if(localStorage.getItem('Total Budget')){
    total_budget_update_button.value=  localStorage.getItem('Total Budget');
  }
  let toggleBtn = document.getElementById("toggleButton");
  // Add listeners to the total budget input field so that when it's value is changed, 
  // remaining budget value and visualizations will update accordingly.
  total_budget_update_button.addEventListener('input',update_remaining_budget);
  total_budget_update_button.addEventListener('click',update_remaining_budget);
  total_budget_update_button.addEventListener('input',showSelectedVisualization);
  total_budget_update_button.addEventListener('click',showSelectedVisualization);
  toggleBtn.addEventListener('click',showSelectedVisualization);

  // Get reference to the remaining budget view.
  let remaining_amount = document.getElementById('budget-remaining-amount');
  // If previous remaining budget value already exists in the localStorage
  // then, fetch and populate it.
  if(localStorage.getItem('Remaining')){
    remaining_amount.textContent= '$'+localStorage.getItem('Remaining');
  }

    // Get reference to the remaining budget view.
    let remaining_amount_day = document.getElementById('budget-remaining-day');

  // If previous daily remaining budget value already exists in the localStorage
  // then, fetch and populate it.
  if(localStorage.getItem('RemainingDay')){
    remaining_amount_day.textContent= '$'+localStorage.getItem('RemainingDay');
  }

  // Get reference to the save budget button.
  let save_budget_button = document.getElementById("btn_save_budget");
  // Add listener to the save budget button so that when current budget changes, 
  // we update the value of remaining budget accordingly and also show updated visualization.
  save_budget_button.addEventListener('click',update_remaining_budget);
  save_budget_button.addEventListener('click',showSelectedVisualization);
}

/**
 * Function that draws the selected visualization when called.
 * 
 * @param none
 */
function showSelectedVisualization() {

  // Show 'visualization_figure' <div> in which the visualization will be drawn.
  // (It was initially hidden.)
  let visualizationFigure = document.getElementById('visualization_figure');
  let visualizationBugdet = document.getElementById('budget-visualization');
  visualizationFigure.style.display = 'block';

  // Get selected visualization type and draw it.
  let visualizationTypeSelect = document.getElementById('visualization_type');
  if (visualizationTypeSelect.value == 'pie_chart') {
    visualizationBugdet.style.display = 'none';
    drawPieChart();
  }
  else if (visualizationTypeSelect.value == 'line_graph') {
    visualizationBugdet.style.display = 'none';
    drawLineGraph();
  }
  else if (visualizationTypeSelect.value == 'character') {
    visualizationBugdet.style.display = 'none';
    drawChracter();
  }
  else if (visualizationTypeSelect.value == '') {
    visualizationBugdet.style.display = 'block';
    visualizationFigure.style.display = 'none';
  }
}

/**
 * Function that draws the pie chart for the expenses data.
 * 
 * @param none
 */
function drawPieChart() {

  // Load the Visualization API and the corechart package from Google Charts Library.
  google.charts.load('current', { packages: ['corechart'] });
  // Set callback function to be called after loading the library.
  // The callback function fetches expenses data and draws the pie chart.
  google.charts.setOnLoadCallback(drawChart);

  async function drawChart() {
    // Get the expenses data from the localstorage.
    let expensesData = await JSON.parse(localStorage.getItem("expenseData"));
    // Variable to store total expenditure.
    let totalCost = 0;
    
    // expenses Object to store cost associated with each label. (like a cost hashmap)
    let expenses = {};

    // Loop through the expenses data.
    expensesData.forEach(expense => {
      let label = expense['label'], cost = expense['cost'];
      // Update total expenditure so far.
      totalCost += expense['cost'];
      // Update cost associated with current label in the expenses Object.
      if(label in expenses){
        expenses[label] += cost;
      }
      else {
        expenses[label] = cost;
      }
    });

    // Restructure the {label:cost} data to match that of Google Charts library.
    let graphData = [
      // Headers for the pie chart data table.
      ['Category', 'Expense']
    ];

    // Add the {label:cost} entries to the chart data table.
    for (let [label, cost] of Object.entries(expenses)) {
      graphData.push([label, cost]);
    }

    // Get total budget (if one is set).
    let total_budget_update_button = document.getElementById('total-budget');
    let totalBudget = parseInt(total_budget_update_button.value) || 0;

    // If we are below our total budget, add a new row to the charts data table with lable 'Remaining'.
    if (totalCost < totalBudget){
      graphData.push(['Remaining', totalBudget - totalCost]);
    }
    
    // Custom options for the pie chart.
    let options = {
      // Set title of the pie chart.
      title: 'My Expenses',
      // Show cost values in USD instead of percentages in pie slices.
      pieSliceText: 'value',
      // Set background color of the pie chart.
      backgroundColor: '#edf3f8',
      //
      // Draw a 3D pie chart. (aesthetics :D)
      is3D: true,
    };
   
    // Convert data array to dataTable.
    graphData = google.visualization.arrayToDataTable(graphData);
    // Initialize a new pie chart with given data and custom options.
    let chart = new google.visualization.PieChart(document.getElementById('visualization_figure'));
    // Draw the pie chart.
    chart.draw(graphData, options);
  }
}

/**
 * Function that draws the line graph for the given data.
 * 
 * @param none
 */
function drawLineGraph() {

  // Load the Visualization API and the corechart, line packages from Google Charts Library.
  google.charts.load('current', { packages: ['corechart', 'line'] });
  // Set callback function to be called after loading the library.
  // The callback function fetches expenses data and draws the line graph.
  google.charts.setOnLoadCallback(drawChart);

  async function drawChart() {

    // Get the expenses data from the localstorage.
    let expensesData = await JSON.parse(localStorage.getItem("expenseData"));

    // Sort the budget entries w.r.t. their dates.
    // This is done to ensure that the entries in expenses Object are increasing w.r.t. their dates.
    expensesData.sort(function(a,b){
      return new Date(a['date']) - new Date(b['date']);
    });
    
    // expenses Object to store cost associated with each date. (like a date:cost hashmap)
    let expenses = {};

    // Loop through the expenses data.
    expensesData.forEach(expense => {
      let date = expense['date'], cost = expense['cost'];
      // Update cost associated with current date in the expenses Object.
      if(date in expenses){
        expenses[date] += cost;
      }
      else {
        expenses[date] = cost;
      }
    });

    // Restructure the {date:cost} data to match that of Google Charts library.
    let graphData = [
      // Headers for the line graph data table.
      ['Date', 'Expense']
    ];

    // Add the {date:cost} entries to the chart data table.
    for (let [date, cost] of Object.entries(expenses)) {
      graphData.push([date, cost]);
    }
    
    // Custom options for the line graph.
    let options = {
      // X-axis label.
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        // Y-axis label.
        title: 'Expenses (in USD)',
        // Start Y-axis values from 0.
        viewWindow: {
          min: 0
        }
      },
      // Set background color of the line graph.
      backgroundColor: '#edf3f8',
      // Hide line legend.
      legend: { position: 'none' }
    };

    // Convert data array to dataTable.
    graphData = google.visualization.arrayToDataTable(graphData);
    // Initialize a new line graph with given data and custom options.
    let chart = new google.visualization.LineChart(document.getElementById('visualization_figure'));
    // Draw the line graph.
    chart.draw(graphData, options);
  }
}

/**
 * Function that draws the appropriate charcter emotion w.r.t. current budget status.
 * 
 * @param none
 */
 function drawChracter() {
    // Get reference to visualization div and clear it.
    let visualizationFigure = document.getElementById('visualization_figure');
    visualizationFigure.innerHTML = '';

    // Create a new image element.
    let image = document.createElement('img');
    // Set id to the image element to apply css styles.
    image.setAttribute('id', 'visualization_character')

    // Get the total budget.
    const total_budget = document.getElementById('total-budget').value || 0;
    // Get total cost.
    const totalcost = localStorage.getItem('totalCost');

    // If we are under 70% of our total buget, show happy frog :)
    if(totalcost < 0.7*total_budget){
      image.setAttribute('src', '../source/assets/frog-happy.svg')
    }
    // Else if we under our available budget, show neutral frog -_-
    else if(totalcost < total_budget){
      image.setAttribute('src', '../source/assets/frog-neutral.svg')
    }
    // If we are over our budget, show sad frog :(
    else {
      image.setAttribute('src', '../source/assets/frog-sad.svg')
    }
    // Add the image element to the visualization div.
    visualizationFigure.appendChild(image)
  }

/**
 * Function that calculates and updates the remaining budget value and remaining per day.
 * 
 * @param none
 */
function update_remaining_budget(){
  // Get total budget (if set, else 0).
  const total_budget = document.getElementById('total-budget').value || 0;
  // If totalCost is not yet set in the localStorage, set it to zero.
  if(!localStorage.getItem('totalCost')){
    localStorage.setItem('totalCost',0);
  }
  // Get totalCost from localStorage.
  const totalcost = localStorage.getItem('totalCost');
  // Calculate remaining budget.
  const remaining_value = total_budget-totalcost;
  // Get reference to view that shows remaining budget.
  const remaining_value_display = document.getElementById('budget-remaining-amount');
  // Set it to the calculated remaining budget.
  remaining_value_display.textContent = '$'+remaining_value;

  // Calculate remaining budget per day.
  const remaining_value_day = ((total_budget-totalcost)/30);
  const r_remaining_value_day = remaining_value_day.toFixed(2);
  // Get reference to view that shows remaining budget.
  const remaining_value_day_display = document.getElementById('budget-remaining-day');
  // Set it to the calculated remaining budget.
  remaining_value_day_display.textContent = '$'+r_remaining_value_day;
  // Update values in the localStorage.
  localStorage.setItem('Total Budget',total_budget);
  localStorage.setItem('Remaining',remaining_value);
  localStorage.setItem('RemainingDay', r_remaining_value_day);
}
