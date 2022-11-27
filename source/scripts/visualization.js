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
  // Add listeners to the total budget input field so that when it's value is changed, 
  // remaining budget value and visualizations will update accordingly.
  total_budget_update_button.addEventListener('input',update_remaining_budget);
  total_budget_update_button.addEventListener('click',update_remaining_budget);
  total_budget_update_button.addEventListener('input',showSelectedVisualization);
  total_budget_update_button.addEventListener('click',showSelectedVisualization);

  // Get reference to the remaining budget view.
  let remaining_amount = document.getElementById('budget-remaining-amount');
  // If previous remaining budget value already exists in the localStorage
  // then, fetch and populate it.
  if(localStorage.getItem('Remaining')){
    remaining_amount.textContent= '$'+localStorage.getItem('Remaining');
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
  visualizationFigure.style.display = 'block';

  // Get selected visualization type and draw it.
  let visualizationTypeSelect = document.getElementById('visualization_type');
  if (visualizationTypeSelect.value == 'pie_chart') {
    drawPieChart();
  }
  else if (visualizationTypeSelect.value == 'line_graph') {
    drawLineGraph();
  }
  else if (visualizationTypeSelect.value == 'character') {
    drawChracter();
  }
  else if (visualizationTypeSelect.value == '') {
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
      // Update cost associated with current label in the cost Object.
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

    expensesData.sort(function(a,b){
      return new Date(a['date']) - new Date(b['date']);
    });
    
    let expenses = {};

    expensesData.forEach(expense => {
      let date = expense['date'], cost = expense['cost'];
      if(date in expenses){
        expenses[date] += cost;
      }
      else {
        expenses[date] = cost;
      }
    });

    let graphData = [
      ['Date', 'Expense']
    ];

    for (let [date, cost] of Object.entries(expenses)) {
      graphData.push([date, cost]);
    }
    
    // Custom options for the line graph.
    let options = {
      hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Expenses (in USD)',
        // Start Y-axis values from 0.
        viewWindow: {
          min: 0
        }
      },
      backgroundColor: '#edf3f8',
      // Hide line legend.
      legend: { position: 'none' }
    };

    graphData = google.visualization.arrayToDataTable(graphData);
    let chart = new google.visualization.LineChart(document.getElementById('visualization_figure'));
    chart.draw(graphData, options);
  }
}

/**
 * Function that draws the appropriate charcter emotion w.r.t. current budget status.
 * TODO: Find character vectors and implement.
 */
 function drawChracter() {
    let visualizationFigure = document.getElementById('visualization_figure');
    visualizationFigure.style.display = 'none';
  }

/**
 * Function update the remaining value
 * 
 */
function update_remaining_budget(){
  const total_budget = document.getElementById('total-budget').value;
  if(!localStorage.getItem('totalCost')){
    localStorage.setItem('totalCost',0);
  }
  const totalcost = localStorage.getItem('totalCost');
  const remaining_value = total_budget-totalcost;
  const remaining_value_display = document.getElementById('budget-remaining-amount');
  remaining_value_display.textContent = '$'+remaining_value;
  localStorage.setItem('Total Budget',total_budget);
  localStorage.setItem('Remaining',remaining_value);
}