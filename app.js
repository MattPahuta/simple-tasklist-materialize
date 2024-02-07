// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    // create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  })
}

// Add task function
function addTask(e) {
  if (taskInput.value === '') { // handle empty input value
    alert('Add a task');
  }
  // create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  // create link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}

// Add to Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // if there's no 'tasks' item in local storage
    tasks = []; // add a 'tasks' item
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // if there's already tasks, get them
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to delete task?')) { // prompt for confirm
      e.target.parentElement.parentElement.remove();
      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // a more performative way, using a while loop:
  while(taskList.firstChild) { // while there's still a first child
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();

}

// Clear all tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

// add listener to ul of tasks
taskList.addEventListener('click', function(e){
  // console.log(`The event target tag is: ${event.target.tagName}`)
  let clickedListItem = e.target;
  // Delete Todo LI from list and local storage
  if (e.target.tagName === 'BUTTON'){
    // loop through the localstorage array
    for (let i=0; i<savedTodos.length; i++){
      // check if savedTodo task matches the innerText of the previousSibling (<span>) of the button clicked
      if (savedTodos[i].task === e.target.previousSibling.innerText) {
        savedTodos.splice(i,1);
        e.target.parentElement.remove();
        localStorage.setItem('todos', JSON.stringify(savedTodos));
      }
    }
  }
});
