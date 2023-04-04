

let tasks = [];
let prio;
let subtasks = [];
// let checkBxSub = [];
// let checkBox = [];
let taskID = 0;
let categories = [];
let colorspots = ['#f99090', '#ff1717', '#fac66e', '#845400', '#b6fa81', '#07ab1d', '#81adfd', '#0048cd', '#ffb0f7', '#f500dc'];
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

  let assignedTo = getAssignedToUser();
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
    'subtasks': getSubtasks(subtasks)
  }
  tasks.push(task);
  saveTasks();
  console.log(tasks);
  // let minimum = document.getElementById("dueDate").min;

  document.getElementById('makeBgDarker').classList.add('d-none');
  clearAddTask();

}


function addSubtask() {
  let subtaskField = document.getElementById('subtask');
  let singleSubtask = subtaskField.value;
  subtasks.push(singleSubtask);
  subtaskField.value = ``;

  showSubtasks(subtasks);
  
}

function showSubtasks(subtasks) {
  document.getElementById('displaySubtasks').innerHTML = ``;
  console.log('blö', subtasks);
  
  subtasks.forEach((element, index) => {
    document.getElementById('displaySubtasks').innerHTML += `
    <div class="wrapper">
      <input type="checkbox" name="subtask" value="${element}" id="input${index}">
      <label for="subtask">${element}</label>
    </div>`;
  });
  
}



// function checkCheckedBoxes() {
//   let checkBxSub = document.querySelectorAll("input[name='subtask']");
//   console.log(checkBxSub);
//   for (let index = 0; index < checkBxSub.length; index++) {
//     const element = checkBxSub[index];
//     checkBox.push(element.checked);
//   }
//   return checkBox;
// }

function getSubtasks(subtasks){
  let allSubtasks = [];
  for (let index = 0; index < subtasks.length; index++) {
    let subtask = {
      'subtaskName': subtasks[index],
      'check': document.getElementById(`input${index}`).checked
    }
    console.log(subtask);
    allSubtasks.push(subtask);
    }
    console.log(allSubtasks);
    return allSubtasks; 
  
}


function saveTasks() {
  backend.setItem('tasks', JSON.stringify(tasks));
}


function toggleOptions() {
  document.getElementById('seeCat').classList.toggle('d-none');
  renderCategriesAndContacts();
}


function getAssignedToUser() {
  let checkboxes = document.querySelectorAll('input[name="assignedTo"]:checked');
  console.log(checkboxes);
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}


function addPrio(id) {
  prio = id;
}


function selectCategory(param) {
  let category = document.getElementById(`${param}`).textContent;
  document.getElementById('selectedCategory').innerHTML = `<div class="inlineDuo"><span>${category}</span><span class="circle" style="background-color: ${categories[param].categoryColor};"></span></div>`;
  document.getElementById('seeCat').classList.add('d-none');
}


function toggleOptionsAss() {
  document.getElementById('see').classList.toggle('d-none');
  renderCategriesAndContacts();
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
  completeDate = year.toString().padStart(4, '0') + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
  return completeDate;
}


function renderDate() {
  let currentDate = document.getElementById('dueDate');
  let possibleDueDate = getTodayDate();
  currentDate.value = possibleDueDate;
}

function renderCategriesAndContacts() {
  setTimeout(renderCategories, 300);
  setTimeout(renderContactsAssignTo, 300);

}

function delayDate() {
  setTimeout(renderDate, 100);
}


function renderContactsAssignTo() {
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    document.getElementById('optionsUser').innerHTML += renderContactsAssignToHTML(index, element);
  }
}


function renderContactsAssignToHTML(index, element) {
  return `
  <div class="checkbox">
  <label for="user${index}">${element.firstname} ${element.lastname}</label>
  <input type="checkbox" name="assignedTo" value="${element.id}" id="user${index}">
</div>`;
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
     <div id="seeCat">
     <div class="options" id="optionsCat"></div>
  </div>
  <div class="cancelOrAdd plus"><img src="assets/img/cancel.png" onclick="renderInputUnit()"><div class="seperate"></div> <img src="assets/img/check.png" onclick="addNewCat()" alt=""></div>
  <div class="colorspots" id="colorspots"></div>                      `
}


function renderInputUnit() {
  document.getElementById(`inputUnit`).innerHTML = ``;
  document.getElementById(`inputUnit`).innerHTML += `
 
  <label>Category</label>
  <div class="inputArea" id="newCateg">
      <div id="selectedCategory">Select a Category</div>
      <img src="assets/img/openMenuIcon.svg" onclick="toggleOptions()" alt="">
  </div>
  <div id="seeCat" class="d-none">
      <div class="options" id="optionsCat"></div>
  </div>
</div>`;
  renderCategories();
  selectCategory(categories.length - 1);
}


function renderColorSpots() {
  for (let index = 0; index < colorspots.length; index++) {
    const element = colorspots[index];
    document.getElementById('colorspots').innerHTML += renderColorSpotsHTML(index, element);
  }
}


function renderColorSpotsHTML(index, element) {
  return `
  <div class="colorspot" id="col${index}" onclick="rememberColor(${index})"></div> `;
}


function rememberColor(index) {
  colorspot = colorspots[index];
  document.getElementById(`col${index}`).classList.add('highlighted');
  resetUnselectedSpots(index);
}


function resetUnselectedSpots(index) {
  for (let j = 0; j < colorspots.length; j++) {
    if (index != j) {
      document.getElementById(`col${j}`).classList.remove('highlighted');
    }
  }
}

function addNewCat() {
  let newCatField = document.getElementById('showNewCat');
  let category = {
    'categoryName': newCatField.value,
    'categoryColor': colorspot
  }


  categories.push(category);
  backend.setItem('categories', JSON.stringify(categories));
  renderInputUnit();
}



function resetCategoryChoice() {
  let inputUnit = document.getElementById('inputUnit');
  inputUnit.innerHTML = ``;
  inputUnit.innerHTML += ` <label>Category</label>
  <div class="inputArea" id="newCateg">
      <div id="selectedCategory">Select a Category</div>
      <img src="assets/img/openMenuIcon.svg" onclick="toggleOptions()" alt="">
  </div>
  <div id="seeCat" class="d-none">
      <div class="options" id="optionsCat"> </div>
  </div>`;
}

/**
 * This function gives the active Button the right look and sets the inactive to default
 * @param {*} id
 */
function selectButton(id) {
  prio = priorities[id].prio;
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
    if (index != id) {
      document.getElementById(`pic${priorities[index].prio}`).style = ``;
      document.getElementById(`${priorities[index].prio}`).style = ``;
      document.getElementById(`${priorities[index].prio}`).classList.remove(priorities[index].color);
    }
  }
}


function clearAddTask() {
  document.getElementById('title').value = ``;
  document.getElementById('description').value = ``;
  document.getElementById('selectedCategory').value = ``;
  document.getElementById('selected').value = ``;
}


function changeButtonOnclick() {
  document.getElementById('clearBTN').onclick = `clearAddTask`;
}
