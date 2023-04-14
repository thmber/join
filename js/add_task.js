

let tasks = [];
let allIDs = [];
let chosenContacts = [];
let more = true;
let prio;
let subtasks_namen = [];
let subtasks = [];
let contactsAssignTo = [];
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

function searchTheMaxID(){
  allIDs = [];
  for (i= 0; i < tasks.length; i++){
       allIDs.push(tasks[i].id);
     }
     console.log(allIDs);
  let maxID = Math.max(...allIDs);
   return (maxID + 1);
}

function addTask() {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let category = document.getElementById('selectedCategory');
  let duedate = document.getElementById('dueDate');
  let autoID;

  if (tasks.length > 0) {
    autoID = searchTheMaxID();
  }
  else autoID = 0;
  let totalOK = checkInput(title.value, description.value, category.textContent, prio);
  if (totalOK) {
    let task = {
      'id': autoID,
      'status': 'todo',
      'title': title.value,
      'description': description.value,
      'duedate': duedate.value,
      'priority': prio,
      'assignedTo': getAssignedContacts(),
      'category': category.textContent,
      'subtasks': getSubtasks()
    }
    tasks.push(task);
    saveTasks();
    flyingInfo();
    goToBoard();
  }
}


function goToBoard() {
  setTimeout(() => {
    document.location = "../board.html"
  }, 2000);
}

function closeItQuick(){
  // document.location = "../board.html";
  document.getElementById('overlayTask').classList.add('d-none');
  document.getElementById('makeBgDarker').classList.add('d-none');
  document.getElementById('newTask').classList.add('d-none');
  showTasksOnBoard();
}
function resetOverlay() {
  if (!document.getElementById('makeBgDarker').classList.contains('d-none')) {
    document.getElementById('makeBgDarker').classList.add('d-none');
  }
}

function checkInput(title, description, category, prio) {
  let titleOK;
  let descriptionOK;
  let categoryOK;
  let prioOK;
  let contactOK;
  if (title.length == 0) {
    titleOK = false;
    let missingTitle = document.getElementById('missingTitle');
    missingTitle.classList.remove('d-none');
  }
  else {
    titleOK = true;
  }
  if (description.length == 0) {
    descriptionOK = false;
    let missingDescription = document.getElementById('missingDescription');
    missingDescription.classList.remove('d-none');
  }
  else { descriptionOK = true; }

  if (category == 'Select a Category') {
    categoryOK = false;
    let missingCategory = document.getElementById('missingCategory');
    missingCategory.classList.remove('d-none');
  }
  else { categoryOK = true; }


if(chosenContacts.length == 0){
  contactOK = false;
  let missingContact = document.getElementById('missingContact');
  missingContact.classList.remove('d-none');
}
else {
  contactOK = true;
}



  if (prio == undefined) {
    prioOK = false;
    let missingPrio = document.getElementById('missingPrio');
    missingPrio.classList.remove('d-none');
  }
  else { prioOK = true; }

  let totalOK = (titleOK && descriptionOK && categoryOK && prioOK && contactOK)
  return totalOK;
}


function addSubtask() {
  let subtaskField = document.getElementById('subtask');
  let singleSubtask = subtaskField.value;

  if ((currentOpenTask >= 0) && more) { // wenn in einem existierendem Task gearbeitet wird

    for (let index = 0; index < tasks[currentOpenTask].subtasks.length; index++) {
      subtasks_namen.push(tasks[currentOpenTask].subtasks[index].subtaskName);
    }
    more = false;
  }

  if (singleSubtask.length > 0) {
    subtasks_namen.push(singleSubtask);
  }
  subtaskField.value = ``;
  showSubtasks(subtasks_namen);
}


function showSubtasks(subtasks_name) {
  document.getElementById('displaySubtasks').innerHTML = ``;
  subtasks_name.forEach((element, index) => {
    document.getElementById('displaySubtasks').innerHTML += `
    <div class="wrapper">
      <input type="checkbox" name="subtask" value="${element}" id="input${index}">
      <label for="subtask">${element}</label>
    </div>`;
  });
}


function getSubtasks() {
  subtasks = [];
  for (let index = 0; index < subtasks_namen.length; index++) {
    let subtask = {
      'subtaskName': subtasks_namen[index],
      'check': document.getElementById(`input${index}`).checked
    }
    subtasks.push(subtask);
  }
  return subtasks;

}

