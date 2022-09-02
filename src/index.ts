import {ITask} from './interfaces/todoInterface';
import {displayData}  from './helpers/display.js';
const titleInput  = document.querySelector('.title') as HTMLInputElement;
const descriptionInput = document.querySelector('.description') as HTMLInputElement;
const deadlineInput = document.querySelector('.date') as HTMLInputElement;
const form=document.querySelector("form") as HTMLFormElement;
const completedButton = document.querySelector(".completed") as HTMLButtonElement;
const incompleteButton = document.querySelector(".incomplete") as HTMLButtonElement;
//let checkbox= document.querySelector(".checkbox") as HTMLInputElement;

window.onload = ()=>{
  let tasks:ITask[] = Array.from(JSON.parse(localStorage.getItem("allTasks")|| '{}'));
  
  displayData(tasks);
  const checkbox= document.querySelector(".checkbox") as HTMLInputElement;
  checkbox.addEventListener("click",()=>setCompletedState());
};

/**base class start */
class CompletedTasks implements ITask{
  private tasksArray:ITask[]=[];
    title:string;
    description:string;
    deadline:string;
    completed = false
    constructor(t:string,d:string,dd:string){
      this.title = t;
      this.description = d;
      this.deadline = dd;
      //this.completed =;
    }
    toggleCompleted(){
      this.completed = !this.completed;
    };
    edit(){}; 
    
    add(inputTask:ITask){
      this.tasksArray.push(inputTask);
      this.tasksArray.map((singleTaskObject)=>
      localStorage.setItem("allTasks", JSON.stringify([...JSON.parse(localStorage.getItem("allTasks") || "[]"), { title: singleTaskObject.title, completed: singleTaskObject.completed,description: singleTaskObject.description,deadline:singleTaskObject.deadline,createdAt:new Date(),indexPosition:this.tasksArray.indexOf(singleTaskObject) }]))
      )
      
      console.log(inputTask);
    };
    }
/**base class end */
/**inherited class start */
class IncompleteTasks extends CompletedTasks implements ITask{
  constructor(title:string,description:string,deadline:string){
   super(title,description,deadline);
  }
  /*toggleCompleted(): void {
    this.completed = !this.completed;
  }*/
}
/**inherited class end*/
/**function to add task  to localstorage */
const addTodo = ()=>{
  let todo = new IncompleteTasks(titleInput.value,descriptionInput.value,deadlineInput.value);
  todo.add(todo)
}
/**function to add task  to localstorage */
/**function that listens for submit event before adding input values to localstorage then displaying them on UI */
form.addEventListener("submit", e => {
  e.preventDefault();
  addTodo();
  let fetchedTasks:ITask[] = Array.from(JSON.parse(localStorage.getItem("allTasks")|| '{}'));
  
 displayData(fetchedTasks);
});
/**function that listens for submit event before adding input values to localstorage then displaying them on UI */

/*filter complete tasks start*/
completedButton.addEventListener('click',()=>
  filteredCompletedTasks()
)
const filteredCompletedTasks = ()=>{
  
  let tasks:ITask[] = Array.from(JSON.parse(localStorage.getItem("allTasks")|| '{}'));
      let completedTasks:ITask[] = tasks.filter(task=> 
          task.completed===true
      );
      displayData(completedTasks);
}
/*filter complete tasks end*/
/*filter incomplete tasks start*/
incompleteButton.addEventListener('click',()=>
  filteredIncompleteTasks()
)
const filteredIncompleteTasks = ()=>{
  let tasks:ITask[] = Array.from(JSON.parse(localStorage.getItem("allTasks")|| '{}'));
  let inCompleteTasks:ITask[] = tasks.filter(task=> 
      task.completed===false
  );
  displayData(inCompleteTasks);
   console.log('inCompleteTasks',inCompleteTasks);
}
/*filter incomplete tasks end*/
//const checkbox = document.querySelector(".checkbox") as HTMLInputElement;
//checkbox.addEventListener("click",()=>setCompletedState());
const setCompletedState = ()=>{
  let todos:ITask[] = Array.from(JSON.parse(localStorage.getItem("allTasks")|| '{}'));
  todos.map((todo,index)=>{
      if(todos.indexPosition ==index){
        todos[index].completed = !todo.completed;
      
          todo.completed = !todo.completed;
      }
      
      })
      localStorage.setItem("allTasks",JSON.stringify(todos));
      //window.location.reload()
  }
  
