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
  // remaining budget value will update accordingly.
  total_budget_update_button.addEventListener('input',update_remaining_budget);
  total_budget_update_button.addEventListener('click',update_remaining_budget);

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
  // we update the value of remaining budget accordingly.
  save_budget_button.addEventListener('click',update_remaining_budget);
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
 * Function that draws the pie chart for the given data.
 * 
 * @param none
 */
function drawPieChart() {

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  async function drawChart() {

    let expensesData = await JSON.parse(localStorage.getItem("expenseData"));
    let totalCost = 0;
    
    let expenses = {};

    expensesData.forEach(expense => {
      let label = expense['label'], cost = expense['cost'];
      totalCost += expense['cost'];
      if(label in expenses){
        expenses[label] += cost;
      }
      else {
        expenses[label] = cost;
      }
    });

    let graphData = [
      ['Category', 'Expense']
    ];

    for (let [label, cost] of Object.entries(expenses)) {
      graphData.push([label, cost]);
    }

    let data = google.visualization.arrayToDataTable(graphData);

    // Custom options for the pie chart.
    let options = {
      title: 'My Expenses',
      
      // Show values in USD instead of percentages in pie slices.
      pieSliceText: 'value',
      backgroundColor: '#edf3f8',
      is3D: true,
    };

    let chart = new google.visualization.PieChart(document.getElementById('visualization_figure'));
    chart.draw(data, options);
  }
}

/**
 * Function that draws the line graph for the given data.
 * TODO: Modify the function to draw chart using dynamic data once backend APIs are implemented.
 */
function drawLineGraph() {

  google.charts.load('current', { packages: ['corechart', 'line'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', '$');

    // Add static example data.
    data.addRows([
      ['June', 670], ['July', 500], ['Aug', 880], ['Sept', 560], ['Oct', 780], ['Nov', 872]
    ]);

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

    let chart = new google.visualization.LineChart(document.getElementById('visualization_figure'));
    chart.draw(data, options);
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