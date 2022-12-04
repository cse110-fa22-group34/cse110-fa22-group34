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
function hideShowButton() {
  //get the class to disappear
  var container = document.getElementsByClassName("reminders-calendar-container");
  //get the grid to work
  var grid = document.querySelector("div.main-body");
  //grab delete button to ensure smooth layout
  var del_btn = document.querySelector(".del_select_btn");
  //
  var toggleButton = document.getElementById('toggleButton');

  //getElementsByClassName returns an array so for every single one display if
  //set to none or vice versa
  Array.from(container).forEach((x) => {
    if (x.style.display === "none") {
      //this changes the grid to the correct layout
      grid.classList.remove('toggleOFF');
      grid.classList.toggle('toggleON');
      x.style.display = "block"; 
      del_btn.style.marginLeft =  "5%";
      toggleButton.innerHTML = '☰ Hide';

    } 
    else {
      grid.classList.remove('toggleON');
      grid.classList.toggle('toggleOFF');
      x.style.display = "none";
      del_btn.style.marginLeft =  "-24%";
      toggleButton.innerHTML = '☰ Show More';
    }
  })
}
