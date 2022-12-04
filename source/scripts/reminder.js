/**
 * This file is the javascript for the reminder section of the website.
 * It includes the implementation of adding and removing reminders,
 * changing the priority/order of the reminders and storing reminders 
 * data into the local storage.
 * 
 * References: MDN Web Docs
 */

/**
 * call the checkLocalStorage function whenever we loads the page
 */
window.addEventListener('DOMContentLoaded', checkLocalStorage);

var globalReminderIndex = 0;      // track the index of every new reminder
var reminderData = new Array();   // store all current reminders in order

/**	
 * This function checks the local storage of the website and performs different
 * actions based on the status of local storage.
 *  
 * @param none
 */
 function checkLocalStorage() {
  // restore globalReminderIndex from local storage is empty when loaded
  if (localStorage.getItem("globalReminderIndex") != null) {
    globalReminderIndex = localStorage.getItem("globalReminderIndex");
  }

  // if the reminder data storage is not null, call loadReminder to load every reminders
  if (JSON.parse(localStorage.getItem('reminderData')) != null) {
      reminderData = JSON.parse(localStorage.getItem("reminderData"));
      reminderData.forEach(reminder => {
        loadReminder(reminder.name, reminder.id);
      });
  }
 }

/**	
 * This function takes in a string and id pair from the local storage data 
 * and creates a new reminder for that note.
 *  
 * @param name a string that holds the reminder name that has been already saved
 * @param id an integer that holds the reminder id that has been already saved
 */
function loadReminder(name, id) {
  let reminderListHTML= document.getElementById("reminderList");
  reminderListHTML.innerHTML += ` <li id=\"${id}\">
                                    <button class="upArrow" onclick="swapReminders(${id}, 'up');">&uarr;</button>
                                    <button class="downArrow" onclick="swapReminders(${id}, 'down');">&darr;</button>
                                    <div class="reminderText">&emsp;${name}</div>
                                    <button class="remove" onclick="removeReminder(${id});">&minus;</button>
                                  </li>`;
}

/**	
 * This function reads user input and adds a new reminder to the reminder list and local storage
 *  
 * @param none
 */
function addReminder() {
  // get the existing reminder list and reads the user input
  let reminderListHTML= document.getElementById("reminderList");
  let newReminder = document.getElementById("reminder").value;

  // validate input and add it to the reminder list
  if (newReminder == ""){
    alert("reminder name cannot be empty");
  } else {
    reminderListHTML.innerHTML += ` <li id=\"${globalReminderIndex}\">
                                      <button class="upArrow" onclick="swapReminders(${globalReminderIndex}, 'up');">&uarr;</button>
                                      <button class="downArrow" onclick="swapReminders(${globalReminderIndex}, 'down');">&darr;</button>
                                      <div class="reminderText">&emsp;${newReminder}</div>
                                      <button class="remove" onclick="removeReminder(${globalReminderIndex});">&minus;</button>
                                    </li>`;

    // clear the input field
    document.getElementById("reminder").value = "";

    // update local storage data
    reminderData.push({
      name : newReminder,
      id : globalReminderIndex});
    globalReminderIndex++;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));
    localStorage.setItem("globalReminderIndex", globalReminderIndex);
  }
}

/**	
 * This function removes a reminder from the reminder list and local storage
 *  
 * @param reminderId the id of the reminder to be removed
 */
function removeReminder(reminderId) {
  // remove reminder from the page
  let reminder = document.getElementById(reminderId.toString(10));
  reminder.remove();

  // remove reminder from local storage
  for (let i = 0; i < reminderData.length; i++){
    if (reminderData[i].id == reminderId){
      reminderData.splice(i, 1);
      localStorage.setItem("reminderData", JSON.stringify(reminderData));
      return;
    }
  }
}

/**	
 * This function swap the order of 2 reminders
 *  
 * @param reminderId the id of the current reminder
 * @param direction a string indicating the direction of swapping, either up or down
 */
function swapReminders(reminderId, direction){
  // get the reminder list and the index of the current reminder
  let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
  let currentReminderIndex = reminderArr.indexOf(document.getElementById(reminderId.toString(10)));

  // validate swapping
  if (currentReminderIndex == 0 && direction == "up"){
    alert("reminder is already on the top");
  } else if (currentReminderIndex == reminderArr.length-1 && direction == "down"){
    alert("reminder is already at the bottom");
  
  // if swapping with the reminder above
  } else if (direction == "up"){
    // get current and above reminder
    let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
    let currentReminder = document.getElementById(reminderId.toString(10));
    let currentIndex = reminderArr.indexOf(currentReminder);
    let aboveReminder = reminderArr[currentIndex-1];
    
    // swap them in the list
    reminderArr[currentIndex-1] = currentReminder;
    reminderArr[currentIndex] = aboveReminder;

    // update local storage
    let temp = reminderData[currentIndex-1]
    reminderData[currentIndex-1] = reminderData[currentIndex];
    reminderData[currentIndex] = temp;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));

    // repopulate reminder list on the screen
    let reminderListHTML= document.getElementById("reminderList")
    reminderListHTML.innerHTML = ""
    for (let reminder of reminderArr){
      reminderListHTML.append(reminder);
    }

  // if swapping with the reminder below
  } else if (direction == "down"){
    // get current and below reminder
    let reminderArr = Array.from(document.getElementById("reminderList").getElementsByTagName("li"));
    let currentReminder = document.getElementById(reminderId.toString(10));
    let currentIndex = reminderArr.indexOf(currentReminder);
    let belowReminder = reminderArr[currentIndex+1];
    
    // swap them in the list
    reminderArr[currentIndex+1] = currentReminder;
    reminderArr[currentIndex] = belowReminder;

    // update local storage
    let temp = reminderData[currentIndex+1]
    reminderData[currentIndex+1] = reminderData[currentIndex];
    reminderData[currentIndex] = temp;
    localStorage.setItem("reminderData", JSON.stringify(reminderData));

    // repopulate reminder list on the screen
    let reminderListHTML= document.getElementById("reminderList")
    reminderListHTML.innerHTML = ""
    for (let reminder of reminderArr){
      reminderListHTML.append(reminder);
    }
  } else {
    alert("an error has occurred")
  }
}