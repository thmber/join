

let tasks = [];
let prio;
let subtasks = [];
let checkBxSub = [];
let checkBox = [];
let taskID = 0;
let categories = [];
let colors = ['#f99090', '#ff1717', '#fac66e', '#845400', '#b6fa81', '#07ab1d', '#81adfd', '#0048cd', '#ffb0f7', '#f500dc', ''];
let colorspot;
let priorities = [{
  prio: 'urgent',
  color: 'red'
},
  {
    prio: 'medium',
    color: 'orange'
 },
  {
    prio: 'low',
    color: 'green'
}];

function addTask() {

  let assignedTo = getAssignetToUser();
  let title = document.getElementById('title');

  let description = document.getElementById('description');
  let category = document.getElementById('selectedCategory');
  let duedate = document.getElementById('dueDate');
  let autoID;
  if (tasks.length > 0) {
    autoID = tasks.length
  }
  else autoID = 0;

  let task = {
    'id': autoID,
    'status': 'todo',
    'title': title.value,
    'description': description.value,
    'duedate': duedate.value,
    'priority': prio,
    'assignedTo': assignedTo,
    'category': category.textContent,
    'subtasks': subtasks,
    'checkBxSub': checkCheckedBoxes()
  }



  tasks.push(task);

  save();
  console.log(tasks);

  let minimum = document.getElementById("dueDate").min;
}

function saveTasks() {
  backend.setItem('tasks', JSON.stringify(tasks));
}

function checkCheckedBoxes() {
  let checkBxSub = document.querySelectorAll("input[name='subtask']");
  for (let index = 0; index < checkBxSub.length; index++) {
    const element = checkBxSub[index];
    checkBox.push(element.checked);

  }
  return checkBox;
}

function toggleOptions() {
  document.getElementById('seeCat').classList.toggle('d-none');
}

function getAssignetToUser() {


  let checkboxes = document.querySelectorAll('input[name="assignedTo"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;

}

function addPrio(id) {
  prio = id;
  console.log(prio);

}

function selectCategory(param) {
  console.log(param);
  let category = document.getElementById(`${param}`).textContent;
  document.getElementById('selectedCategory').innerHTML = `<div class="inlineDuo"><span>${category}</span><span class="circle" style="background-color: ${categories[param].categoryColor};"></span></div>`;
  document.getElementById('seeCat').classList.add('d-none');
}


function toggleOptionsAss() {
  document.getElementById('see').classList.toggle('d-none');
}


function selectAssignTo(param) {
  let category = document.getElementById(`${param}`).textContent;
  document.getElementById('selected').innerHTML = category;
  document.getElementById('see').classList.add('d-none');
}

function addAssignPeople(param) {
  let name = document.getElementById(param).textContent;
  let beginners = name.match(/\b\w/g).join('')
  console.log('Name', name, ' beginnt mit: ', beginners);
  document.getElementById('showAssignedPeople').innerHTML += `<div class="bigNameCircle">${beginners}</div>`
}



function addSubtask() {
  let subtaskField = document.getElementById('subtask');
  let subtask = subtaskField.value;
  subtasks.push(subtask);
  subtaskField.value = ``;
  showSubtasks(subtasks);
}

function showSubtasks(subtasks) {
  document.getElementById('displaySubtasks').innerHTML = ``;
  console.log(subtasks);
  subtasks.forEach(element => {
    document.getElementById('displaySubtasks').innerHTML += `
    <div class="wrapper">
      <input type="checkbox" name="subtask" value="${element}">
      <label for="subtask">${element}</label>
    </div>`;
  });

}
function renderAddTasks() {
  let soonestDueDate = getTodayDate();
  document.getElementById('mainAddTask').innerHTML = ``;
  document.getElementById('mainAddTask').innerHTML = renderAddTasksHTML(soonestDueDate);
  delayRenderAssignTo();
  delayRenderCategories();

}

function renderAddTasksHTML(soonestDueDate) {
  return `
  
  <div class="containerAddTaskLeftSide">
      <div class="inputUnit">
          <label for="name">Name</label>
          <input id="title" class="input" type="text" placeholder="Enter a title">
      </div>
      <div class="inputUnit">
          <label for="description">Description</label>
          <textarea id="description" class="inputDescription" type="textarea"
              placeholder="Enter a Description"></textarea>
      </div>
      <div class="inputUnit" id="inputUnit">
          <label>Category</label>
          <div class="inputArea" id="newCateg">
              <div id="selectedCategory">Select a Category</div>
              <img src="assets/img/openMenuIcon.svg" onclick="toggleOptions()" alt="">
          </div>
          <div id="seeCat" class="d-none">
              <div class="options" id="optionsCat">
                  
              </div>
          </div>
      </div>


      <div class="inputUnit">
          <label>Assigned to</label>
          <div class="inputArea">
              <div id="selected">Assigned to</div>
              <img src="assets/img/openMenuIcon.svg" onclick="toggleOptionsAss()" alt="">
          </div>
          <div id="see" class="d-none">
              <div class="options" id="optionsUser"></div>
          </div>

      </div>
      <div id="showAssignedPeople"></div>





  </div>
  <div class="containerAddTaskRightSide">
      <div class="inputUnit">
          <label for="dueDate">Due Date</label>
          <input id="dueDate" class="input" type="date" required min="${getTodayDate()}" value="${getTodayDate()}">
      </div>
      <div class="inputUnit">
          <label for="prio">Prio</label>
          <div class="prioButtons">
              <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
                      src="assets/img/urgent.svg"></button>
              <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
                      src="assets/img/medium.svg"></button>
              <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
                      src="assets/img/low.svg"></button>
          </div>
      </div>
      <div class="inputUnit">
          <label for="subtask">Subtasks</label>
          <input id="subtask" class="input" type="text" placeholder="Add new subtask">
          <div class="plus"><img src="assets/img/plus.svg" onclick="addSubtask()" alt=""></div>
      </div>
      <div id="displaySubtasks"></div>
      <div class="BTN">
          <button id="createTaskBTN" onclick="clear()">Cancel<img src=""></button>
          <button id="createTaskBTN" onclick="addTask()">Create Task<img src=""></button>
      </div>
  </div>
</div>`

}
/**
 * 
 * @returns The soonest Date (today) valid for Due Date in Form Add Task
 */
function getTodayDate() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let completeDate;
  if (month < 10) {
    completeDate = year + "-" + "0" + month + "-" + day;
  }
  else { completeDate = year + "-" + month + "-" + day; }
  return completeDate;

}

