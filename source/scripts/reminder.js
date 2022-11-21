function addReminder() {
    let reminderListHTML= document.getElementById("reminderList");
    let reminderLen = reminderListHTML.childNodes.length;
    let newReminder = document.getElementById("reminder").value;
    if (newReminder == ""){
      alert("reminder name cannot be empty")
    } else {
      reminderListHTML.innerHTML += `<li id=\"${reminderLen+1}\">&emsp;${newReminder}<button class="remove" onclick="removeReminder(${reminderLen+1});">&minus;</button></li>`;
      document.getElementById("reminder").value = "";
    }
}

function removeReminder(reminderId) {
  let reminder = document.getElementById(reminderId.toString(10))
  reminder.remove();
}