const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const tasks = document.querySelector(".tasks");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const UserData = input.value;

  if (!UserData) {
    alert("Please enter a task before submitting!");
    return;
  }

  addTaskToDOM(UserData);
  saveTaskToLocalStorage(UserData);
  input.value = "";
});

// Load tasks from local storage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTaskToDOM(task);
  });
}

// Add task to the DOM
function addTaskToDOM(UserData) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.classList.add("mb-3");

  const content = document.createElement("div");
  content.classList.add("content");

  const task_input = document.createElement("input");
  task_input.classList.add("text");
  task_input.classList.add("form-control");
  task_input.classList.add("mb-2");
  task_input.value = UserData;
  task_input.setAttribute("readonly", "readonly");
  task_input.type = "text";

  content.appendChild(task_input);
  task.appendChild(content);
  tasks.appendChild(task);

  // Add buttons
  const actions = document.createElement("div");
  actions.classList.add("actions");

  const task_edit = document.createElement("button");
  task_edit.classList.add("edit");
  task_edit.classList.add("btn");
  task_edit.classList.add("btn-warning");
  task_edit.innerHTML = "Edit";

  const task_delete = document.createElement("button");
  task_delete.classList.add("delete");
  task_delete.classList.add("btn");
  task_delete.classList.add("btn-danger");
  task_delete.classList.add("mx-2");
  task_delete.innerHTML = "Delete";

  actions.appendChild(task_edit);
  actions.appendChild(task_delete);
  task.appendChild(actions);

  // Edit task
  task_edit.addEventListener("click", () => {
    if (task_edit.innerHTML === "Edit") {
      task_input.removeAttribute("readonly");
      task_input.focus();
      task_edit.innerHTML = "Save";
    } else {
      task_input.setAttribute("readonly", "readonly");
      task_edit.innerHTML = "Edit";
      updateTaskInLocalStorage(task_input.value, UserData); // Update local storage
      UserData = task_input.value; // Update in DOM
    }
  });

  // Delete task
  task_delete.addEventListener("click", () => {
    tasks.removeChild(task);
    deleteTaskFromLocalStorage(UserData);
  });
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Update task in local storage
function updateTaskInLocalStorage(updatedTask, oldTask) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = savedTasks.indexOf(oldTask);
  if (index !== -1) {
    savedTasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
}

// Delete task from local storage
function deleteTaskFromLocalStorage(task) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = savedTasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}
