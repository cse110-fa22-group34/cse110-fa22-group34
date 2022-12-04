/**
 * A Javascript file which deals with the functionality of the toggle button.
 * This will either show or hide the reminders and calendar pop up, and fix the
 * layout as shown.
 * 
 * References: 
 *          MDN Web Docs
 *          TA - Shubham 12/1
 */

/**
 * Hide the Reminders and Class on click of toggle button and fix the containers
 * @param - none
 */
window.addEventListener('DOMContentLoaded', init);
  function init(){
  let togglebutton = document.getElementById("toggleButton");
  let visualizationTypeSelect = document.getElementById('visualization_type');
  let del_btn = document.querySelector(".del_select_btn");
  let calendarHeading = document.querySelector(".expTitle");
  visualizationTypeSelect.addEventListener('change',function(){
    if(togglebutton.getAttribute("value") == "OFF"){
    if(visualizationTypeSelect.value == 'pie_chart' || visualizationTypeSelect.value == 'line_graph'){
      del_btn.style.marginLeft =  "-10%";
    }
    if(visualizationTypeSelect.value == ""){
      del_btn.style.marginLeft =  "-22%";
    }
    if(visualizationTypeSelect.value == "character"){
      del_btn.style.marginLeft =  "-10%";
    }
  }
  });
}
function hideShowButton() {
  //get the class to disappear
  var container = document.getElementsByClassName("reminders-calendar-container");
  //get the grid to work
  let visualizationTypeSelect = document.getElementById('visualization_type');
  var grid = document.querySelector("div.main-body");
  //grab delete button to ensure smooth layout
  var del_btn = document.querySelector(".del_select_btn");
  let calendarHeading = document.querySelector(".expTitle");
  let visualizationDiv = document.getElementById("visualization_figure");
  let togglebutton = document.getElementById("toggleButton");
  let enterBudgeTitle = document.getElementById("enterMonthly");
  //getElementsByClassName returns an array so for every single one display if
  //set to none or vice versa
  Array.from(container).forEach((x) => {
    if (x.style.display === "none") {
      grid.classList.remove('toggleOFF');
      grid.classList.toggle('toggleON');
      togglebutton.setAttribute("value","ON");
      x.style.display = "block"; 
      visualizationDiv.style.width = "300px";
      visualizationDiv.style.height = "300px";
       if(visualizationTypeSelect.value == ""){
         del_btn.style.marginLeft =  "0%";
       }
       if(visualizationTypeSelect.value == "pie_chart" || visualizationTypeSelect.value ){
        del_btn.style.marginLeft = "0%";
        enterBudgeTitle.marginLeft = "0%";
      }
    } 
    else {
      //choose the correct grid
      grid.classList.remove('toggleON');
      grid.classList.toggle('toggleOFF');
      togglebutton.setAttribute("value","OFF");
      x.style.display = "none";
      //fix size of buttons and visualization
      visualizationDiv.style.width = "500px";
      visualizationDiv.style.height = "400px";
      if(visualizationTypeSelect.value==""){
        del_btn.style.marginLeft = "-27%"
      }
      if(visualizationTypeSelect.value == "pie_chart" || visualizationTypeSelect.value ){
        del_btn.style.marginLeft = "-9%"
      }
    }
  });
}
