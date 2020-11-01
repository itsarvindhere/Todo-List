//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Functions

//Creating a ToDo Div

const createToDoDiv = (value) => {
    // We want this pattern for each ToDo List Item -
    /*
    <div class="todo"> 
    <li class="todo-item"> Hey! </li>
    <button> <i class="fas fa-check"> </i> </button>
    <button> <i class="fas fa-trash"> </i> </button>
    </div>
    */

    const todoDiv = document.createElement('div');

    //Add a class to it 

    todoDiv.classList.add('todo');

    //Create a List Element

    const newTodo =  document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = value;

    todoDiv.appendChild(newTodo);


    //Add ToDo to the Local Storage
    if(value === todoInput.value) {
        saveToLocalStorage(value);
    }
    

    //CHECK BUTTON

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');

    todoDiv.appendChild(completedButton);

    //DELETE BUTTON

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    todoDiv.appendChild(trashButton);


    //Append this ToDo Div to the List

    todoList.appendChild(todoDiv);
}

//Adding a ToDo

const addTodo = (e) => {
    e.preventDefault();
    
    createToDoDiv(todoInput.value);

    //Clear the ToDo Input Value

    todoInput.value = '';
    

}

//Deleting a ToDo
const deleteCheck = (e) => {
    const item = e.target;

    //Delete the Todo

    if(item.classList[0] === 'trash-btn'){
        const todoToRemove = item.parentElement;
        //Animation
        todoToRemove.classList.add('fall');
        removeFromLocalStorage(todoToRemove);
        //Only when above animation ends, rempve the todo
        todoToRemove.addEventListener('transitionend', () => {
            todoToRemove.remove();
        })
    };
}

//Marking a ToDo as Completed
const completeCheck = (e) => {
    const item = e.target;

    //Delete the Todo

    if(item.classList[0] === 'complete-btn'){
        // item.parentElement.firstElementChild.style.textDecoration = 'line-through';
        
        const todo = item.parentElement;

        todo.classList.toggle('completed');
        };
}

//Filtering the ToDos from the List
const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
                
        }
    })
}

//Save the Todos to the Local Storage

const saveToLocalStorage = (todo) => {
    //Check if we already have the Todos in LocalStorage
    let todos;
    
    if(localStorage.getItem('todos') == null) {
        //If there are no todos already, then start with an empty array
        todos = [];
   } else {
       //We already have some Todos so we get them & parse the JSON  
       todos = JSON.parse(localStorage.getItem('todos'));
   }


   //Add our new ToDo to the Array
   todos.push(todo);

   //Push the whole Array back to the localStorage

   localStorage.setItem('todos', JSON.stringify(todos));
}

const removeFromLocalStorage = (todo) => {
    //Check if we already have the Todos in LocalStorage
    let todos;
    
    if(localStorage.getItem('todos') == null) {
        //If there are no todos already, then start with an empty array
        todos = [];
   } else {
       //We already have some Todos so we get them & parse the JSON  
       todos = JSON.parse(localStorage.getItem('todos'));
   }
   const textOfTodoToRemove = todo.children[0].innerText; //e.g 'Apple'

   //splice(index from which you want to start removing, how many to remove from that index)
   todos.splice(todos.indexOf(textOfTodoToRemove),1); //We only wanna remove one ToDo
   
   localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos = () => {
    //Check if we already have the Todos in LocalStorage
    let todos;
    
    if(localStorage.getItem('todos') == null) {
        //If there are no todos already, then start with an empty array
        todos = [];
   } else {
       //We already have some Todos so we get them & parse the JSON  
       todos = JSON.parse(localStorage.getItem('todos'));
   }

   todos.forEach((todo) => {
       createToDoDiv(todo);
   })
}


//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', completeCheck);
filterOption.addEventListener('click', filterTodo);
