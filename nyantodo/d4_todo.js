const newtask = document.getElementById('newtask');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById("todoList");
const duedate = document.getElementById('duedate');
const calendarBtn = document.getElementById('calendar-btn');

const fp = flatpickr(duedate, {
  allowInput: true,
  dateFormat: "Y-m-d",
  appendTo: calendarBtn 
});
calendarBtn.addEventListener('click', () => {
  fp.open();
});

function addTask(){
    const task = newtask.value.trim();
    const date = duedate.value;
    
    if (task){
        const li = document.createElement('li');
        li.className = 'checkcont'; // checkbox container
            
        const label = document.createElement('label');
        label.className = 'todoLabel';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'taskCheckbox';

        const span = document.createElement('span');
        span.className = 'checkmark';
        
        const taskText = document.createElement('span');
        taskText.className = 'taskText';
        taskText.textContent = task;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'dueDate';
        if (date) {
            dateSpan.textContent = ` (Due: ${date})`;
            dateSpan.style.marginLeft = "12px";
            dateSpan.style.fontSize = "0.9em";
        }

        label.appendChild(checkbox);
        label.appendChild(span);
        label.appendChild(taskText);
        if(date) label.appendChild(dateSpan);
        
        li.appendChild(label);
        todoList.appendChild(li);
        newtask.value = '';
        duedate.value = '';

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
        });
        delAllBtnVisibility();
    }
}
addBtn.addEventListener('click', addTask);

newtask.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // prevent form submit / page reload
        addTask();
    }
});

const delBtn = document.getElementById('delAll');
function delAllBtnVisibility() {
  if (todoList.children.length > 0) {
    delBtn.classList.add('visible'); // Show with custom styles
  } else {
    delBtn.classList.remove('visible'); // Hide and revert styles
  }
}
function delall(){
   todoList.innerHTML = '';
   delAllBtnVisibility();
}
delBtn.addEventListener('click',delall);

const checkbox = document.getElementById('darkModeCheckbox');
checkbox.addEventListener('change', () => {
  isDark = checkbox.checked;
  document.body.classList.toggle('dark-mode', isDark);
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  const calendarContainers = document.querySelectorAll('.flatpickr-calendar');
  calendarContainers.forEach(calendar => {
    if (isDark) {
      calendar.classList.add('flatpickr-dark');
    } else {
      calendar.classList.remove('flatpickr-dark');
    }
  });
});

// Load preference
if (localStorage.getItem('darkMode') === 'enabled') {
  checkbox.checked = true;
  document.body.classList.add('dark-mode');

  const calendarContainers = document.querySelectorAll('.flatpickr-calendar');
  calendarContainers.forEach(calendar => {
    calendar.classList.add('flatpickr-dark');
  });
}

