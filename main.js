const mainInput = document.getElementById('main-input');
const todosWrapper = document.querySelector('.tasks');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

const zeroPad = (num, places) => String(num).padStart(places, '0');

function Task(description) {
    this.description = description;
    this.completed = false;
    this.datetime = `${setDate()}`;
}

function setDate() {
    var dateObj = new Date();
    // return dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
    return dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' + zeroPad(dateObj.getMinutes(), 2);
}

const createTemplate = (task, index) => {
    // return `
    //         <div class="task ${task.completed ? 'checked' : ''}">
    //             <input type="checkbox" onclick="completeTask(${index})" id="input-checkbox" ${task.completed ? 'checked' : ''}>
    //             <textarea name="" id="area-title" data-id="" readonly>
    //                 ${task.description}
    //             </textarea>
    //             <div class="buttons">
    //                 <span onclick="editTask(${index})" class="edit-button">Edit</span>
    //                 <span onclick="deleteTask(${index})" class="delete-button">Delete</span>
    //             </div>
    //         </div>
    // `;
    return `
                <div class="task ${task.completed ? 'checked' : ''}">
                    <input type="checkbox" onclick="completeTask(${index})" id="input-checkbox" ${task.completed ? 'checked' : ''}>
                    <div class="text-and-date">
                        <textarea name="" id="area-title" data-id="" readonly>
                            ${task.description}
                        </textarea>
                        <span id="date">${task.datetime}</span>
                    </div>
                    <div class="buttons">
                        <span onclick="editTask(${index})" class="edit-button">Edit</span>
                        <span onclick="deleteTask(${index})" class="delete-button">Delete</span>
                    </div>
                </div>
        `;
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks]
}

const fillHtmlList = () => {
    console.log('todosWrapper', todosWrapper.innerHTML)
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.task');
    }
}

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

mainInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        if (mainInput.value.length === 0) return;
        tasks.push(new Task(mainInput.value));
        updateLocal();
        fillHtmlList();
        mainInput.value = '';
    }
})
var completeFlag = false;

const completeTask = index => {

    tasks[index].completed = !tasks[index].completed
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
        completeFlag = true;
    } else {
        todoItemElems[index].classList.remove('checked');
        completeFlag = false;
    }
    updateLocal();
    fillHtmlList();
}

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)
}

const editTask = index => {
    if (tasks[index].completed == true) return;

    if (todoItemElems[index].children[1].children[0].classList.contains('editing')) {
        todoItemElems[index].children[1].children[0].readOnly = true;
        todoItemElems[index].children[1].children[0].classList.remove('editing');
        todoItemElems[index].children[2].children[0].innerText = 'Edit';
        todoItemElems[index].children[2].children[0].style.color = '#979CA6';
        tasks[index].description = todoItemElems[index].children[1].children[0].value; // ???????????
        updateLocal();
        fillHtmlList();
    } else {
        todoItemElems[index].children[2].children[0].style.color = 'rgb(118, 192, 100)';
        todoItemElems[index].children[2].children[0].innerText = 'Save';
        todoItemElems[index].children[1].children[0].readOnly = false;
        todoItemElems[index].children[1].children[0].classList.add('editing');
        todoItemElems[index].children[1].children[0].focus();
    }


}

fillHtmlList();




// const mainInput = document.getElementById('main-input');
// const todosWrapper = document.querySelector('.tasks');

// let tasks;

// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

// let todoItemElems = [];

// function Task(description) {
//     this.description = description;
//     this.completed = false;
// }

// const createTemplate = (task, index) => {
//     return `
//             <div class="task ${task.completed ? 'checked' : ''}">
//                 <input type="checkbox" onclick="completeTask(${index})" id="input-checkbox" ${task.completed ? 'checked' : ''}>
//                 <!-- <input type="text"  value="" readonly> -->
//                 <textarea name="" id="area-title" data-id="" readonly>
//                     ${task.description}
//                 </textarea>
//                 <div class="buttons">
//                     <span onclick="editTask(${index})" class="edit-button">Edit</span>
//                     <span onclick="deleteTask(${index})" class="delete-button">Delete</span>
//                 </div>
//             </div>
//     `;
// }

// const filterTasks = () => {
//     const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
//     const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
//     tasks = [...activeTasks, ...completedTasks]
// }

// const fillHtmlList = () => {
//     todosWrapper.innerHTML = "";
//     if (tasks.length > 0) {
//         filterTasks();
//         tasks.forEach((item, index) => {
//             todosWrapper.innerHTML += createTemplate(item, index);
//         });
//         todoItemElems = document.querySelectorAll('.task');
//     }
// }

// fillHtmlList();

// const updateLocal = () => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// const completeTask = index => {

//     tasks[index].completed = !tasks[index].completed
//     if (tasks[index].completed) {
//         todoItemElems[index].classList.add('checked');
//     } else {
//         todoItemElems[index].classList.remove('checked');
//     }
//     updateLocal();
//     fillHtmlList();
// }

// mainInput.addEventListener('keypress', e => {
//     if (e.key === 'Enter') {
//         if (mainInput.value.length === 0) return;
//         tasks.push(new Task(mainInput.value));
//         updateLocal();
//         fillHtmlList();
//         mainInput.value = '';
//     }
// })

// const deleteTask = index => {
//     todoItemElems[index].classList.add('delition');
//     setTimeout(() => {
//         tasks.splice(index, 1);
//         updateLocal();
//         fillHtmlList();
//     }, 500)
// }

// const editTask = index => {
//     console.log(todoItemElems[index].children[2].children[0]);
//     if (todoItemElems[index].children[1].classList.contains('editing')) {
//         todoItemElems[index].children[1].readOnly = true;
//         todoItemElems[index].children[1].classList.remove('editing');
//         todoItemElems[index].children[2].children[0].style.color = '#979CA6';
//     } else {
//         todoItemElems[index].children[1].readOnly = false;
//         todoItemElems[index].children[2].children[0].style.color = 'rgb(118, 192, 100)';
//         todoItemElems[index].children[1].classList.add('editing');
//         todoItemElems[index].children[1].focus();
//     }
// }