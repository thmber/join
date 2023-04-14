
let currentOpenTask;
let currentdraggableElement;
let stati = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let some = [];
let a = 0;
let AUDIO_MOVE = new Audio('assets/sound/splat.mp3');

function clearBoard() {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('awaitingFeedback').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
}

/**
 * displays the tasks overview on the board and the placeholder areas for dropping tasks
 */
function renderCompleteBoard() {
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        document.getElementById(`${element.status}`).innerHTML += showTasksOnBoardHTML(index, element);
        if (element.subtasks.length > 0) {
            document.getElementById(`progressField${index}`).innerHTML += renderProgressBar(index, element);
            getDoneSubtasks(index)
        }
        renderContactsOnBoard(index, element);
        renderBg(index, `categoryBgColor`);
        renderTheMovingPic(index);
    }
    renderPlaceholder();
}

/**
 * render the placeholder
 */
function renderPlaceholder() {
    stati.forEach(element => {
        generatePlaceholderBox(`${element}`);
    });
}
/**
 * clears the board and render the tasks on board
 */
function showTasksOnBoard() {
    clearBoard();
    renderCompleteBoard();
}

/**
 * renders the moving-icon on the tasks
 * @param {*} i the index of the activ task
 */
function showTheMovingBox(i) {
    document.getElementById(`box${i}`).innerHTML = `<div class="boxLayer" id="boxLayer${i}"></div>`;
    let links = getMovingLinks(i);
    renderMovingTo(i, links);

}

/**
 * 
 * @param {*} i the index of the active task
 * @returns  the array with the possible target for the status
 */
function getMovingLinks(i) {
    let whereToGo = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
    let position = whereToGo.indexOf(tasks[i].status);
    whereToGo.splice(position, 1);
    return whereToGo;
}

/**
 * renders the overlay for mobile change of the status
 * @param {*} i index of active task
 * @param {*} links array with possible targets for the status
 */
function renderMovingTo(i, links) {
    document.getElementById(`boxLayer${i}`).innerHTML += `<div>Move this task to:<div><div class="back" onclick="event.stopPropagation(); goBack()">&#x2715;</div>`;
    for (j = 0; j < links.length; j++) {
        let destination = links[j];
        document.getElementById(`boxLayer${i}`).innerHTML += `<div>
    <button class="boxLayerButton" onclick="event.stopPropagation(); moveTask(${i}, '${destination}')">${destination}</button></div>`
    }
}

/**
 * gives the task the new status, saves and render the board to show the new position
 * @param {*} i active task
 * @param {*} desti target for the task-status
 */
function moveTask(i, desti) {
    tasks[i].status = desti;
    console.log(tasks[i].status);
    showTasksOnBoard();
    saveTasks();
    AUDIO_MOVE.play();

}

function goBack() {
    showTasksOnBoard();
}

function renderTheMovingPic(i) {
    // let index = getTheRightTask(i);
    // console.log(i, index)
 document.getElementById(`box${i}`).innerHTML += `<img class="moveIt" id="moveIt${tasks[i].id}" onclick="event.stopPropagation();showTheMovingBox(${i})" src="assets/img/icons8-bewegen.png" alt=""></img>`;
}

// function renderBgCategory(index) {
//     let count = getTheRightBgColor(tasks[index].category);
//     let bgColor = categories[count].categoryColor;
//     document.getElementById(`categoryBgColor${index}`).style.backgroundColor = bgColor;
// }

// function renderBgCategoryShowTask(index) {
//     let count = getTheRightBgColor(tasks[index].category);
//     let bgColor = categories[count].categoryColor;
//     document.getElementById(`categoryBgColorShowTask${index}`).style.backgroundColor = bgColor;
// }

/**
 * 
 * @param {*} index the current task
 * @param {*} area the area which needs the right background-color
 */
function renderBg(index, area) {
    let count = getTheRightBgColor(tasks[index].category);
    let bgColor = categories[count].categoryColor;
    document.getElementById(`${area}${index}`).style.backgroundColor = bgColor;
}

/**
 * delays the rendering of the board until the JSON is available
 */
function delay() {
    setTimeout(function () {
        showTasksOnBoard();
    }, 300);
}

/**
 * some calculation for the progressbar
 * @param {*} i index of the current task
 */
function getDoneSubtasks(i) {
    let count = getTheRightBgColor(tasks[i].category);
    let bgColor = categories[count].categoryColor;
    let total = tasks[i].subtasks.length;
    let width = countTrue(i) / total * 100;
    document.getElementById(`bar${i}`).style.width = `${width}%`;
    document.getElementById(`bar${i}`).style.backgroundColor = bgColor;
}

/**
 * it counts the amount of the done subtasks
 * @param {*} i index of current task
 * @returns the amount of done subtasks
 */
function countTrue(i) {
    let element = tasks[i].subtasks;
    let count = element.filter(a => a.check == true);
    return count.length;
}