function getAssignedContacts() {
  contactsAssignTo = [];
   for (let index = 0; index < contacts.length; index++) {
    let contactID = document.getElementById(`user${index}`).value;
     let checkbox = document.getElementById(`user${index}`).checked;
let contactIndex = contacts.findIndex(obj => obj.id == contactID);
     if (checkbox) {
   
    let contactAssignTo = {
      'name': contacts[contactIndex].firstname +' '+ contacts[contactIndex].lastname,
      'initial': contacts[contactIndex].initials,
      'color': contacts[contactIndex].color
    }
    contactsAssignTo.push(contactAssignTo);
  }
  }
  return contactsAssignTo;
}


function saveTasks() {
  backend.setItem('tasks', JSON.stringify(tasks));
}


function toggleOptions() {
  let seeCat = document.getElementById('seeCat');
  seeCat.classList.toggle('d-none');


  let checkit = !seeCat.classList.contains('d-none');
  if (checkit) {
    document.getElementById('newCateg').style.borderBottomLeftRadius = `0px`;
    document.getElementById('newCateg').style.borderBottomRightRadius = `0px`;
  }
  else {
    document.getElementById('newCateg').style.borderRadius = `8px`;
  }

  if (!document.getElementById('see').classList.contains('d-none')) {
    document.getElementById('see').classList.add('d-none')
    document.getElementById('toggleID').style.borderRadius = `8px`;
  }
  else { }
  renderCategories();
}



function getAssignedToUser() {
  let checkboxes = document.querySelectorAll('input[name="assignedTo"]:checked');
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
  document.getElementById('newCateg').style.borderBottomLeftRadius = "8px";
  document.getElementById('newCateg').style.borderBottomRightRadius = "8px";
  document.getElementById('missingCategory').classList.add('d-none');
}


function toggleOptionsAss() {
  let see = document.getElementById('see');
  see.classList.toggle('d-none');

  let checkit = !see.classList.contains('d-none');
  if (checkit) {
    document.getElementById('toggleID').style.borderBottomLeftRadius = `0px`;
    document.getElementById('toggleID').style.borderBottomRightRadius = `0px`;
  }
  else {
    document.getElementById('toggleID').style.borderRadius = `8px`;
  }

  if (!document.getElementById('seeCat').classList.contains('d-none')) {
    document.getElementById('seeCat').classList.add('d-none')
    document.getElementById('newCateg').style.borderRadius = `8px`;
  }
}


function setToggleID(i) {
  document.getElementById('toggleID').innerHTML = `<div id="selected">Assigned to</div>
  <img src="assets/img/openMenuIcon.svg" onclick="toggleOptionsContactsAssignTo(${i})" alt="">`;
}

function toggleOptionsContactsAssignTo(i) {
  document.getElementById('see').classList.toggle('d-none');
  renderContactsAssignBoard(i);
}


function selectAssignTo(param) {
  let category = document.getElementById(`${param}`).textContent;
  document.getElementById('selected').innerHTML = category;
  document.getElementById('see').classList.add('d-none');
}


function addAssignPeople(param) {
  let name = document.getElementById(param).textContent;
  let beginners = name.match(/\b\w/g).join('')
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
  currentDate.setAttribute('min', possibleDueDate );
}


function renderTheContacts() {
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
  <input type="checkbox" onchange="chooseTheContact(-1, ${index})" name="assignedTo" value="${element.id}" id="user${index}" >
</div>`;
}



function renderContactsAssignBoard(i) {
  let check;
  document.getElementById('optionsUser').innerHTML = ``;
 
  for (let index = 0; index < contacts.length; index++) {
    let contact = contacts[index];
        
    
    
    for (let a = 0; a < tasks[i].assignedTo.length; a++) {
             if (contact.firstname + ' ' + contact.lastname == tasks[i].assignedTo[a].name) {
            check = 'checked'
             break;
            }
            
             else {
               check = '';
                   }
          }

    document.getElementById('optionsUser').innerHTML += renderContactsAssignBoardHTML(i, index, contact, check);
  }
}



function renderContactsAssignBoardHTML(i, index, contact, check) {
  return `
  <div class="checkbox" id="${index}">
  <label for="user${index}">${contacts[index].firstname} ${contacts[index].lastname}</label>
  <input type="checkbox" name="assignedTo" onchange="chooseTheContact(${i},${index})" value="${contact.id}" id="user${index}" ${check}>
</div>`;
}



function renderContactsAssignAddTask(i) {
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    const element = tasks[i].assignedTo;
    document.getElementById('optionsUser').innerHTML += renderContactsAssignAddTaskHTML(index, element);
  }
}


function renderContactsAssignAddTaskHTML(index, element) {
  return `
  <div class="checkbox" id="${index}">
  <label for="user${index}">${contacts[index].firstname} ${contacts[index].lastname}</label>
  <input type="checkbox" name="assignedTo" onchange="chooseTheContact( -1,${index})" value="${element[index].id}" id="user${index}" ${element[index].check}>
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
  return `<span id="newCat" class="item" onclick="addANewCategory()">New Category</span>`;
}


