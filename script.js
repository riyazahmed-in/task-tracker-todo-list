const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  taskItem.addEventListener("click", function () {
    taskItem.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    taskItem.remove();
  });

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  taskInput.value = "";
});
