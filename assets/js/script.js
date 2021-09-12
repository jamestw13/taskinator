var formEl = document.querySelector("#task-form");
var taskListEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(event) {

  event.preventDefault();
  var taskItemEl = document.createElement("li");
  taskItemEl.textContent ="New Task";
  taskItemEl.className = "task-item";
  taskListEl.appendChild(taskItemEl);
}

formEl.addEventListener("submit", createTaskHandler);