/**
 * Solves the problem that the JSON has not loaded when render it. --> Ich bin nicht glücklich damit, weil doch eigentlich "await" dafür sorgen soll, dass zuerst alles geladen wird.
 */
function delayRenderAssignTo() {
  setTimeout(renderUserAssignTo, 300);
}

function renderUserAssignTo() {
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    document.getElementById('optionsUser').innerHTML += renderUserAssignToHTML(index, element);
  }

}


function renderUserAssignToHTML(index, element) {
  return `
  <div class="checkbox">
  <label for="user${index}">${element.fullname}</label>
  <input type="checkbox" name="assignedTo" value="${element.fullname}" id="user${index}">

</div>`;
}


function delayRenderCategories() {
  setTimeout(renderCategories, 300);
}

function renderCategories() {
  document.getElementById('optionsCat').innerHTML = ``;
  document.getElementById('optionsCat').innerHTML += renderNewCategoryHTML();
  for (let index = 0; index < categories.length; index++) {
    const element = categories[index];
    document.getElementById('optionsCat').innerHTML += renderCategoriesHTML(index, element);
  }

}
function renderNewCategoryHTML() {
  return `<span id="newCat" class="item" onclick="addNewCategory()">New Category</span>`;
}

function renderCategoriesHTML(index, element) {
  console.log(element.categoryColor);
  return `
  <div class="duo" <span id="${index}" class="item" onclick="selectCategory(${index})">${element.categoryName}</span><span class="circle" style="background-color: ${element.categoryColor};"></span></div>`;
}



function addNewCategory() {
  document.getElementById(`inputUnit`).innerHTML = addNewCategoryHTML();
  renderColorSpots();
}

function addNewCategoryHTML() {
  return `
  <label for="Category">Category</label>
    <input id="showNewCat" class="input" type="text" placeholder="New Category name">
    
    <div class="plus"><img src="assets/img/plus.svg" onclick="resetCategoryChoice()"> | <img src="assets/img/plus.svg" onclick="addNewCat()" alt=""></div>
    <div class="colorspots" id="colorspots"></div>                      `
}




function renderColorSpots() {
  for (let index = 0; index < colors.length; index++) {
    const element = colors[index];
    document.getElementById('colorspots').innerHTML += renderColorSpotsHTML(index, element);
  }
}

function renderColorSpotsHTML(index, element) {
  return `
  <div class="colorspot" id="col${index}" onclick="rememberColor(${index})"></div> `;
}

function rememberColor(index) {
  colorspot = colors[index];

}

function addNewCat() {
  let newCatField = document.getElementById('showNewCat');

  let category = {
    'categoryName': newCatField.value,
    'categoryColor': colorspot
  }

  newCatField.value = ``;
  categories.push(category);
  backend.setItem('categories', JSON.stringify(categories));
  renderCategories();
}

/**
 * This function gives the active Button the right look and sets the inactive to default
 * @param {*} id
 */
function selectButton(id) {
  changeSelectedButton(id);
  resetUnselectedButtons(id);
}


function changeSelectedButton(id) {
  let priority = document.getElementById(`${priorities[id].prio}`);
  document.getElementById(`pic${priorities[id].prio}`).style = `filter: brightness(0) invert(1)`;
  priority.style = `background-color: ${priorities[id].color}; color: white`;
}

function resetUnselectedButtons(id) {
 
for (let index = 0; index < priorities.length; index++) {
       if(index != id){
       document.getElementById(`pic${priorities[index].prio}`).style = ``;
       document.getElementById(`${priorities[index].prio}`).style = ``;
     }
    }
  
}

