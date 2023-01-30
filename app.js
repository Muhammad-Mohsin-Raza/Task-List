// // Define UI Vars
// const form = document.querySelector('#task-form');
// const taskList = document.querySelector('.collection');
// const clearBtn = document.querySelector('.clear-tasks');
// const filter = document.querySelector('#filter');
// const taskInput = document.querySelector('#task');

// // Load all event listeners
// loadEventListeners();

// // Load all event listeners
// function loadEventListeners() {
//   // Add task event
//   form.addEventListener('submit', addTask);
// }

// // Add Task
// function addTask(e) {
//   if(taskInput.value === '') {
//     alert('Add a task');
//   }

//   // Create li element
//   const li = document.createElement('li');
//   // Add class
//   li.className = 'collection-item';
//   // Create text node and append to li
//   li.appendChild(document.createTextNode(taskInput.value));
//   // Create new link element
//   const link = document.createElement('a');
//   // Add class
//   link.className = 'delete-item secondary-content';
//   // Add icon html
//   link.innerHTML = '<i class="fa fa-remove"></i>';
//   // Append the link to li
//   li.appendChild(link);

//   // Append li to ul
//   taskList.appendChild(li);

//   // Clear input
//   taskInput.value = '';

//   e.preventDefault();
// }



// Vars

const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task')
const btn = document.querySelector('#task-form');
const taskList = document.querySelector('.collection')
const filter = document.querySelector('#filter')

EventInit();

function EventInit() {
    // Subit Event Listner
    btn.addEventListener('submit', handler);
    // Remove Event Litener
    taskList.addEventListener('click', removeTask)
    // Clear All tasks Event Listener
    clearBtn.addEventListener('click', clearTasks)
    //  Filter Event Listner
    filter.addEventListener('keyup', Filter)

    fetchData()
}


function handler(e) {
    if (taskInput.value === '') {
        alert('Please Add Something...')
    }
    
    //  Create Element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Add text
    li.appendChild(document.createTextNode(taskInput.value))
    
    // Create Delete Node 
    const node = document.createElement('a')
    node.className = 'delete-item secondary-content'
    node.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(node)
    taskList.appendChild(li)
    


    

    //  Stores in Local Storage
    
    storeTaskInLocalStorage(taskInput.value)
    taskInput.value = ''

    e.preventDefault();
}


//  Fetch data and add to task list 
function fetchData(){
    let array
    if (localStorage.getItem('tasks')===null){
        array=[]
    }
    else{
        array=JSON.parse(localStorage.getItem('tasks'))
    }

    array.forEach(function(item){
        // console.log(item)
        //  Create Element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Add text
    li.appendChild(document.createTextNode(item))  
    
    // Create Delete Node 
    const node = document.createElement('a')
    node.className = 'delete-item secondary-content'
    node.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(node)
    taskList.appendChild(li)

    })

}

//  Stores Task List in local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove()
        // Also Remove it from Local Storage So call function
        removeFromLocalStorage(e.target.parentElement.parentElement)
    }
}

//  Remove Clicked Task List Item From Local Storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(Item,index){
        if (taskItem.textContent === Item){
            tasks.splice(index,1)
        }
    })
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
}


function clearTasks(e) {
    taskList.innerHTML = ''

    //  Also remove From Local Storage
    removeAllTasks();
}

// Remove All Tasks From Local Storage
function removeAllTasks(){
    localStorage.clear()
}


// Filter Task Lists According To input
function Filter(e) {
    const text = e.target.value.toLowerCase()
    
    document.querySelectorAll('.collection-item').forEach(
        function(task) {

        const item=task.firstChild.textContent
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block'
        }
        else{
            task.style.display='none'
        }
        console.log(item)
        console.log(item.toLowerCase().indexOf(text))
    })
    
}

