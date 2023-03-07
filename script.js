const mainTaskContainer = document.querySelector('.main-task-cointainer');

const taskCompleted = document.querySelector('#task-completed');
const totalTask = document.querySelector('#total-task');

const itemsArr = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

 
  

function createItems(item) {
 itemsArr.push(item);
  localStorage.setItem('items', JSON.stringify(itemsArr));
}

function addTask() {
  const input = document.querySelector('#input');
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

  const currItems = JSON.parse(localStorage.getItem('items'));
  totalTask.textContent = currItems.length;

  input.value = '';
  
}
function addTask2() {
  const input = document.querySelector('#input');
  const taskCon = document.querySelectorAll('.task-container');
  taskCon.forEach((e) => e.remove());
  itemsArr.forEach((e, index) => {
    createMarkUp(e, index);
  });

  const currItems = JSON.parse(localStorage.getItem('items'));
  currItems == null ? totalTask.textContent=0: totalTask.textContent = currItems.length;
  
  
  input.value = '';
}

function createMarkUp(e, index) {
  
  const markUp = ` 
    <div class="task-container" id="task-container">
         <input type="checkbox" class="checkbox" ${e.state == true ? 'checked style="text-decoration:line-through; opacity:0.5; "' : ""}  onclick="isChecked(this)"/>

           <p class="todoList  ${index}" >${e.input}</p>
           <div class="inner-div">
             <span class="edit">EDIT</span>
           <span class="delete"  onclick="deleteTodo(this)">DELETE</span>
         </div>

         </div>`;

  mainTaskContainer.insertAdjacentHTML('beforebegin', markUp);
  
  

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

 for(let i=0;i<checkBox.length;i++){
  if(checkBox[i].checked == true){
    const getted = JSON.parse(localStorage.getItem('items'));
           getted[i].state = true;
           localStorage.setItem('items', JSON.stringify(getted));
  }
  else{
    const getted = JSON.parse(localStorage.getItem('items'));
         getted[i].state = false;
    
         localStorage.setItem('items', JSON.stringify(getted));
  }
}
const newArr = JSON.parse(localStorage.getItem('items'))
const filteredArray =  newArr.filter((e)=>e.state==true);
const completedTask = filteredArray.length;
taskCompleted.textContent = completedTask;

}






input.addEventListener('change', addTask);
addEventListener('load', addTask2);
