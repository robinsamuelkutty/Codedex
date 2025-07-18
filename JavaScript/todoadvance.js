
const $ = (selector) => document.querySelector(selector);
const todoInput = $('#todo-input');
const addBtn = $('#add-btn');
const todoList = $('#todo-list');
const filterOptions = $('#filter');
const clearCompletedBtn = $('#clear-completed');
const statsDisplay = $('#stats');
const themeToggleBtn = $('#theme-toggle');
const exportBtn = $('#export-btn');
const importInput = $('#import-input');

// ========= State ========= //
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// ========= Event Listeners ========= //
addBtn.addEventListener('click', handleAddTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAddTodo();
});

filterOptions.addEventListener('change', () => renderTodos());

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

todoList.addEventListener('click', handleListClick);

themeToggleBtn?.addEventListener('click', toggleTheme);
exportBtn?.addEventListener('click', exportTodos);
importInput?.addEventListener('change', importTodos);

// ========= Core Functions ========= //
function handleAddTodo() {
  const text = todoInput.value.trim();
  if (!text) return alert('Please enter a task!');
  todos.push({
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    id: Date.now(),
    priority: 'normal'
  });
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

function handleListClick(e) {
  const el = e.target;
  const index = el.closest('li')?.dataset?.index;
  if (index === undefined) return;

  if (el.classList.contains('complete-btn')) {
    todos[index].completed = !todos[index].completed;
  } else if (el.classList.contains('delete-btn')) {
    todos.splice(index, 1);
  } else if (el.classList.contains('edit-btn')) {
    const newText = prompt('Edit your task:', todos[index].text);
    if (newText !== null) todos[index].text = newText.trim();
  } else if (el.classList.contains('priority-btn')) {
    cyclePriority(index);
  }

  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const filter = filterOptions.value;
  todoList.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  });

  if (!filtered.length) {
    todoList.innerHTML = '<li class="empty">No tasks to show</li>';
    updateStats();
    return;
  }

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'done' : ''}`;
    li.dataset.index = index;
    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <span class="priority ${todo.priority}">Priority: ${todo.priority}</span>
      <span class="timestamp">${formatDate(todo.createdAt)}</span>
      <div class="actions">
        <button class="edit-btn">✏️</button>
        <button class="priority-btn">🔼</button>
        <button class="complete-btn">${todo.completed ? '✅' : '✔️'}</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });

  updateStats();
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function cyclePriority(index) {
  const levels = ['low', 'normal', 'high'];
  const current = levels.indexOf(todos[index].priority);
  const next = (current + 1) % levels.length;
  todos[index].priority = levels[next];
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function exportTodos() {
  const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'todos-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importTodos(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data)) {
        todos = data;
        saveTodos();
        renderTodos();
      } else {
        alert('Invalid JSON format');
      }
    } catch (err) {
      alert('Failed to parse file.');
    }
  };
  reader.readAsText(file);
}

function updateStats() {
  if (!statsDisplay) return;
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const high = todos.filter(t => t.priority === 'high').length;
  statsDisplay.innerText = `Total: ${total}, Completed: ${completed}, High Priority: ${high}`;
}

function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

// ========= Initial Render ========= //
initTheme();
renderTodos();

// ========= Utility Dev Helper ========= //
function fillDemoTodos() {
  if (todos.length > 0) return;
  const demo = [
    'Complete project report',
    'Review pull requests',
    'Call Priya for update',
    'Buy groceries',
    'Walk the dog',
    'Backup all data',
    'Practice JavaScript'
  ];
  todos = demo.map((text, i) => ({
    text,
    completed: i % 2 === 0,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    id: Date.now() + i,
    priority: i % 3 === 0 ? 'high' : i % 2 === 0 ? 'normal' : 'low'
  }));
  saveTodos();
  renderTodos();
}

// Uncomment to auto-fill demo data on first load
// fillDemoTodos();
