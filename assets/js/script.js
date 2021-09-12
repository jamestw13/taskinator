var buttonEl = document.querySelector("#save-task");
var taskListEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function() {
  var taskItemEl = document.createElement("li");
  taskItemEl.textContent ="New Task";
  taskItemEl.className = "task-item";
  taskListEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);