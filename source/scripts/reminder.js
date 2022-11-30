var globalReminderIndex = 0
window.addEventListener('DOMContentLoaded', checkLocalStorage);

var reminderData = new Array();
/**	
 * This function checks the local storage of the website and performs different
 * actions based on the status of local storage.
 *  
 * @param none
 */
 function checkLocalStorage() {
  if (localStorage.getItem("globalReminderIndex") == null) {
    globalReminderIndex = 0;
  } else {
    globalReminderIndex = localStorage.getItem("globalReminderIndex");
  }
  // if the reminder data storage is not null
  if (JSON.parse(localStorage.getItem('reminderData')) != null) {
      // call the add reminder() 
      reminderData = JSON.parse(localStorage.getItem("reminderData"));
      reminderData.forEach(reminder => {
        console.log(reminder.id);
        console.log(reminder.name);
        loadReminder(reminder.name, reminder.id);
      });
  }
 }

/**	
 * This function takes in a string from the local storage data and creates a
 * new reminder for that note.
 *  
 * @param newReminder a string that holds the note that has been already saved
 */
function loadReminder(newReminder, id) {
   let reminderListHTML= document.getElementById("reminderList");
   
   reminderListHTML.innerHTML += ` <li id=\"${id}\">
                                      <button class="upArrow" onclick="swapReminders(${id}, 'up');">&uarr;</button>
                                      <button class="downArrow" onclick="swapReminders(${id}, 'down');">&darr;</button>
                                      &emsp;${newReminder}
                                      <button class="remove" onclick="removeReminder(${id});">&minus;</button>
                                    </li>`;
   document.getElementById("reminder").value = "";
  }
  
function addReminder() {
  let reminderListHTML= document.getElementById("reminderList");
  let newReminder = document.getElementById("reminder").value;
  if (newReminder == ""){
    alert("reminder name cannot be empty");
  } else {
    reminderListHTML.innerHTML += ` <li id=\"${globalReminderIndex}\">
                                      <button class="upArrow" onclick="swapReminders(${globalReminderIndex}, 'up');">&uarr;</button>
                                      <button class="downArrow" onclick="swapReminders(${globalReminderIndex}, 'down');">&darr;</button>
                                      &emsp;${newReminder}
                                      <button class="remove" onclick="removeReminder(${globalReminderIndex});">&minus;</button>
                                    </li>`;
    document.getElementById("reminder").value = "";
    reminderData.push({
      name : newReminder,
      id : globalReminderIndex});
    globalReminderIndex++;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));
    localStorage.setItem("globalReminderIndex", globalReminderIndex);
  }
}

function removeReminder(reminderId) {
  let reminder = document.getElementById(reminderId.toString(10));
  reminder.remove();
  console.log(reminderId);
  for (let i = 0; i < reminderData.length; i++){
    if (reminderData[i].id == reminderId){
      reminderData.splice(i, 1);
      localStorage.setItem("reminderData", JSON.stringify(reminderData));
      return;
    }
  }
}

function swapReminders(reminderId, direction){
  let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
  let currentReminderIndex = reminderArr.indexOf(document.getElementById(reminderId.toString(10)));
  if (currentReminderIndex == 0 && direction == "up"){
    alert("reminder is already on the top");
  } else if (currentReminderIndex == reminderArr.length-1 && direction == "down"){
    alert("reminder is already at the bottom");
  } else if (direction == "up"){
    let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
    let currentReminder = document.getElementById(reminderId.toString(10));
    let currentIndex = reminderArr.indexOf(currentReminder);
    let aboveReminder = reminderArr[currentIndex-1];
    
    reminderArr[currentIndex-1] = currentReminder;
    reminderArr[currentIndex] = aboveReminder;

    let temp = reminderData[currentIndex-1]
    reminderData[currentIndex-1] = reminderData[currentIndex];
    reminderData[currentIndex] = temp;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));

    let reminderListHTML= document.getElementById("reminderList")
    reminderListHTML.innerHTML = ""
    for (let reminder of reminderArr){
      reminderListHTML.append(reminder);
    }

  } else if (direction == "down"){
    let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
    let currentReminder = document.getElementById(reminderId.toString(10));
    let currentIndex = reminderArr.indexOf(currentReminder);
    let belowReminder = reminderArr[currentIndex+1];
    
    reminderArr[currentIndex+1] = currentReminder;
    reminderArr[currentIndex] = belowReminder;

    let temp = reminderData[currentIndex+1]
    reminderData[currentIndex+1] = reminderData[currentIndex];
    reminderData[currentIndex] = temp;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));

    let reminderListHTML= document.getElementById("reminderList")
    reminderListHTML.innerHTML = ""
    for (let reminder of reminderArr){
      reminderListHTML.append(reminder);
    }
  } else {
    alert("an error has occurred")
  }
}