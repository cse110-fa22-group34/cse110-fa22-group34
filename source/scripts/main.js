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
// window.addEventListener('DOMContentLoaded', init);
// function init(){
// let visualizationTypeSelect = document.getElementById('visualization_type');
// var del_btn = document.querySelector(".del_select_btn");
// visualizationTypeSelect.addEventListener('change', function(){
//   if(visualizationTypeSelect.value == 'pie_chart' || visualizationTypeSelect.value == 'line_graph' || visualizationTypeSelect.value == 'character'){
//     del_btn.style.marginLeft =  "0%";
//     calendarHeading.style.marginLeft = "0%";
//   }
// });
// }
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
  var toggleButton = document.getElementById('toggleButton');
  
  
  //getElementsByClassName returns an array so for every single one display if
  //set to none or vice versa
  Array.from(container).forEach((x) => {
    if (x.style.display === "none") {
      //this changes the grid to the correct layout
      grid.classList.remove('toggleOFF');
      grid.classList.toggle('toggleON');
      togglebutton.setAttribute("value","ON");
      x.style.display = "block"; 

      del_btn.style.marginLeft =  "4%";
      calendarHeading.style.marginLeft = "2%";
      visualizationDiv.style.width = "300px";
      visualizationDiv.style.height = "300px";
      del_btn.style.marginLeft =  "10%";
      del_btn.style.marginLeft =  "0%";
      calendarHeading.style.marginLeft = "0%";
      if(visualizationTypeSelect.value == ""){
        del_btn.style.marginLeft =  "0%";
      del_btn.style.marginLeft =  "5%";
      toggleButton.innerHTML = '☰ Hide';

    } 
    else {
      grid.classList.remove('toggleON');
      grid.classList.toggle('toggleOFF');
      togglebutton.setAttribute("value","OFF");
      x.style.display = "none";
      del_btn.style.marginLeft =  "-19%";
      calendarHeading.style.marginLeft = "-22%";
      visualizationDiv.style.width = "500px";
      visualizationDiv.style.height = "400px";
      let visualizationTypeSelect = document.getElementById('visualization_type');
      if(visualizationTypeSelect.value == 'pie_chart' || visualizationTypeSelect.value == 'line_graph'){
        del_btn.style.marginLeft =  "-8%";
        calendarHeading.style.marginLeft = "-7%";
      }
      del_btn.style.marginLeft =  "-24%";
      toggleButton.innerHTML = '☰ Show More';
    }
  })
}