function renderCategoriesHTML(index, element) {
  return `
  <div class="duo" <span id="${index}" class="item" onclick="selectCategory(${index})">${element.categoryName}</span><span class="circle" style="background-color: ${element.categoryColor};"></span></div>`;
}


function addANewCategory() {
  document.getElementById('missingCategory').classList.add('d-none');
  document.getElementById(`inputUnit`).innerHTML = addANewCategoryHTML();
  document.getElementById('seeCat').classList.add('d-none');
  renderColorSpots();
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

  if (checkIfInputIsComplete(newCatField)) {
    document.getElementById('missingColorspot').classList.add('d-none');
    let category = {
      'categoryName': newCatField.value,
      'categoryColor': colorspot
    }
    categories.push(category);
    backend.setItem('categories', JSON.stringify(categories));
    renderInputUnit();
  }

}

function checkIfInputIsComplete(field) {
  let colorspotIsChosen = false;
  let categorynameIsChosen = false;
  if (colorspot == undefined) {
    document.getElementById('missingColorspot').classList.remove('d-none');

  }
  else {
    colorspotIsChosen = true;
  }

  if (field.value == '') {
    categorynameIsChosen = false;
    document.getElementById('missingColorspot').classList.remove('d-none');

  }
  else {
    categorynameIsChosen = true;
  }
   return (categorynameIsChosen && colorspotIsChosen);
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
  document.getElementById('missingPrio').classList.add('d-none');
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


function changeButtonOnclick() {
  document.getElementById('clearBTN').onclick = `clearAddTask`;
}


function hideMissingText(field) {
  document.getElementById(`${field}`).classList.add('d-none');
}


function resetMissingText() {
  document.getElementById('missingTitle').classList.add('d-none');
  document.getElementById('missingDescription').classList.add('d-none');
  document.getElementById('missingCategory').classList.add('d-none');
  document.getElementById('missingColorspot').classList.add('d-none');
  document.getElementById('missingPrio').classList.add('d-none');
}

function chooseTheContact(i, index) {

  if (i>= 0){
  chosenContacts = tasks[i].assignedTo;
  }

  let chosenContact = {
    'name': contacts[index].firstname + ' ' + contacts[index].lastname,
    'initial': contacts[index].initials,
    'color': contacts[index].color
  };

  let inis = chosenContacts.findIndex(obj => obj.initial == chosenContact.initial);
  if (inis == -1) {
    chosenContacts.push(chosenContact);
     }
  else {
    chosenContacts.splice(inis, 1);
     }
 
  showTheJustChosenContacts(chosenContacts);
  document.getElementById('missingContact').classList.add('d-none');
}

function showTheJustChosenContacts(theContacts) {
  document.getElementById(`showAssignedPeople`).innerHTML = ``;
  for (let j = 0; j < theContacts.length; j++) {
    document.getElementById(`showAssignedPeople`).innerHTML += `<div class="bigNameCircle bg${theContacts[j].color}" >${theContacts[j].initial}</div>`;
  }
}


function flyingInfo() {
  document.getElementById('infoText').classList.remove('d-none');
  document.getElementById('infoText').classList.add('infoText')
  resetFlyingInfo();
}

function resetFlyingInfo() {
  setTimeout(() => {
    document.getElementById('infoText').classList.add('d-none');
    document.getElementById('infoText').classList.remove('infoText')
  }, 4000);


}