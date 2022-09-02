import { displayData } from './helpers/display.js';
const titleInput = document.querySelector('.title');
const descriptionInput = document.querySelector('.description');
const deadlineInput = document.querySelector('.date');
const form = document.querySelector("form");
const completedButton = document.querySelector(".completed");
const incompleteButton = document.querySelector(".incomplete");
//let checkbox= document.querySelector(".checkbox") as HTMLInputElement;
window.onload = () => {
    let tasks = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    displayData(tasks);
    const checkbox = document.querySelector(".checkbox");
    checkbox.addEventListener("click", () => setCompletedState());
};
/**base class start */
class CompletedTasks {
    constructor(t, d, dd) {
        this.tasksArray = [];
        this.completed = false;
        this.title = t;
        this.description = d;
        this.deadline = dd;
        //this.completed =;
    }
    toggleCompleted() {
        this.completed = !this.completed;
    }
    ;
    edit() { }
    ;
    add(inputTask) {
        this.tasksArray.push(inputTask);
        this.tasksArray.map((singleTaskObject) => localStorage.setItem("allTasks", JSON.stringify([...JSON.parse(localStorage.getItem("allTasks") || "[]"), { title: singleTaskObject.title, completed: singleTaskObject.completed, description: singleTaskObject.description, deadline: singleTaskObject.deadline, createdAt: new Date() }])));
        console.log(inputTask);
    }
    ;
}
/**base class end */
/**inherited class start */
class IncompleteTasks extends CompletedTasks {
    constructor(title, description, deadline) {
        super(title, description, deadline);
    }
}
/**inherited class end*/
/**function to add task  to localstorage */
const addTodo = () => {
    let todo = new IncompleteTasks(titleInput.value, descriptionInput.value, deadlineInput.value);
    todo.add(todo);
};
/**function to add task  to localstorage */
/**function that listens for submit event before adding input values to localstorage then displaying them on UI */
form.addEventListener("submit", e => {
    e.preventDefault();
    addTodo();
    let fetchedTasks = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    displayData(fetchedTasks);
});
/**function that listens for submit event before adding input values to localstorage then displaying them on UI */
/*filter complete tasks start*/
completedButton.addEventListener('click', () => filteredCompletedTasks());
const filteredCompletedTasks = () => {
    let tasks = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    let completedTasks = tasks.filter(task => task.completed === true);
    displayData(completedTasks);
};
/*filter complete tasks end*/
/*filter incomplete tasks start*/
incompleteButton.addEventListener('click', () => filteredIncompleteTasks());
const filteredIncompleteTasks = () => {
    let tasks = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    let inCompleteTasks = tasks.filter(task => task.completed === false);
    displayData(inCompleteTasks);
    console.log('inCompleteTasks', inCompleteTasks);
};
/*filter incomplete tasks end*/
//const checkbox = document.querySelector(".checkbox") as HTMLInputElement;
//checkbox.addEventListener("click",()=>setCompletedState());
const setCompletedState = () => {
    let todos = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    todos.map((todo, index) => {
        todos[index].completed = !todo.completed;
        console.log(todos[index].completed);
        todo.completed = !todo.completed;
    });
    localStorage.setItem("allTasks", JSON.stringify(todos));
    //window.location.reload()
};
