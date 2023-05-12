const inputArea = document.querySelector('#input');
const Form = document.querySelector('form');
const clearAll = document.querySelector('button');
let activityArray = [];
const enter = document.querySelector('#enter');
const activitySection = document.querySelector('#activity-list');
// const edit = document.querySelector('.edit');
// const deleteBTN = document.querySelector('.trash');
const reFresh = document.querySelector('#refresh');
const deleteIcons = document.querySelectorAll('.trash');
// const listItems = document.querySelector('li');
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
  activityArray.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('section', 'listitem');
    li.id = index;

    const span = document.createElement('span');
    span.classList.add('activity', 'td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.classList.add('check-box');
    checkbox.checked = task.completed;

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('text');
    taskDescription.textContent = task.description;

    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa-solid', 'fa-ellipsis-vertical');

    span.appendChild(checkbox);
    span.appendChild(taskDescription);
    span.appendChild(ellipsis);

    li.appendChild(span);

    activitySection.appendChild(li);

    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      li.classList.toggle('completed', task.completed);
      saveTasks();
    });
    // delete stuff
    deleteIcons.forEach((icon) => {
      icon.addEventListener('click', (e) => {
        // Get the index of the task to be deleted
        const { index } = e.target.dataset;
        // Remove the task from the array
        activityArray.splice(index, 1);
        // Update local storage with the new array of tasks
        saveTasks();
        // Remove the task element from the DOM
        e.target.parentElement.remove();
      });
    });
    // Add a double click event listener to the activity section
    activitySection.addEventListener('dblclick', (e) => {
      const listItem = e.target.closest('li');
      if (e.target.classList.contains('fa-solid')) {
        // Remove the existing list item styling and add the edit class
        listItem.classList.remove('listitem');
        listItem.classList.add('edit');
        const taskId = listItem.getAttribute('id');
        // Create the edit form HTML
        const span = document.createElement('span');
        span.classList.add('activity');
        const input = document.createElement('input');
        input.focus();
        input.type = 'text';
        input.classList.add('input-edit');
        input.value = activityArray[taskId].description;
        const trashIcon = document.createElement('box-icon');
        // trashIcon.addEventListener('click', deLete); // event listener
        trashIcon.setAttribute('name', 'trash-alt');
        trashIcon.setAttribute('type', 'solid');
        trashIcon.classList.add('trash');
        span.appendChild(input);
        span.appendChild(trashIcon);
        // Replace the existing HTML with the edit form HTML
        listItem.innerHTML = '';
        listItem.appendChild(span);
        listItem.querySelector('.input-edit').setAttribute('id', `input-edit-${index}`);
      }
    });
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
// activitySection.addEventListener('dblclick', (e) => {
//   const listItem = e.target.parentNode.parentNode;
//   if (e.target.classList.contains('fa-solid')) {
//     listItem.classList.remove('listitem');
//     listItem.classList.add('edit');
//     const taskId = listItem.getAttribute('id');
//     listItem.innerHTML = `<span class="activity">
//   <input type="text" class="input-edit" value="${activityArray[taskId].description}">
//       <box-icon name="trash-alt" type="solid" class="trash"></box-icon>
//   </span>`;
//     // listItem.querySelector('.input-edit').focus();
//     listItem.querySelector('.input-edit').setAttribute('id', `input-edit-${taskId}`);
//   }
// });
// ${activityArray[taskId].completed ? 'checked' : ''

activitySection.addEventListener('click', (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    const taskIndex = listItem.getAttribute('id');
    // const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem) - 1;
    activityArray.splice(taskIndex, 1);
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

// const editTask = (newDescription, taskId) => {
//   activityArray[taskId].description = newDescription;
//   saveTasks();
// };

activitySection.addEventListener('keypress', (e) => {
  const parent = e.target.parentNode.parentNode;
  const index = parent.getAttribute('id');
  if (e.key === 'Enter' && e.target.classList.contains('input-edit')) {
    const newDescription = e.target.value;
    // editTask(newDescription, index);
    activityArray[index].description = newDescription;
    saveTasks();
    parent.innerHTML = `
    <span class="activity td"><input type="checkbox" name="" class="check-box" ${activityArray[index].completed ? 'checked' : ''}><span class="text">${activityArray[index].description}</span>
    <i class="fa-solid fa-ellipsis-vertical"></i></span>
`;
    parent.classList.add('listitem');
    parent.classList.remove('edit');
  }
});