/*
 * Hide the Reminders and Class on click of toggle button and fix the containers
 * @param - none
 */
function hideShowButton() {
  //get the class to disappeear
  var container = document.getElementsByClassName("reminders-calendar-container");
  //get the grid to work
  var grid = document.querySelector("div.main-body");
  var del_btn = document.querySelector(".del_select_btn");
  //getElementsByClassName returns an array so for every single one display if
  //set to none or vice versa
  Array.from(container).forEach((x) => {
    if (x.style.display === "none") {
      grid.classList.remove('toggleOFF');
      grid.classList.toggle('toggleON');
      x.style.display = "block"; 
      del_btn.style.marginLeft =  "5%";
    } 
    else {
      grid.classList.remove('toggleON');
      grid.classList.toggle('toggleOFF');
      x.style.display = "none";
      del_btn.style.marginLeft =  "-25%";
    }
  })
}
