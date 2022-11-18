function addReminder() {
    var reminderListHTML= document.getElementById("reminderList");
    var reminderLen = reminderListHTML.childNodes.length;
    var newReminder = document.getElementById("reminder").value;
    if (newReminder == ""){
      alert("reminder name cannot be empty")
    } else {

      reminderListHTML.innerHTML += `<li id=\"${reminderLen+1}\">&emsp;${newReminder}<button class="remove" onclick="removeReminder(${reminderLen+1});">&minus;</button></li>`;
      document.getElementById("reminder").value = "";
      console.log(reminderLen);
    }
}

function removeReminder(elem) {
  var a = document.getElementById(elem.toString(10))
  a.remove();
}