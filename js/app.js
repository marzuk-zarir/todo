/**
 * Title: Todo App
 * Description: Todo app with javascript
 * Author: Marzuk Zarir
 * Date: 17-06-2021
 *
 */
const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input[type="text"]');
const completeTodo = document.querySelector('#complete-todo');
const incompleteTodo = document.querySelector('#incomplete-todo');
const todoCounter = document.querySelector('#todo-counter');
const completeKey = '__complete_tasks__';
const incompleteKey = '__incomplete_tasks__';

window.addEventListener('DOMContentLoaded', init);

// Main function
function init() {
    // show all todo when browser load
    showTodo(incompleteKey, (todo) => renderTodo(todo, incompleteTodo));
    showTodo(completeKey, (todo) => renderCompleteTodo(todo, completeTodo));

    // change todo from incomplete to complete container
    changeTodo(incompleteTodo, (todo) => {
        renderCompleteTodo(todo, completeTodo);
        saveTodo(todo, completeKey);
        removeTodo(todo, incompleteKey);
    });

    // change todo from complete to incomplete container
    changeTodo(completeTodo, (todo) => {
        renderTodo(todo, incompleteTodo);
        saveTodo(todo, incompleteKey);
        removeTodo(todo, completeKey);
    });

    updateCounter();

    // render new todo
    todoForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let todo = todoInput.value.trim();
        if (todo) {
            saveTodo(todo, incompleteKey);
            renderTodo(todo, incompleteTodo);
            updateCounter();
        } else {
            alert('Enter a todo');
        }
        todoInput.value = '';
    });
}

// show all todo on first load
function showTodo(localStorageKey, callback) {
    let todos = getTodo(localStorageKey);
    if (todos) {
        todos.forEach((todo) => callback(todo));
    }
}

// render incomplete todo
function renderTodo(task, parentEl) {
    parentEl.innerHTML += `
    <li class="list-group-item d-flex">
        <input type="checkbox" />
        <p class="lead">${task}</p>
    </li>
    `;
}

// render complete todo
function renderCompleteTodo(task, parentEl) {
    parentEl.innerHTML += `
    <li class="list-group-item d-flex">
        <input type="checkbox" checked />
        <p class="lead">${task}</p>
        <button class="btn btn-sm btn-danger ms-auto">
            Delete
        </button>
    </li>
    `;
}

// change todo from incomplete to complete list
function changeTodo(parentContainer, callback) {
    parentContainer.addEventListener('change', (e) => {
        if (e.target.nodeName == 'INPUT') {
            let todoText = e.target.nextElementSibling.innerText;
            setTimeout(() => {
                callback(todoText);
                parentContainer.removeChild(e.target.parentNode);
                updateCounter();
            }, 200);
        }
    });
}

// get todo from localStorage
function getTodo(localStorageKey) {
    let tasks = JSON.parse(localStorage.getItem(localStorageKey));
    return tasks;
}

// save todo for both complete and in complete todos
function saveTodo(task, localStorageKey) {
    let tasks;
    if (localStorage.getItem(localStorageKey)) {
        tasks = JSON.parse(localStorage.getItem(localStorageKey));
    } else {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

// remove todo from local storage
function removeTodo(taskText, localStorageKey) {
    let tasks = JSON.parse(localStorage.getItem(localStorageKey));
    for (let task in tasks) {
        if (tasks[task] === taskText) {
            tasks.splice(task, 1);
        }
    }
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

// update counter
function updateCounter() {
    let elementCount = incompleteTodo.childElementCount;
    todoCounter.innerHTML = elementCount;
}
