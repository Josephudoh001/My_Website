document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. ACADEMIC PLANNER LOGIC (planner.html)
    // ==========================================
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    if (addTaskBtn && taskInput && taskList) {
        let tasks = [];

        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const taskText = taskInput.value.trim();

            if (taskText === "") {
                alert("Please enter a valid task description.");
                return;
            }

            tasks.push({ text: taskText, completed: false });
            renderTasks();
            taskInput.value = "";
        });

        window.toggleTask = function(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        };

        window.deleteTask = function(index) {
            tasks.splice(index, 1);
            renderTasks();
        };

        function renderTasks() {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="task-actions">
                        <button class="btn-small btn-complete" onclick="toggleTask(${index})">
                            ${task.completed ? 'Unmark' : 'Done'}
                        </button>
                        <button class="btn-small btn-delete" onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    }

    // ==========================================
    // 2. CONTACT FORM VALIDATION (contact.html)
    // ==========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Requirement: Check if any field is empty
            if (!name || !email || !phone || !message) {
                alert("Validation Error: No field can be left empty.");
                return;
            }

            // Requirement: Check valid email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Validation Error: Please enter a valid email address format.");
                return;
            }

            // Requirement: Check phone number contains only digits
            const phonePattern = /^\d+$/;
            if (!phonePattern.test(phone)) {
                alert("Validation Error: Phone number must contain only digits.");
                return;
            }

            alert("Success! Your message has been sent successfully.");
            contactForm.reset();
        });
    }
});