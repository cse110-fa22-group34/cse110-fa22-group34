window.addEventListener('DOMContentLoaded', checkLocalStorage);

var reminderData = new Array();
/**	
 * This function checks the local storage of the website and performs different
 * actions based on the status of local storage.
 *  
 * @param none
 */
 function checkLocalStorage() {
  // if the reminder data storage is not null
  if (JSON.parse(localStorage.getItem('reminderData')) != null) {
      // call the add reminder() 
      reminderData = JSON.parse(localStorage.getItem("reminderData"));
      reminderData.forEach(reminder => {
        console.log(reminder);
        loadReminder(reminder);
      });
  }
 }

/**	
 * This function takes in a string from the local storage data and creates a
 * new reminder for that note.
 *  
 * @param newReminder a string that holds the note that has been already saved
 */
function loadReminder(newReminder) {
   let reminderListHTML= document.getElementById("reminderList");
  let reminderLen = reminderListHTML.childNodes.length;
  reminderListHTML.innerHTML += `<li id=\"${reminderLen+1}\">&emsp;${newReminder}<button class="remove" onclick="removeReminder(${reminderLen+1});">&minus;</button></li>`;
  document.getElementById("reminder").value = "";
  }

/**	
 * This function is trigged whenever the user clicks the plus button to add a
 * reminder, it first checks the field and then creates a reminder. It also 
 * saves that reminder to local storage
 *  
 * @param none
 */
function addReminder() {
    let reminderListHTML= document.getElementById("reminderList");
    let reminderLen = reminderListHTML.childNodes.length;
    let newReminder = document.getElementById("reminder").value;
    if (newReminder == ""){
      alert("reminder name cannot be empty")
    } else {
      reminderListHTML.innerHTML += `<li id=\"${reminderLen+1}\">&emsp;${newReminder}<button class="remove" onclick="removeReminder(${reminderLen+1});">&minus;</button></li>`;
      document.getElementById("reminder").value = "";
      reminderData.push(newReminder);
      localStorage.setItem("reminderData", JSON.stringify(reminderData));

    }

   
}

/**	
 * This function is trigged whenever the user clicks the minus button to remove a
 * reminder, it removes the reminder from the list and from local storage
 *  
 * @param none
 */
function removeReminder(reminderId) {
  let reminder = document.getElementById(reminderId.toString(10))
  reminder.remove();
  let index = reminderData.indexOf(reminder.innerText.substring(1, reminder.innerText.length - 1));
  reminderData.splice(index, 1);
  localStorage.setItem("reminderData", JSON.stringify(reminderData));
}