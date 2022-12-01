/*
 * Hide the Reminders and Class on click of toggle button
 * @param - none
 */
function hideShowButton() {
    //get the class to disappeear
    var container = document.getElementsByClassName("reminders-calendar-container");
    
    //getElementsByClassName returns an array so for every single one display if
    //set to none or vice versa
    Array.from(container).forEach((x) => {
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
          toggleButton = "hide reminder";
        }
    })
}
