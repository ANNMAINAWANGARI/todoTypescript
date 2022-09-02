/**delete tasks function*/
const deleteTasks = (taskid) => {
    let todos = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    todos.map((todo, index) => {
        //todos.splice(index,1)
        if (taskid === index) {
            todos.splice(index, 1);
        }
        localStorage.setItem("allTasks", JSON.stringify(todos));
        window.location.reload();
    });
};
/**delete tasks function */
const setCompletedState = () => {
    let todos = Array.from(JSON.parse(localStorage.getItem("allTasks") || '{}'));
    todos.map((todo, index) => {
        todos[index].completed = !todo.completed;
        console.log('yeesss changed');
        localStorage.setItem("allTasks", JSON.stringify(todos));
        window.location.reload();
    });
};
export const displayData = (data) => {
    let contentBottom = document.querySelector('.content-bottom');
    if (contentBottom.hasChildNodes()) {
        contentBottom.replaceChildren();
    }
    data.map((task, index) => {
        const div = document.createElement("div");
        div.className = 'task';
        div.innerHTML = `<input type="checkbox" class="checkbox" />
        <div class="task-content">
                    <div class="task-content-top" id='deleteTask'>
                        <div>
                            <h2 style="margin-bottom:10px">${task.title}</h2>
                            <h5 class="h5">${task.description}.</h5>
                            <h6 class="h6">Due date is: ${task.deadline}.</h6>
                        </div>
                        <div style="display:flex">
                         <button class="edit">Edit</button>
                         <button class="delete" onClick="deleteTasks(${index})">Delete</button>
                    </div>
                    </div>
                    <div class="task-content-bottom"></div>
                </div>`;
        return contentBottom.appendChild(div);
    });
};
