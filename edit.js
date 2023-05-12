checkboxselect.addEventListener('change', () => {
  task.completed = checkboxselect.checked;
  if (task.completed) {
    document.querySelector('.text').classList.add('completed');
  } else {
    document.querySelector('.text').classList.remove('completed');
    task.completed = false;
  }
  saveTasks();
});
edit.addEventListener('click', (e) => {
  const listItem = e.target.parentNode.parentNode;
  listItem.innerHTML = `<span class="activity">
    <input type="checkbox" name="" class="check-box check-box-edit">
    <input type="text" class="input-edit" value="${task.description}">
    
        <box-icon name="trash-alt" type="solid" class="trash"></box-icon>
    
    </span>`;
  document.querySelector('.input-edit').focus();
});

deleteBTN.addEventListener('click', (e) => {
  e.target.parentElement.parentElement.remove();
  activityArray.splice(task.Index - 1, 1);
  saveTasks();
  AddToScreen();
});

function deleteCheckedTasks() {
  activityArray = activityArray.filter((MyConstructor) => !MyConstructor.completed);
  saveTasks();
  AddToScreen();
}

const removingCancelfeature = (event) => {
    if (event.target.parentNode && event.target.parentNode.parentNode.classList.contains('edit')) {
      activitySection.removeEventListener('change', handleCheckboxchange);
    }
  };
  inputAreaedit.addEventListener('keydown', (e) => {
    const listItem = inputAreaedit.parentNode.parentNode;
    const taskId = listItem.getAttribute('id');
    if (e.key === 'Enter' && inputAreaedit.value !== `${activityArray[taskId].description}`) {
      inputAreaedit.value = `${activityArray[taskId].description}`;
      saveTasks();
      listItem.innerHTML = `<li class="section listitem" id="${taskId}">
      <span class="activity td">
      <input type="checkbox" name="" class="check-box"
       ${activityArray[taskId].completed ? 'checked' : ''}>
      <span class="text">${activityArray[taskId].description}</span>
      <i class="fa-solid fa-ellipsis-vertical"></i></span>
  </li>`;
    }
  });

clearAll.addEventListener('click', () => {
  // activityArray.splice(0, activityArray.length);
  deleteCheckedTasks();
  saveTasks();
  AddToScreen();
});

reFresh.addEventListener('click', () => {
  reFresh.setAttribute('animation', 'spin');
  window.location.reload();
  window.addEventListener('load', () => {
    reFresh.setTimeout(() => reFresh.classList.remove('animation'), 2500);
  });
});
listItem.innerHTML = `<li class="section listitem" id="${taskId}">
    <span class="activity td">
    <input type="checkbox" name="" class="check-box"
     ${activityArray[taskId].completed ? 'checked' : ''}>
    <span class="text">${activityArray[taskId].description}</span>
    <i class="fa-solid fa-ellipsis-vertical"></i></span>
</li>`;





export function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.classList.add('checkboxes');
    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-desc');
    const deleteButton = document.createElement('span');
​
    deleteButton.classList.add('delete-task-button');
​
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    taskDescription.innerText = task.description;
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
​
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
​
    // Add event listeners for checkbox, delete button, and double-click on task description
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
​
      taskItem.classList.toggle('completed', task.completed);
      saveTasks();
    });
​
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
​
    taskDescription.addEventListener('dblclick', () => {
      const input = document.createElement('input');
      input.classList.add('edit-desc');
      input.value = task.description;
      taskDescription.replaceWith(input);
      input.focus();
​
      input.addEventListener('blur', () => {
        task.description = input.value.trim();
        saveTasks();
        renderTasks();
      });
    });
  });
}
​