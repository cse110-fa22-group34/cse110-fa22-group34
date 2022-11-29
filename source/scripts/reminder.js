var globalReminderIndex = 0

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
    globalReminderIndex++;
  }
}

function removeReminder(reminderId) {
  let reminder = document.getElementById(reminderId.toString(10));
  reminder.remove();
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

    let reminderListHTML= document.getElementById("reminderList")
    reminderListHTML.innerHTML = ""
    for (let reminder of reminderArr){
      reminderListHTML.append(reminder);
    }
  } else {
    alert("an error has occurred")
  }
}