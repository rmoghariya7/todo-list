const mainTaskContainer = document.querySelector('.main-task-cointainer');
const taskCompleted = document.querySelector('#task-completed');
const totalTask = document.querySelector('#total-task');
let itemsArr = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

let id = 400;
function createMarkUp(e, index) {
  const markUp = ` 
      <div class="task-container" id=${e.id} ${
    e.state == true ? 'style="opacity:0.5"' : ''
  }>
           <input type="checkbox" class="checkbox" ${
             e.state == true ? 'checked ' : ''
           }  onclick="isChecked(this)"/>
  
             <p class="todoList  ${index}" contenteditable="false"  ${
    e.state == true
      ? 'style="text-decoration: 3px line-through red"'
      : 'style="opacity:1"'
  }>${e.input}</p>
             <div class="inner-div">
               <span class="edit">EDIT</span>
             <span class="delete" onclick="deleteTodo();">DELETE</span>
           </div>
  
           </div>`;

  mainTaskContainer.insertAdjacentHTML('beforebegin', markUp);
}

function createItems(item) {
  itemsArr?.push(item);
  localStorage.setItem('items', JSON.stringify(itemsArr));
}

function addTask() {
  console.log(itemsArr);
  const input = document.querySelector('#input');
  const taskCon = document.querySelectorAll('.task-container');
  taskCon.forEach((e) => e.remove());
  const item = {
    input: input.value,
    state: false,
    id: id++,
  };

  createItems(item);
  itemsArr?.forEach((e, index) => {
    createMarkUp(e, index);
  });

  input.value = '';
  editTodo();
  deleteTodo();
  const currItems = JSON.parse(localStorage.getItem('items'));
  totalTask.textContent = currItems?.length;
}
function addTask2() {
  let arr = JSON.parse(localStorage.getItem('items'));
  const input = document.querySelector('#input');
  const taskCon = document.querySelectorAll('.task-container');
  taskCon.forEach((e) => e.remove());
  arr?.forEach((e, index) => {
    createMarkUp(e, index);
  });

  const currItems = JSON.parse(localStorage.getItem('items'));
  currItems == null
    ? (totalTask.textContent = 0)
    : (totalTask.textContent = currItems.length);

  input.value = '';
  editTodo();

  const currItem = JSON.parse(localStorage.getItem('items'));

  totalTask.textContent = currItem?.length;

  const newArr = JSON.parse(localStorage.getItem('items'));
  const filteredArray = newArr?.filter((e) => e.state == true);
  const completedTask = filteredArray?.length;
  taskCompleted.textContent = completedTask;
}

function isChecked(e) {
  const checkBox = document.getElementsByClassName('checkbox');
  const data = e.closest('.task-container');
  const todo = data.querySelector('.todoList');
  Array.from(checkBox).forEach(() => {
    if (e.checked == true) {
      todo.style.textDecoration = '3px line-through red';
      data.style.opacity = '0.5';
    } else {
      todo.style.textDecoration = 'none';
      data.style.opacity = '1';
    }
  });

  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked == true) {
      const getted = JSON.parse(localStorage.getItem('items'));
      getted[i].state = true;
      itemsArr[i].state = true;
      localStorage.setItem('items', JSON.stringify(getted));
    } else {
      const getted = JSON.parse(localStorage.getItem('items'));
      getted[i].state = false;
      itemsArr[i].state = false;
      localStorage.setItem('items', JSON.stringify(getted));
    }
  }
  console.log('item arr : ', itemsArr);
  const newArr = JSON.parse(localStorage.getItem('items'));
  const filteredArray = newArr.filter((e) => e.state == true);
  const completedTask = filteredArray.length;
  taskCompleted.textContent = completedTask;
}

function deleteTodo() {
  let newItemArr = JSON.parse(localStorage.getItem('items'));
  const container = document.querySelector('.container');
  container.addEventListener('click', function (e) {
    if (!e.target.classList.contains('delete')) return;
    const numberClass = e.target.closest('.task-container').id;
    console.log(numberClass);
    const response = newItemArr?.splice(+numberClass, 1);
    localStorage.setItem('items', JSON.stringify(newItemArr));
    e.target.closest('.task-container').remove();
    const currItem = JSON.parse(localStorage.getItem('items'));
    totalTask.textContent = currItem?.length;
  });
}

function editTodo() {
  let newItemArr = JSON.parse(localStorage.getItem('items'));
  const taskContainer = document.querySelectorAll('.task-container');
  const container = document.querySelector('.container');
  container.addEventListener('click', function (e) {
    const numberClass = e.target.closest('.task-container')?.classList[1];
    const pTag = taskContainer[numberClass]?.querySelector('.todoList');
    if (!e.target.classList.contains('edit')) return;
    const target = e.target;
    pTag.setAttribute('contenteditable', true);
    pTag.style.color = 'FB2576';
    pTag.focus();
    pTag.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        pTag.setAttribute('contenteditable', false);
        pTag.style.color = 'white';
        let newItemArr = JSON.parse(localStorage.getItem('items'));
        console.log(newItemArr);
        newItemArr[numberClass].input = pTag.textContent;
        localStorage.setItem('items', JSON.stringify(newItemArr));
      }
    });
  });
}

const newGettedArray = itemsArr;
document.getElementById('input').addEventListener('change', addTask);
addEventListener('load', addTask2);
console.log(itemsArr);

function updateArr() {
  itemsArr = JSON.parse(localStorage.getItem('items'));
  localStorage.setItem('items', JSON.stringify(itemsArr));
}
