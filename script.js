// Ensure script runs after HTML is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements (required names)
  const addButton = document.getElementById('add-task-btn'); // Add Task button
  const taskInput = document.getElementById('task-input');   // Input field for tasks
  const taskList = document.getElementById('task-list');     // UL to contain tasks

  /**
   * addTask
   * - Read the input, trim it, and store in variable taskText
   * - If empty, alert the user
   * - If not empty: create li, create Remove button (class 'remove-btn'),
   *   set onclick to remove the li from taskList, append the button to li,
   *   append li to taskList, and clear the input.
   */
  function addTask(event) {
    // Prevent default form submission if triggered by Enter key
    if (event) event.preventDefault();

    // Retrieve and trim value from input
    const taskText = taskInput.value.trim();

    // Check if taskText is empty and alert if so
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create new li element and set its text content
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create the Remove button and set required class and text
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Assign onclick to remove the li element from taskList
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append the remove button to the li, then append li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the task input field
    taskInput.value = "";
  }

  // Attach event listener to addButton to call addTask on click
  addButton.addEventListener('click', addTask);

  // Attach event listener to taskInput for 'keypress' to add task on Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(event);
    }
  });
});
