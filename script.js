const mainTaskContainer = document.querySelector('.main-task-cointainer');
const input = document.querySelector('#input');
const taskCompleted = document.querySelector('#task-completed');
const totalTask = document.querySelector('#total-task');

const itemsArr = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

function createItems(item) {
  item == '' ? console.log('Enter a value first') : itemsArr.push(item);
  localStorage.setItem('items', JSON.stringify(itemsArr));
}

function addTask() {
  const taskCon = document.querySelectorAll('.task-container');
  taskCon.forEach((e) => e.remove());
  const item = {
    input: input.value,
    state: false,
  };

  createItems(item);

  itemsArr.forEach((e, index) => {
    createMarkUp(e, index);
  });
  input.value = '';
}

function createMarkUp(e, index) {
  const markUp = ` 
    <div class="task-container" id="task-container">
         <input type="checkbox" class="checkbox" onclick="isChecked(this)"/>

           <p class="todoList  ${index}" >${e}</p>
           <div class="inner-div">
             <span class="edit">EDIT</span>
           <span class="delete"  onclick="deleteTodo(this)">DELETE</span>
         </div>

         </div>`;

  mainTaskContainer.insertAdjacentHTML('beforeend', markUp);
}

function isChecked(e) {
  //   console.log(e.checked);
  const checkBox = document.getElementsByClassName('checkbox');
  const data = e.closest('.task-container');

  const todo = data.querySelector('.todoList');
  //   console.log(checkBox);
  //   const todo = document.querySelector('.todoList');
  //   console.log(todo);

  // If the checkbox is checked, display the output text
  Array.from(checkBox).forEach((chkbx, index) => {
    // const container = chkbx.closest('.todo');
    if (e.checked == true) {
      const getted = JSON.parse(localStorage.getItem('items'));

      getted[index].state = true;

      localStorage.setItem('items', JSON.stringify(getted));

      todo.style.textDecoration = '3px line-through red';
      data.style.opacity = '0.5';
    } else {
      const getted = JSON.parse(localStorage.getItem('items'));
      getted[index].state = false;

      localStorage.setItem('items', JSON.stringify(getted));
      todo.style.textDecoration = 'none';
      data.style.opacity = '1';
    }
  });
}

input.addEventListener('change', addTask);
addEventListener('load', addTask);
