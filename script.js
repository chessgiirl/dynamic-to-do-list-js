// All code runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ---- Select DOM elements (required names) ----
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input');   // Text input
    const taskList = document.getElementById('task-list');     // UL for tasks

    // ---- Initialization: load saved tasks from localStorage ----
    loadTasks();

    // ---- Attach event listeners ----
    addButton.addEventListener('click', addTask); // Add on button click
    taskInput.addEventListener('keypress', function (e) { // Add on Enter key
        if (e.key === 'Enter') addTask();
    });

    /**
     * addTask
     * Retrieve text from the input, validate, create a list item with a Remove button,
     * append to the list, save to localStorage, and clear input.
     */
    function addTask() {
        const taskText = taskInput.value.trim(); // get trimmed text
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a unique task object (id keeps duplicates distinct)
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        // Create the list item and remove button, and wire up events
        createTaskElement(task);

        // Save the new task into localStorage
        saveTaskToLocalStorage(task);

        // Clear the input field
        taskInput.value = "";
    }

    /**
     * createTaskElement(task)
     * Create an <li> element for a task object, attach a remove button,
     * allow toggling 'completed' by clicking the li, and append to taskList.
     */
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Apply completed styles if task.completed is true
        if (task.completed) li.classList.add('completed');

        // Toggle completion when user clicks the list item
        li.addEventListener('click', function () {
            li.classList.toggle('completed');
            toggleTaskCompletion(task.id);
        });

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Clicking remove should not toggle completion; stop event propagation
        removeBtn.onclick = function (e) {
            e.stopPropagation();
            li.remove();
            removeTaskFromLocalStorage(task.id);
        };

        // Append button and li to the UI
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * saveTaskToLocalStorage(task)
     * Saves a task object to localStorage (array stored under "tasks").
     */
    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * loadTasks()
     * Reads tasks from localStorage and renders them by creating LI elements.
     */
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (task) {
            createTaskElement(task);
        });
    }

    /**
     * removeTaskFromLocalStorage(id)
     * Remove a task by its id from localStorage.
     */
    function removeTaskFromLocalStorage(id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * toggleTaskCompletion(id)
     * Toggle the completed state of a task (in localStorage).
     */
    function toggleTaskCompletion(id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(t => {
            if (t.id === id) t.completed = !t.completed;
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
