"use strict";
let modeBtn = document.querySelector(".mode__btn");
const inputTodo = document.querySelector(".task__input");
const tasksContainer = document.querySelector(".display__tasks__container");
const taskChecked = document.querySelector(".check__task");
const tasks = document.querySelectorAll(".task");
let checkTaskButton = document.querySelectorAll(".check__task");
const itemsLeft = document.querySelector(".items__left");
let toggleImg = document.querySelector(".mode__btn");
const clear = document.querySelector(".clear__completed__tasks");

let todosArr = [];

const updateItemsLeft = () => {
  // Count the unchecked todos
  const uncheckedCount = document.querySelectorAll(
    ".task__container .check__task:not(.checked)"
  ).length;
  itemsLeft.textContent = uncheckedCount;
};
updateItemsLeft();

const toggleMode = () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme;

  let lightModeToggleImg = "./images/darkmode-toggle.png";
  let darkModeToggleImg = "./images/lightmode-toggle.png";

  if (currentTheme === "dark") {
    newTheme = "light";
    modeBtn.src = lightModeToggleImg;
  } else {
    newTheme = "dark";
    modeBtn.src = darkModeToggleImg;
  }
  document.documentElement.setAttribute("data-theme", newTheme);
};

const addTodo = (event) => {
  let newTodo = inputTodo.value;
  let html = `  
  <div class="task__container">
        <div class="check__task rounded__btn"></div>
            <div class="task__list">
              <p class="task">${newTodo}</p>
              <img
                src="./images/clear-btn.png"
                alt="clear-task"
                class="clear__btn"
                />
            </div>
         </div>
    `;
  if (event.key === "Enter") {
    if (newTodo.trim() !== "")
      tasksContainer.insertAdjacentHTML("beforeend", html);
    todosArr.push(inputTodo.value);
    console.log(todosArr);

    const activeState = document.querySelector(".todos__state.active");

    if (activeState && activeState.textContent.trim() === "Completed") {
      const newTask = tasksContainer.lastElementChild;
      newTask.style.display = "none";
    }

    updateItemsLeft();
    inputTodo.value = " ";
  }
};

const handleCheckTodo = () => {
  tasksContainer.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("check__task")) {
      // Get the parent task container
      const taskContainer = event.target.closest(".task__container");
      // Select the task
      const todoText = taskContainer.querySelector(".task");
      const removeTodo = taskContainer.querySelector(".clear__btn");

      event.target.classList.toggle("checked");

      if (event.target.classList.contains("checked")) {
        todoText.style.textDecoration = "line-through";
      } else {
        todoText.style.textDecoration = "none";
      }
      updateItemsLeft();
    }
    if (event.target && event.target.classList.contains("clear__btn")) {
      const parentContainer = event.target.closest(".task__container");
      // Get the index from the data attribute
      const index = event.target.dataset.index;
      todosArr.splice(index, 1);
      parentContainer.remove();
      console.log(todosArr);
      updateItemsLeft();
      console.log(parentContainer);
    }
  });
};
handleCheckTodo();

const handleSwitchState = () => {
  const todoStates = document.querySelectorAll(".todos__state");
  console.log(todosArr);
  todoStates.forEach(function (todostate, i) {
    todostate.addEventListener("click", function () {
      todoStates.forEach((state) => state.classList.remove("active"));
      todostate.classList.add("active");

      const parentContainer = document.querySelectorAll(".task__container");

      parentContainer.forEach(function (todos) {
        const isChecked = todos
          .querySelector(".check__task")
          .classList.contains("checked");

        if (i === 0) {
          todos.style.display = "flex";
          inputTodo.disabled = false;
        } else if (i === 1) {
          inputTodo.disabled = true;
          todos.style.display = isChecked ? "none" : "flex";
        } else {
          inputTodo.disabled = true;
          todos.style.display = isChecked ? "flex" : "none";
        }
      });
    });
  });
};
handleSwitchState();

const clearCompleted = () => {
  inputTodo.disabled = true;
  const completedTasks = document.querySelectorAll(
    ".task__container .check__task.checked"
  );
  completedTasks.forEach(function (tasks) {
    const parentEl = tasks.closest(".task__container");
    if (parentEl) {
      const taskText = parentEl.querySelector(".task").textContent.trim();
      parentEl.remove();
    }
  });
};

modeBtn.addEventListener("click", toggleMode);
inputTodo.addEventListener("keydown", addTodo);
clear.addEventListener("click", clearCompleted);
