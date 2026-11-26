const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const allTasksButton = document.getElementById("allTasksButton");
const activeTasksButton = document.getElementById("activeTasksButton");
const completedTasksButton = document.getElementById("completedTasksButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  filteredTasks.forEach(function (task) {
    const taskItem = document.createElement("li");

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    taskText.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item !== task;
      });

      saveTasks();
      displayTasks();
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  displayTasks();
  taskInput.value = "";
});

allTasksButton.addEventListener("click", function () {
  currentFilter = "all";
  displayTasks();
});

activeTasksButton.addEventListener("click", function () {
  currentFilter = "active";
  displayTasks();
});

completedTasksButton.addEventListener("click", function () {
  currentFilter = "completed";
  displayTasks();
});

displayTasks();
