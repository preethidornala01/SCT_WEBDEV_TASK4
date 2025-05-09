const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDateTime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');
const listsContainer = document.getElementById('lists-container');

let tasks = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const task = {
    id: Date.now(),
    name: taskInput.value,
    datetime: taskDateTime.value,
    list: taskList.value || "General",
    completed: false
  };

  tasks.push(task);
  form.reset();
  renderTasks();
});

function renderTasks() {
  listsContainer.innerHTML = '';

  const lists = {};

  tasks.forEach(task => {
    if (!lists[task.list]) lists[task.list] = [];
    lists[task.list].push(task);
  });

  for (const listName in lists) {
    const section = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = listName;
    section.appendChild(title);

    const ul = document.createElement('ul');

    lists[listName].forEach(task => {
      const li = document.createElement('li');

      const span = document.createElement('span');
      span.textContent = `${task.name} ${task.datetime ? `(${task.datetime})` : ''}`;
      if (task.completed) span.classList.add('completed');

      const actions = document.createElement('div');
      actions.classList.add('actions');

      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Undo' : 'Done';
      completeBtn.onclick = () => {
        task.completed = !task.completed;
        renderTasks();
      };

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        const newName = prompt('Edit task name:', task.name);
        const newDate = prompt('Edit date/time:', task.datetime);
        const newList = prompt('Edit list:', task.list);
        if (newName !== null) task.name = newName;
        if (newDate !== null) task.datetime = newDate;
        if (newList !== null) task.list = newList;
        renderTasks();
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks();
      };

      actions.appendChild(completeBtn);
      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(span);
      li.appendChild(actions);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    listsContainer.appendChild(section);
  }
}