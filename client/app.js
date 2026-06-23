const API_URL = 'http://localhost:5000/api/tasks';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYxNjIzOTAyMn0.123456';

async function fetchTasks() {
    const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    if (!res.ok) throw new Error('Ошибка загрузки');
    return res.json();
}

async function addTask(title) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error('Ошибка добавления');
    return res.json();
}

async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    if (!res.ok) throw new Error('Ошибка удаления');
}

async function toggleComplete(id, currentStatus) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ isCompleted: !currentStatus })
    });
    if (!res.ok) throw new Error('Ошибка обновления');
    return res.json();
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.is_completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}</span>
            <div class="task-actions">
                <button onclick="handleToggle(${task.id}, ${task.is_completed})">✅</button>
                <button onclick="handleDelete(${task.id})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}

window.handleToggle = async (id, currentStatus) => {
    await toggleComplete(id, currentStatus);
    loadTasks();
};
window.handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
};

async function loadTasks() {
    try {
        const tasks = await fetchTasks();
        renderTasks(tasks);
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
        alert('Не удалось загрузить задачи');
    }
}

document.getElementById('addBtn').addEventListener('click', async () => {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (!title) return alert('Введите название задачи');
    try {
        await addTask(title);
        input.value = '';
        loadTasks();
    } catch (error) {
        console.error('Ошибка добавления:', error);
        alert('Не удалось добавить задачу');
    }
});

loadTasks();