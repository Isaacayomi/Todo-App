"use strict";
let modeBtn = document.querySelector(".mode__btn");
const inputTodo = document.querySelector(".task__input");
const tasksContainer = document.querySelector(".display__tasks__container");
const taskChecked = document.querySelector(".check__task");
const tasks = document.querySelectorAll(".task");
let checkTaskButton = document.querySelectorAll(".check__task");
const itemsLeft = document.querySelector(".items__left");
let toggleImg = document.querySelector(".mode__btn");

const todosArr = [];

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

const handleSwitchState = () => {
  const todoStates = document.querySelectorAll(".todos__state");
  todoStates.forEach(function (todostate, i) {
    todostate.addEventListener("click", function () {
      todoStates.forEach((state) => state.classList.remove("active"));
      todostate.classList.add("active");
      if (i === 1) {
        
      }
    });
  });
};
handleSwitchState();

modeBtn.addEventListener("click", toggleMode);
inputTodo.addEventListener("keydown", addTodo);
handleCheckTodo();
