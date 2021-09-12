var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var TaskFormHandler = function(event) {

  event.preventDefault();

  // Collect and package data from form
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

// Validate inputs
if (!taskNameInput || !taskTypeInput) {
  alert("Please fill out the task form before adding a task.");
  return false;
}

  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  }

  // Create task HTML
  createTaskEl(taskDataObj);

  formEl.reset();
}


var createTaskEl = function(taskDataObj) {
  // Create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  
  // Create div for task info
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", TaskFormHandler);