function renderContactsOnBoard(i, element) {
    document.getElementById(`assignToBoard${i}`).innerHTML = ``;
    let some = [];
    some = element.assignedTo
    let contactsLeft;
    let countIt = some.length
    if (some.length > 3) {
        contactsLeft = (some.length - 2);
        countIt = 2
    }
    renderNameCircles(i, countIt, some);
    if (contactsLeft > 0) document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle bgDark" >+${contactsLeft}</div>`;
}


function renderNameCircles(i, countIt, some) {
    for (let j = 0; j < countIt; j++) {
        const element = some[j];
        document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle bg${element.color}" >${element.initial}</div>`;
    }
}


function generatePlaceholderBox(status) {
    document.getElementById(status).innerHTML += `<div class="placeholder d-none" id="box-end-Column-${status}"></div>`;
}

/**
 * makes all placeholder seen for the user
 * @param {*} id current active Task
 */
function startDragging(id) {
    currentdraggableElement = getTheRightTask(id);
    let allPlaceholder = document.querySelectorAll('.placeholder');
    for (let i = 0; i < allPlaceholder.length; i++) {
        allPlaceholder[i].classList.remove('d-none');
        allPlaceholder[i].classList.add('showShort');
    }
}

/**
 * 
 * @param {*} stat gives the new tasks status and saves it
 */
function setStatus(stat) {
    tasks[currentdraggableElement].status = stat;
    saveTasks();
    showTasksOnBoard();
    AUDIO_MOVE.play();
}


function allowDrop(ev) {
    ev.preventDefault();
}

// function getTheAssignedContacts(objID) {
//     let searchFor = objID;
//     let whatINeed = contacts.findIndex(obj => obj.id == searchFor);
//     return whatINeed;
// }

function getTheRightTask(objID) {
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

function getTheRightBgColor(objID) {
    let searchFor = objID;
    let whatINeed = categories.findIndex(obj => obj.categoryName == searchFor);
    return whatINeed;
}


function freezeBackground() {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.scoll = "no";
}

function showTask(index) {
    freezeBackground();
    currentOpenTask = index;
    document.getElementById('makeBgDarker').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    let j = getTheRightTask(index);
    document.getElementById('overlayTask').classList.remove('d-none');
    let element = tasks[j];
    document.getElementById('overlayTask').innerHTML += showTaskHTML(index, element, j);
    showAssigned(element);
    getbgColor(j);
    renderBg(j, `categoryBgColorShowTask`);
}

function showEditTask(i) {
    showAddTaskOverlay();
    changeTheLook();
    createSaveButton(i);
   loadAllTheTaskContent(i);
}


function loadAllTheTaskContent(i){
    loadTheTaskContent(i);
    renderContactsAssignBoard(i);
    filterTheAssignedPeople(i);
    setToggleID(i);
    renderSubtasks(i);
    readPrio(i);
}

function changeTheLook() {
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('divider').classList.add('d-none');
    document.getElementById('mainAddTask').classList.remove('d-flex');
    document.getElementById('addTaskForm').classList.remove('containerTasks');
    document.getElementById('addTaskForm').classList.add('overlayEdit');
    document.getElementById('BTN-save').classList.remove('d-none');
    document.getElementById('BTN').style.display = "flex";
    document.getElementById('BTN').style.justifyContent = "end";
    document.getElementById('inputUnit').style.display = "none";
    document.getElementById('see').classList.add('d-none');
}

function createSaveButton(i) {
    document.getElementById('BTN').innerHTML = `<button class="btn" id="ok" onclick="saveExistingTask(${i})">Ok<img src=""></button>`;
}

function getbgColor(index) {
    if (tasks[index].priority == 'urgent') {
        changeColor('red');
    }
    else if (tasks[index].priority == 'medium') {
         changeColor('orange');
    }
    else if (tasks[index].priority == 'low') {
        changeColor('green');
    }
}


function changeColor(color){
    document.getElementById('prioPic').classList.add('invert');
    document.getElementById('priority').classList.add(color);
}


function closeTask() {
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('newTask').classList.add('d-none');
    document.getElementById('addTaskForm').classList.add('d-none');
    // document.getElementById('addTaskForm').innerHTML = ``;
    // document.getElementById('newTask').innerHTML = ``;
    showTasksOnBoard();
    currentOpenTask = -1;
    chosenContacts = [];
    loosenBackground();
}

function showAssigned(element) {
    for (let index = 0; index < element.assignedTo.length; index++) {
        let assigns = element.assignedTo[index];
        document.getElementById('assign').innerHTML += `<div class="row"><div class="bigNameCircle bg${assigns.color}">${assigns.initial}</div> <div>${assigns.name}</div></div>`;
    }
}


function loadTheTaskContent(i) {
    title.value = tasks[i].title;
    description.value = tasks[i].description;
    selectedCategory.textContent = tasks[i].category;
    document.getElementById('dueDate').value = tasks[i].duedate;
    prio = tasks[i].priority;
    subtasks = tasks[i].subtasks;
}


function saveExistingTask(i) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
        let task = {
        'id': i,
        'status': tasks[i].status,
        'title': title.value,
        'description': description.value,
        'duedate': dueDate.value,
        'priority': prio,
        'assignedTo': chosenContacts,
        'category': tasks[i].category,
        'subtasks': getExistingSubtasks(i)
    }
    tasks[i] = task;
    saveTasks();
    document.getElementById('addTaskForm').classList.add('d-none');
    showTask(i)
    clearInputFields(title, description, dueDate);
    currentOpenTask = -1;
    chosenContacts = [];
    
}


