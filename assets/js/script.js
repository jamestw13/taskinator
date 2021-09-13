var pageContentEl = document.querySelector("#page-content"); // creates an object from the entire main element
var taskIdCounter = 0; // gives task list elements unique id #s
var formEl = document.querySelector("#task-form"); // creates an object from the form
var tasksToDoEl = document.querySelector("#tasks-to-do"); // creates an object from the to do column
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); // creates an object from the in progress column
var tasksCompletedEl = document.querySelector("#tasks-completed"); // creates an object from the tasks completed column

var tasks = [];

// function that transfers edit form input into task's list item
var completeEditTask = function(taskName, taskType, taskId) {
  // selects the affected task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // updates the name and task information in list item
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  saveTasks();

  // resets form task id an form save/add task button
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
  
  // confirms change for user
  alert("Task Updated");
}

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

  // checks whether form is editing or creating a new task
  var isEdit = formEl.hasAttribute("data-task-id");
  // edits existing task
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }

  // creates new task
  else{
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    }
    
    // Create task HTML
    createTaskEl(taskDataObj);
  }

  // resets form to blank
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

  // Create controls for task item
  var taskActionsEl = createTaskActions(taskIdCounter);

  listItemEl.appendChild(taskInfoEl); // add info to list item
  listItemEl.appendChild(taskActionsEl); // add controls to list item
  tasksToDoEl.appendChild(listItemEl); // add list item to to do column

  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  saveTasks();

  taskIdCounter++; // updates task id for next new task
}

var createTaskActions = function(taskId) {
  // Create new control container
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  
  // Edit Button
  var editButtonEl = document.createElement("button");
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  editButtonEl.textContent = "Edit";

  
  // Delete Button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  deleteButtonEl.textContent ="Delete";
  
  
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
  
  actionContainerEl.appendChild(editButtonEl); // add edit button to control container
  actionContainerEl.appendChild(deleteButtonEl); // add delete button to control container
  actionContainerEl.appendChild(statusSelectEl); // add select menu to control container
  
  return actionContainerEl; // send control container back to list item
}


var taskButtonHandler = function(event) {
  
  // if is an edit button event - go to edit button function
  if(event.target.matches(".edit-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }
  // if is a delete button event - go to delete button function
  if(event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
}

var editTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); // create object from selected task
  var taskName = taskSelected.querySelector("h3.task-name").textContent; // get task's name
  var taskType = taskSelected.querySelector("span.task-type").textContent; // get task's type
  
  document.querySelector("input[name='task-name']").value = taskName; // set tasks' name in input field
  document.querySelector("select[name='task-type']").value = taskType; // set tasks' type in input field
  document.querySelector("#save-task").textContent = "Save Task"; // change button text
  
  formEl.setAttribute("data-task-id", taskId); // form to be selected task #, not a new one
}

// pick task list item to be removed and remove it
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  var updatedTaskArr = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
  tasks = updatedTaskArr;
  saveTasks();
}

var taskStatusChangeHandler = function(event) {
  
  var taskId = event.target.getAttribute("data-task-id"); // gets task id
  var statusValue = event.target.value.toLowerCase(); // gets option value
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); // gets list item

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }

  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  }

  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  saveTasks();
};

var saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


var loadTasks = function () {
  // get task items from localStorage
  var savedTasks = localStorage.getItem("tasks");
  if (!savedTasks) {
    return false;
  }

  // convert tasks from string to array of objects
  savedTasks = JSON.parse(savedTasks);
  for (var i = 0; i <savedTasks.length; i++) {
    createTaskEl(savedTasks[i]);
  }
}


loadTasks();
// Event Listeners
formEl.addEventListener("submit", TaskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);