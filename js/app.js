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

window.addEventListener('DOMContentLoaded', init);

// Main function
function init() {
    // render all saved todos
    let allTodos = getTasks('__incomplete_tasks__');
    if (allTodos) {
        allTodos.forEach((todo) => {
            renderTodo(todo, incompleteTodo);
        });
    }

    // render new todo
    todoForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        let todo = todoInput.value.trim();

        if (todo) {
            saveTodo(todo, '__incomplete_tasks__');
            renderTodo(todo, incompleteTodo);
        } else {
            alert('Enter a todo');
        }

        todoInput.value = '';
    });
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

// get tasks from localStorage
function getTasks(localStorageKey) {
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
