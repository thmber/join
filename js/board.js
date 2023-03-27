
let currentdraggableElement;
let stati = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let a = 0;

function clearBoard() {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('awaitingFeedback').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
}


function renderAll() {
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        document.getElementById(`${element.status}`).innerHTML += showTasksOnBoardHTML(index, element);
        getProgressBarWidth(index);
        getFirstCharacterOfNames(index);
    }
    renderPlaceholder();
}

function renderPlaceholder() {
    stati.forEach(element => {
        generatePlaceholderBox(`${element}`);
    });
}


function showTasksOnBoard() {
    clearBoard();
    renderAll();
}

function showTasksOnBoardHTML(index, element) {
    return `
    <div class="box"  onclick="showTask(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
        <div class="category ${element.category}">${element.category}</div>
        <div class="title">${element.title}</div>
        <div class="description">${element.description}</div>

    <div class="oneRow">
        <div class="container">
           <div class="progress">
                <div id="bar${index}" class="bar ${element.category}"></div>
           </div>
        </div>
        <div class="howMuch">${countTrue(index)}/${element.subtasks.length} done</div>
    </div>

    <div class="oneRow">
        <div id="assignTo${index}" class="assignTo"></div>
        <img src="assets/img/${element.priority}.svg">
</div>` ;
}


function delay() {
    setTimeout(function () {
        showTasksOnBoard();
    }, 300);
}

// function changeStatus(i){
// tasks[i].status = `inProgress`;
// showTasksOnBoard();
// }

function getProgressBarWidth(i) {
    let numberDone = 0;
    for (let index = 0; index < tasks[i].checkBxSub.length; index++) {
        const element = tasks[i].checkBxSub[index];
        if (element) numberDone++;
    }
    getDoneSubtasks(i, numberDone);
}


function getDoneSubtasks(i, numberDone) {
    let total = tasks[i].checkBxSub.length;
    let width = numberDone / total * 100;
    document.getElementById(`bar${i}`).style.width = `${width}%`;
}


function countTrue(i) {
    let element = tasks[i].checkBxSub;
    let count = element.filter(x => x == true).length;
    return count;
}


function getFirstCharacterOfNames(i) {
    let acronym = [];
    for (let index = 0; index < tasks[i].assignedTo.length; index++) {
        let fullname = tasks[i].assignedTo[index];
        acronym.push(fullname.split(/\s/).reduce((response, word) => response += word.slice(0, 1), ''));
    }
    renderAcronym(i, acronym);
}


function renderAcronym(i, acronym) {
    for (let index = 0; index < acronym.length; index++) {
        const element = acronym[index];
        document.getElementById(`assignTo${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${contacts[index].contactColor}">${element}</div>`;
    }
}


function generatePlaceholderBox(status) {
    document.getElementById(status).innerHTML += `<div class="placeholder d-none" id="box-end-Column-${status}"></div>`;
}

function startDragging(id) {
    currentdraggableElement = id;
    let allPlaceholder = document.querySelectorAll('.placeholder');
    for (let i = 0; i < allPlaceholder.length; i++) {
        allPlaceholder[i].classList.remove('d-none');
        allPlaceholder[i].classList.add('showShort');
    }
}


function setStatus(stat) {
    tasks[currentdraggableElement].status = stat;
    saveTasks();
    showTasksOnBoard();
}


function allowDrop(ev) {
    ev.preventDefault();
}


function getTheRightTask(objID) {
    // let index = -1;
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

function showTask(index) {
    document.getElementById('overlayTask').innerHTML = ``;
    let j = getTheRightTask(index);
    document.getElementById('overlayTask').classList.remove('d-none');
    let element = tasks[j];
    document.getElementById('overlayTask').innerHTML += `
<div class="fullUseOfSpace">
    <div class="fullUseOfSpaceTop">
            <div class="overlayOneRow">
                <div class="overlayCategory ${element.category}">${element.category}</div>
                <div id="closeTask" onclick="closeTask()">X</div>
            </div>
            <div class="overlayTitle">${element.title}</div>
            <div class="overlayDescription">${element.description}</div>
            <div class="overlayContent"><b>Due Date:</b> ${element.duedate}</div>
            <div class="overlayContent"><b>Priority:</b>  ${element.priority}<img src="assets/img/${element.priority}.svg"></div>
        
            <div id="assignTo${index}" class="assignTo"><b> Assigned To:</b></div>
            <div id="assign"></div>
    </div>
        <div class="fullUseOfSpaceBottom">
            <div id="edit${j}" class="edit">button</div>
        </div>
</div>`;
showAssigned(element);
}

function closeTask(){
    document.getElementById('overlayTask').classList.add('d-none');
}

function showAssigned(element){
    console.log(element.assignedTo);
for (let index = 0; index < element.assignedTo.length; index++) {
    
    let people = element.assignedTo[index];
       document.getElementById('assign').innerHTML += `<div>${people}</div>`;
}
}