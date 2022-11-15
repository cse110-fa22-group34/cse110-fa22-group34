var removeButtons = document.getElementsByClassName("remove");

for (var i = 0; i < removeButtons.length; i++) {
  removeButtons[i].addEventListener("click", function() {
    this.parentElement.style.display = 'none';
  });
}

function addReminder() {
    var reminderList= document.getElementById("reminderList");
    reminderList.innerHTML += "<li>&emsp;New Reminder<span class='remove'>&minus;</span></li>";
}