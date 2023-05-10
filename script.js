const inputArea = document.querySelector('#input');
const clearAll = document.querySelector('.clear-all');
let activityArray = [];
const enter = document.querySelector('#enter');
const activitySection = document.querySelector('#activity-list');
const edit = document.querySelector('.fa-solid');
const deleteBTN = document.querySelector('.trash');
const checkboxselect = document.querySelector('.check-box');
const reFresh = document.querySelector('#refresh');
function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}

export function saveTasks() {
  localStorage.setItem('activities', JSON.stringify(activityArray));
}

export function AddToScreen() {
  activitySection.innerHTML = '';
  activityArray.forEach((task) => {
    if (inputArea.value !== '') {
      const tableRow = document.createElement('tr');
      const tableData = document.createElement('td');
      tableData.classList.add('activity');
      tableData.setAttribute('id', `task-${task.Index}`);
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'check-box');
      checkbox.checked = task.completed;
      tableData.appendChild(checkbox);
      const taskinputspan = document.createElement('span');
      taskinputspan.innerText = `${task.description}`;
      tableData.appendChild(taskinputspan);
      const image = document.createElement('i');
      image.classList.add('fa-solid fa-ellipsis-vertical');
      tableData.appendChild(image);
      tableRow.appendChild(tableData);
      activitySection.appendChild(tableRow);
    }
    checkboxselect.addEventListener('change', () => {
      task.completed = !task.completed;
      document.querySelector('.activity').classList.toggle('completed', task.completed);
      saveTasks();
    });
    clearAll.addEventListener('click', () => {
      activityArray.splice(0, activityArray.length);
      saveTasks();
      AddToScreen();
    });
    edit.addEventListener('click', (e) => {
      const tableRow = e.target.parentElement.parentElement;
      const tableData = tableRow.firstElementChild;
      tableData.setAttribute('class', 'activity edit');
      tableData.classList.remove('activity');
      const editInput = tableRow.querySelector('.check-box');
      task.description = editInput.value.trim();
      editInput.setAttribute('type', 'text');
      editInput.setAttribute('class', 'input-edit');
      editInput.removeAttribute('class', 'check-box');
      // editInput.setAttribute('placeholder', 'Add to your list...');
      tableData.appendChild(editInput);
      const trashSpan = tableRow.querySelector('span');
      trashSpan.innerText = '';
      const trashIcon = document.createElement('box-icon');
      trashSpan.appendChild(trashIcon);
      trashIcon.setAttribute('name', 'trash-alt');
      trashIcon.setAttribute('type', 'solid');
      trashIcon.setAttribute('class', 'trash');
      tableData.appendChild(trashSpan);
      tableRow.appendChild(tableData);
      const image = document.querySelector('i');
      image.remove();
    });
    deleteBTN.addEventListener('click', (e) => {
      e.target.parentElement.parentElement.remove();
      activityArray.splice(task.Index, 1);
      saveTasks();
      AddToScreen();
    });
  });
}

if (activityArray.length > 0) {
  AddToScreen();
}

export function AddtoList(task) {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = task.dataset.index;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTasks();
  AddToScreen();
}

// Delete all checked tasks
export function deleteCheckedTasks() {
  activityArray = activityArray.filter((MyConstructor) => !MyConstructor.completed);
  saveTasks();
  AddToScreen();
}

inputArea.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.keyCode === 13) && inputArea !== '') {
    event.preventdefault();
    AddtoList();
    saveTasks();
    AddToScreen();
  }
});
enter.addEventListener('click', () => {
  if (inputArea.value !== '') {
    AddtoList();
    saveTasks();
    AddToScreen();
  }
});
reFresh.addEventListener('click', () => {
  reFresh.setAttribute('animation', 'spin');
  window.location.reload();
  window.addEventListener('load', () => {
    reFresh.setTimeout(() => reFresh.classList.remove('animation'), 2500);
  });
});
