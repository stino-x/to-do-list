const inputArea = document.querySelector('#input');
const Form = document.querySelector('form');
const clearAll = document.querySelector('button');
let activityArray = [];
const enter = document.querySelector('#enter');
const activitySection = document.querySelector('#activity-list');
// const edit = document.querySelector('.edit');
// const deleteBTN = document.querySelector('.trash');
const reFresh = document.querySelector('#refresh');
// const inputAreaedit = document.querySelector('.input-edit');
function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}

function saveTasks() {
  localStorage.setItem('activities', JSON.stringify(activityArray));
}

function AddToScreen() {
  activitySection.innerHTML = '';
  let content = '';
  activityArray.forEach((task, index) => {
    content += `<li class="section listitem" id="${index}">
        <span class="activity td"><input type="checkbox" name="" class="check-box" ${task.completed ? 'checked' : ''}><span class="text">${task.description}</span>
        <i class="fa-solid fa-ellipsis-vertical"></i></span>
    </li>`;
    activitySection.innerHTML = content;
  });
}

if (activityArray.length > 0) {
  AddToScreen();
}

function AddtoList() {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = activityArray.length + 1;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTasks();
  AddToScreen();
}
Form.addEventListener('submit', (event) => {
  if (inputArea.value !== '') {
    event.preventDefault();
    AddtoList();
    saveTasks();
    AddToScreen();
  }
  Form.reset();
});
enter.addEventListener('dblclick', () => {
  if (inputArea.value !== '') {
    AddtoList();
    saveTasks();
    AddToScreen();
    Form.reset();
  }
});
const handleCheckboxchange = (event) => {
  const checkbox = event.target;
  const listItem = checkbox.parentNode.parentNode;
  const taskId = listItem.getAttribute('id');
  activityArray[taskId].completed = checkbox.checked;
  if (checkbox.checked) {
    listItem.querySelector('.text').classList.add('completed');
  } else {
    listItem.querySelector('.text').classList.remove('completed');
  }
  saveTasks();
};
activitySection.addEventListener('change', handleCheckboxchange);
activitySection.addEventListener('dblclick', (e) => {
  const listItem = e.target.parentNode.parentNode;
  if (e.target.classList.contains('fa-solid')) {
    listItem.classList.remove('listitem');
    listItem.classList.add('edit');
    const taskId = listItem.getAttribute('id');
    listItem.innerHTML = `<span class="activity">
  <input type="checkbox" name="" class="check-box check-box-edit">
  <input type="text" class="input-edit" value="${activityArray[taskId].description}">
  
      <box-icon name="trash-alt" type="solid" class="trash"></box-icon>
  
  </span>`;
    listItem.querySelector('.input-edit').focus();
  }
});
// ${activityArray[taskId].completed ? 'checked' : ''

activitySection.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    listItem.remove();
    const taskId = listItem.getAttribute('id');
    activityArray.splice(activityArray[taskId + 1].index, 1);
    saveTasks();
    AddToScreen();
  }
});

function deleteCheckedTasks() {
  activityArray = activityArray.filter((MyConstructor) => !MyConstructor.completed);
  saveTasks();
  AddToScreen();
}

clearAll.addEventListener('click', () => {
  deleteCheckedTasks();
  saveTasks();
  AddToScreen();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('refresh')) {
    reFresh.setAttribute('animation', 'spin');
    window.location.reload();
    window.addEventListener('load', () => {
      reFresh.setTimeout(() => reFresh.classList.remove('animation'), 4500);
    });
  }
});
