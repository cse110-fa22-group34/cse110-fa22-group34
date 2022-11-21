// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

function init() {
  drawLineGraph();
  let select_change = document.getElementById('visualization_type');
  select_change.addEventListener('change', showSelectedVisualization);
}

/**
 * Function that draws the selected visualization when called.
 */
function showSelectedVisualization() {

  // Show 'visualization_figure' <div> in which the visualization will be drawn. (It was hidden initially.)
  let visualizationFigure = document.getElementById('visualization_figure');
  visualizationFigure.style.display = 'block';

  // Get selected visualization type and draw the graph.
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
    drawChracter();
  }
}

/**
 * Function that draws the pie chart for the given data.
 * TODO: Modify the function to draw chart using dynamic data once backend APIs are implemented.
 */
function drawPieChart() {

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    // Static example data.
    let data = google.visualization.arrayToDataTable([
      ['Category', 'Expense'],
      ['Grocery', 310],
      ['Commute', 200],
      ['Insurance', 50],
      ['Rent', 312],
      ['Remaining', 28]
    ]);

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