function clearInputFields(title, description, dueDate) {
    title.value = '';
    description.value = '';
    dueDate.value = getTodayDate();
    subtasks = [];


}
function getExistingSubtasks(i) {
    data = tasks[i].subtasks.length;
    if (data < subtasks_namen.length) data = subtasks_namen.length;
    new_subtasks = [];
    for (let index = 0; index < data; index++) {
        let subtask = {
            'subtaskName': document.getElementById(`input${index}`).value,
            'check': document.getElementById(`input${index}`).checked
        }
        new_subtasks.push(subtask);
    }
    return new_subtasks;
}


function showExistingSubtasks(i) {
    if (tasks[i].subtasks.length > 0) {

        tasks[i].subtasks.forEach((element, j) => {
            document.getElementById('displaySubtasks').innerHTML += `
  <div class="wrapper">
  <input type="checkbox" name="subtask" value="${element.subtaskName}" id="input${j}">
  <label for="subtask">${element.subtaskName}</label>
</div>`;
        });
    }
}

function readPrio(i) {
    if (tasks[i].priority == 'urgent') renderUrgentHTML();
    else if (tasks[i].priority == 'medium') renderMediumHTML();
    else if (tasks[i].priority == 'low') renderLowHTML();

}


function closeIt() {
    resetMissingText();
    document.location = "../board.html";
}


function closeOverlayAddTask() {
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('newTask').classList.add('d-none');
    resetMissingText();
    document.getElementById('newTask').innerHTML = ``;
    loosenBackground();
}


function setDarkLayer() {
    document.getElementById('makeBgDarker').classList.add('d-none');
}


function loosenBackground() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
}

function renderUrgentHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML +=
        ` <button onclick="selectButton(0)" class="buttonPrio red" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderMediumHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio orange" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderLowHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio green" id="low">Low<img id="piclow"
    src="assets/img/low.svg" style="filter:brightness(0) invert(1)"></button>`
}

function renderSubtasks(i) {
    document.getElementById('displaySubtasks').innerHTML = ``;
    let subs = tasks[i].subtasks;

    let ch = ``;
    for (let index = 0; index < subs.length; index++) {
        const element = subs[index];

        if (element.check) ch = 'checked';

        document.getElementById('displaySubtasks').innerHTML += `
      <div class="wrapper">
        <input id="input${index}" type="checkbox" name="subtask" value="${element.subtaskName}" ${ch} >
        <label for="subtask">${element.subtaskName}</label>
      </div>`;
        ch = '';
    }
}


function showAddTaskOverlay() {
    showDarkOverlay();
    document.getElementById('addTaskForm').classList.remove('d-none');
}


function showDarkOverlay() {
    document.getElementById('makeBgDarker').classList.remove('d-none');
}

function filterTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let regex = new RegExp(search);
    let content = document.getElementById('cols');
    let boxes = content.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) {
        let title = boxes[i].querySelector('.title').innerHTML;
        let description = boxes[i].querySelector('.description').innerHTML;

        if (regex.test(title.toLowerCase()) || regex.test(description.toLowerCase())) {
            boxes[i].style.display = 'flex';
        } else {
            boxes[i].style.display = 'none';
        }
    }
}


function testRenderNewTask() {
    freezeBackground();
    showDarkOverlay();
    document.getElementById('newTask').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    document.getElementById('newTask').innerHTML += testRenderNewTaskHTML();
    delayDate();
    renderTheContacts();
}


function filterTheAssignedPeople(i) {
    document.getElementById(`showAssignedPeople`).innerHTML = ``;
    some = [];
    some = tasks[i].assignedTo;
    console.log(some);

    for (let j = 0; j < tasks[i].assignedTo.length; j++) {

        document.getElementById(`showAssignedPeople`).innerHTML += `<div class="bigNameCircle bg${tasks[i].assignedTo[j].color}" >${tasks[i].assignedTo[j].initial}</div>`;
    }
    chosenContacts = tasks[i].assignedTo;
}

function deleteTask(i){
    tasks.splice(i,1);
    closeTask();
       saveTasks();
    console.log(tasks);
}