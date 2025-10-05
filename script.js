document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const addButton = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');

      // Append delete button to list item
      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      // Clear input field
      taskInput.value = '';

      // Delete task when delete button is clicked
      deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
      });

      // Mark task as completed when clicked
      li.addEventListener('click', function () {
        li.classList.toggle('completed');
      });
    }
  }

  // ✅ Attach event listeners
  addButton.addEventListener('click', addTask);

  // Fixed version — use 'keydown' instead of 'keypress'
  taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });
});
