var taskIdCounter = 0;
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
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  
  // Create div for task info
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  var taskActionsEl = createTaskActions(taskIdCounter);

  listItemEl.appendChild(taskInfoEl);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
}

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  
  // Edit Button
  var editButtonEl = document.createElement("button");
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  editButtonEl.textContent = "Edit";

  actionContainerEl.appendChild(editButtonEl);
  
  // Delete Button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  deleteButtonEl.textContent ="Delete";

  actionContainerEl.appendChild(deleteButtonEl);

  // Status Select
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  // Status Select Options
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
}

formEl.addEventListener("submit", TaskFormHandler);